import React, { useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import SetRoles from "../components/SetRoles";

function SetRolesModal({ projects }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Assign Roles/Projects
      </Button>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Developer Log</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#adb5bd" }}>
            <Container className="d-flex p-6 justify-content-center">
              <SetRoles projects={projects} />
            </Container>
          </Modal.Body>
        </Modal>
      </>
    </>
  );
}

export default SetRolesModal;
