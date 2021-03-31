import React, { useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = React.useState([]);
  const [counter, setCounter] = useState(1);
  const [input, setInput] = useState({
    id: counter,
    title: "",
    description: "",
  });

  React.useEffect(() => {
    axios.get(`http://localhost:4001/projects/`).then((response) => {
      setProjects(response.data);
    });
  }, []);

  const onChange = (event) => {
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let project = {
      id: counter,
      title: input.title,
      description: input.description,
    };
    setProjects([...projects, project]);
    setCounter(counter + 1);
    setInput({
      title: "",
      description: "",
    });
    axios
      .post(`http://localhost:4001/projects`, project)
      .then(function (response) {
        console.log("post project response", response);
      })
      .catch(function (error) {
        console.log("post project error", error);
      });
  };

  const removeProject = (idx) => {
    let id = projects[idx].id;
    console.log("delete project: ", id);
    axios.delete(`http://localhost:4001/projects/${id}`);
    setCounter(counter - 1);
    // .then(response => response.json())
    // .then(data => console.log('deleted project: ', data.id));
  };

  return (
    <>
      {/* form begins below */}
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
            name="description"
            style={{ flex: "10", padding: "5px" }}
            placeholder="Description ..."
            value={input.description}
            onChange={onChange}
          />
          {/* <label
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
          /> */}
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
            Add Project
          </Button>
        </form>
      </Container>
      {/* form ends above and table begins below */}
      <Container>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID#</th>
              <th>Project Title</th>
              <th>Project Description</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, idx) => (
              <tr>
                <td>{project.id}</td>
                <td>{project.title}</td>
                <td>{project.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Projects;
