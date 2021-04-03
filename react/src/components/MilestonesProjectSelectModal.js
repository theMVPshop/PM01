import React, { useState, useEffect } from "react";
import { Container, Modal, Button, Table } from "react-bootstrap";
import axios from "axios";

function MilestonesProjectSelectModal({ fromMilestones, handleProjectClick }) {
  const localStorageCurrentUser =
    JSON.parse(localStorage.getItem("gotrue.user")) &&
    JSON.parse(localStorage.getItem("gotrue.user")).email;
  const [projects, setProjects] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isMod, setIsMod] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    <>
      <Button variant="secondary" onClick={handleShow}>
        Select Project
      </Button>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Your Projects</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#adb5bd" }}>
            <Container className="d-flex p-6 justify-content-center">
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
                    {/* checks if user is a moderator to either show all projects or filter based on permissions table */}
                    {isMod
                      ? projects.map((project, idx) => (
                          <tr onClick={() => handleProjectClick(project.id)}>
                            <td>{project.id}</td>
                            <td>{project.title}</td>
                            <td>{project.description}</td>
                          </tr>
                        ))
                      : fromMilestones
                      ? // maps over permissions table to filter projects assigned to current user and render them in the table. if rendered from milestones then it will have a handleclick eventhandler
                        permissions.map((permission, idx) =>
                          projects
                            .filter(
                              (x) =>
                                x.id === permission.project_id &&
                                permission.username === localStorageCurrentUser
                            )
                            .map((project, idx) => (
                              <tr
                                onClick={() => handleProjectClick(project.id)}
                              >
                                <td>{project.id}</td>
                                <td>{project.title}</td>
                                <td>{project.description}</td>
                              </tr>
                            ))
                        )
                      : // otherwise, it won't have the listener
                        permissions.map((permission, idx) =>
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
            </Container>
          </Modal.Body>
        </Modal>
      </>
    </>
  );
}

export default MilestonesProjectSelectModal;
