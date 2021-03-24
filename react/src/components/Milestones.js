import { Container, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from 'axios';
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
    date: "",
    status: "TODO",
    id: counter,
  });
  const [data, setData] = useState({ stones: [] });
  let projectID = 1;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://localhost:4001/milestones/${projectID}`,
      );
      // console.log('this is the result', result)
      setTodos(result.data);
    };
    fetchData();
    console.log('this is the todos', todos);
  }, []);

  const onChange = (event) => {
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setTodos([
      ...todos,
      {
        title: input.title,
        id: counter,
        status: "TODO",
        description: input.description,
        date: input.date,
        subtitle: input.subtitle,
      },
    ]);
    setCounter(counter + 1);
    setInput({
      title: "",
      subtitle: "",
      description: "",
      date: "",
    });
  };

  const removeItem = (id) => {
    setTodos([...todos.filter((x, i) => i !== id)]);
  };

  const handleClick = (todo) => {
    if (todo.status === "TODO") {
      todo.status = "IN PROGRESS";
    } else if (todo.status === "IN PROGRESS") {
      todo.status = "COMPLETED";
    } else if (todo.status === "COMPLETED") {
      todo.status = "TODO";
    }

    setTodos([...todos]);
  };

  return (
    <>
      <Container style={{ backgroundColor: "lightslategray" }} className="p-12">
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
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
            for="date"
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
            name="date"
            style={{ flex: "10", padding: "5px" }}
            placeholder="Due date ..."
            value={input.date}
            onChange={onChange}
          />
          {/* <input
            type="select"
            name="status"
            style={{ flex: "10", padding: "5px" }}
            placeholder="Status ..."
            value={input.status}
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

        <VerticalTimeline>
          {todos.map((todo, idx) => {
            return (
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "#20B2AA",
                  color: "lightyellow",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid white",
                }}
                date={todo.date}
                dateClassName="timeline-date"
                iconStyle={{
                  background: `${
                    todo.status === "COMPLETED"
                      ? "mediumseagreen"
                      : todo.status === "IN PROGRESS"
                      ? "darkorange"
                      : todo.status === "TODO"
                      ? "firebrick"
                      : "gray"
                  }`,
                  color: "#eee",
                }}
                // icon={<WorkIcon />}
              >
                <h3 className="vertical-timeline-element-title">
                  {todo.title}
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  {todo.subtitle}
                </h4>
                <p>{todo.description}</p>
                <Button
                  variant={
                    todo.status === "COMPLETED"
                      ? "success"
                      : todo.status === "IN PROGRESS"
                      ? "warning"
                      : todo.status === "TODO"
                      ? "danger"
                      : "primary"
                  }
                  onClick={() => handleClick(todo)}
                  value={todo.id}
                  id={idx}
                  size="sm"
                >
                  {todo.status}
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
            );
          })}
        </VerticalTimeline>
      </Container>
    </>
  );
}

export default Milestones;
