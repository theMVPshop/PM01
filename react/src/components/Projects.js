import React, { useState } from "react";
import axios from "axios";
import { Container, Button, Table } from "react-bootstrap";
import SetRolesModal from "../components/SetRolesModal";

function Projects({ currentUser, localStorageCurrentUser }) {
  const [projects, setProjects] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [counter, setCounter] = useState(1);
  const [input, setInput] = useState({
    id: counter,
    title: "",
    description: "",
  });
  const [isMod, setIsMod] = useState(false);

  React.useEffect(() => {
    // if someone is logged in, this will check to see if they are a moderator and store it in a useState hook (line 15) as a boolean
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
    // fetch permissions table from API and store in hook
    axios.get("http://localhost:4001/permissions").then((response) => {
      setPermissions(response.data);
    });
    // fetch projects table from API and store in hook
    axios.get("http://localhost:4001/projects/").then((response) => {
      setProjects(response.data);
    });
  }, []);

  // controls all the input fields in the add project form
  const onChange = (event) => {
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  // creates new project and stores it in hook and also the API
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

  // unfinished code to remove project
  const removeProject = (idx) => {
    let id = projects[idx].id;
    console.log("delete project: ", id);
    axios.delete(`http://localhost:4001/projects/${id}`);
    // .then(response => response.json())
    // .then(data => console.log('deleted project: ', data.id));
  };

  return (
    <>
      {/* add project form begins below */}
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
              {isMod && <SetRolesModal projects={projects} />}
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
            {/* (below) maps over permissions table to filter projects assigned to current user and render them in the table */}
            {permissions.map((permission, idx) =>
              projects
                .filter(
                  (x) =>
                    x.id === permission.project_id &&
                    permission.username === localStorageCurrentUser
                )
                .map((project, idx) => (
                  <tr>
                    <td>{project.id}</td>
                    <td>{project.title}</td>
                    <td>{project.description}</td>
                  </tr>
                ))
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Projects;
