import React, { useState } from "react";
import axios from "axios";
import { Container, Button, Table } from "react-bootstrap";
import SetRolesModal from "../components/SetRolesModal";

function Projects({ currentUser, localStorageCurrentUser }) {
  const [projects, setProjects] = useState([]);
  const [counter, setCounter] = useState(1);
  const [input, setInput] = useState({
    id: counter,
    title: "",
    description: "",
  });
  const [isMod, setIsMod] = useState(false);

  React.useEffect(() => {
    localStorageCurrentUser &&
      axios.get("http://localhost:4001/users").then((response) => {
        setIsMod(
          response.data.find((x) => x.username === localStorageCurrentUser)
            .isModerator === 0
            ? false
            : true
        );
        console.log("isMod", isMod);
      });
    axios.get("http://localhost:4001/projects/").then((response) => {
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
    // .then(response => response.json())
    // .then(data => console.log('deleted project: ', data.id));
  };

  return (
    <>
      {/* form begins below */}
      {isMod && (
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
            <Button
              type="submit"
              value="Submit"
              className="btn"
              style={{ flex: "1" }}
            >
              Add Project
            </Button>
            <Container className="d-flex p-6 justify-content-center">
              <SetRolesModal projects={projects} />
            </Container>
          </form>
        </Container>
      )}
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
