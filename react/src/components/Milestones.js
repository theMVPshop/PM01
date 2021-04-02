import { Container, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

function Milestones() {
  const [todos, setTodos] = useState([]);
  const [counter, setCounter] = useState(1);
  const [input, setInput] = useState({
    title: "",
    subtitle: "",
    description: "",
    due_date: "",
    ms_status: "TODO",
    // id: counter,
  });
  // const [milestone, setMilestone] = useState({});
  let projectID = 1;
  let mstone = {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4001/milestones/${projectID}`
        );
        setTodos(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData().then(() => console.log("todos:", todos));
  }, [counter]);

  const postMilestone = () => {
    console.log("milestone", mstone);
    //   const newMilestoneRequest = {
    //     method: 'POST',
    //     // headers: { 'authorization': `bearer ${cookieToken}`, 'Content-Type': 'application/json' },
    //     headers: { 'Content-Type': 'application/json' },
    //     body: {...mstone}
    // };
    axios
      .post(
        `http://localhost:4001/milestones`,
        // newMilestoneRequest,
        mstone
      )
      .then(function (response) {
        console.log("post milestone response", response);
      })
      .catch(function (error) {
        console.log("post milestone error", error);
      });
  };

  const onChange = (event) => {
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    mstone = {
      title: input.title,
      // id: counter,
      ms_status: "TODO",
      description: input.description,
      due_date: input.due_date,
      subtitle: input.subtitle,
      project_id: projectID,
    };
    // setTodos([
    //   ...todos,
    //   milestone
    // ])
    setCounter(counter + 1);
    setInput({
      title: "",
      subtitle: "",
      description: "",
      due_date: "",
    });
    postMilestone();
  };

  const removeItem = (idx) => {
    let id = todos[idx].id;
    console.log("delete milestone: ", id);
    axios.delete(`http://localhost:4001/milestones/${id}`);
    setCounter(counter - 1);
    // .then(response => response.json())
    // .then(data => console.log('deleted milestone: ', data.id));
  };

  const handleClick = (todo) => {
    const todoId = todo.id;
    if (todo.ms_status === "TODO") {
      todo.ms_status = "IN PROGRESS";
      axios.put(`http://localhost:4001/milestones/${todoId}`, {
        ms_status: "IN PROGRESS",
      });
    } else if (todo.ms_status === "IN PROGRESS") {
      todo.ms_status = "COMPLETED";
      axios.put(`http://localhost:4001/milestones/${todoId}`, {
        ms_status: "COMPLETED",
      });
    } else if (todo.ms_status === "COMPLETED") {
      todo.ms_status = "TODO";
      axios.put(`http://localhost:4001/milestones/${todoId}`, {
        ms_status: "TODO",
      });
    }

    setTodos([...todos]);
  };

  return (
    <>
      <Container className="d-flex p-6 justify-content-center">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="title"
            style={{ flex: "10", padding: "5px" }}
            placeholder="Title ..."
            value={input.title}
            onChange={onChange}
          />
          <input
            type="text"
            name="subtitle"
            style={{ flex: "10", padding: "5px" }}
            placeholder="Subtitle ..."
            value={input.subtitle}
            onChange={onChange}
          />
          <input
            type="text"
            name="description"
            style={{ flex: "10", padding: "5px" }}
            placeholder="Description ..."
            value={input.description}
            onChange={onChange}
          />
          <label
            for="due_date"
            style={{
              backgroundColor: "darkorange",
              color: "black",
              flex: "2",
              padding: "5px",
              marginBottom: "5px",
              // border: "1px solid black",
            }}
          >
            Due Date:{" "}
          </label>
          <input
            type="date"
            name="due_date"
            style={{ flex: "10", padding: "5px" }}
            placeholder="Due date ..."
            value={input.due_date}
            onChange={onChange}
          />
          {/* <input
            type="select"
            name="status"
            style={{ flex: "10", padding: "5px" }}
            placeholder="Status ..."
            value={input.ms_status}
            onChange={onChange}
          /> */}
          <Button
            type="submit"
            value="Submit"
            className="btn"
            style={{ flex: "1" }}
          >
            Add
          </Button>
        </form>
      </Container>
      <Container style={{ backgroundColor: "lightslategray" }} className="p-12">
        <VerticalTimeline>
          {todos.map((todo, idx) => (
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "#20B2AA",
                color: "lightyellow",
              }}
              contentArrowStyle={{
                borderRight: "7px solid white",
              }}
              date={todo.due_date}
              dateClassName="timeline-date"
              iconStyle={{
                background: `${
                  todo.ms_status === "COMPLETED"
                    ? "mediumseagreen"
                    : todo.ms_status === "IN PROGRESS"
                    ? "darkorange"
                    : todo.ms_status === "TODO"
                    ? "firebrick"
                    : "gray"
                }`,
                color: "#eee",
              }}
              // icon={<WorkIcon />}
            >
              <h3 className="vertical-timeline-element-title">{todo.title}</h3>
              <h4 className="vertical-timeline-element-subtitle">
                {todo.subtitle}
              </h4>
              <p>{todo.description}</p>
              <Button
                variant={
                  todo.ms_status === "COMPLETED"
                    ? "success"
                    : todo.ms_status === "IN PROGRESS"
                    ? "warning"
                    : todo.ms_status === "TODO"
                    ? "danger"
                    : "primary"
                }
                onClick={() => handleClick(todo)}
                value={todo.id}
                id={idx}
                size="sm"
              >
                {todo.ms_status}
              </Button>
              <Button
                variant="danger"
                onClick={() => removeItem(idx)}
                size="sm"
                className="d-flex ml-auto"
              >
                Remove
              </Button>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </Container>
    </>
  );
}

export default Milestones;
