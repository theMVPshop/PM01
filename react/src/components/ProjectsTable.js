import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import AddProjectForm from "../components/AddProjectForm";

function ProjectsTable({ fromMilestones, handleProjectClick }) {
  const localStorageCurrentUser =
    JSON.parse(localStorage.getItem("gotrue.user")) &&
    JSON.parse(localStorage.getItem("gotrue.user")).email;
  const [projects, setProjects] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isMod, setIsMod] = useState(false);

  useEffect(() => {
    // if someone is logged in, this will check to see if they are a moderator and store it in a useState hook (line 15) as a boolean
    localStorageCurrentUser &&
      axios.get("http://localhost:4001/users").then((response) => {
        setIsMod(
          response.data.find((x) => x.username === localStorageCurrentUser)
            .isModerator === 0
            ? false
            : true
        );
      });
    // fetch permissions table from API and store in hook
    axios.get("http://localhost:4001/permissions/").then((response) => {
      setPermissions(response.data);
    });
    // fetch projects table from API and store in hook
    axios.get("http://localhost:4001/projects/").then((response) => {
      setProjects(response.data);
    });
  }, []);

  return (
    <div>
      {/* form to add a project */}
      <AddProjectForm
        isMod={isMod}
        projects={projects}
        setProjects={setProjects}
      />
      <Container>
        {/* table of projects */}
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Project Title</th>
              <th>Project Description</th>
            </tr>
          </thead>
          <tbody>
            {
              // checks if user is a moderator to either show all projects or filter based on permissions table
              isMod
                ? projects.map((project) => (
                    <tr
                      style={{ cursor: "pointer" }}
                      onClick={() => handleProjectClick(project.id)}
                    >
                      <td>{project.title}</td>
                      <td>{project.description}</td>
                    </tr>
                  ))
                : fromMilestones
                ? // maps over permissions table to filter projects assigned to current user and render them in the table. if rendered from milestones then it will have a handleclick eventlistener
                  permissions.map((permission) =>
                    projects
                      .filter(
                        (x) =>
                          x.id === permission.project_id &&
                          permission.username === localStorageCurrentUser
                      )
                      .map((project) => (
                        <tr
                          style={{ cursor: "pointer" }}
                          onClick={() => handleProjectClick(project.id)}
                        >
                          <td>{project.title}"poop"</td>
                          <td>{project.description}</td>
                        </tr>
                      ))
                  )
                : // otherwise, it won't have the listener
                  permissions.map((permission) =>
                    projects
                      .filter(
                        (x) =>
                          x.id === permission.project_id &&
                          permission.username === localStorageCurrentUser
                      )
                      .map((project) => (
                        <tr>
                          <td>{project.title}</td>
                          <td>{project.description}</td>
                        </tr>
                      ))
                  )
            }
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default ProjectsTable;
