import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";

function Devlog() {
  return (
    <Accordion style={{ color: "white" }} defaultActiveKey="0">
      <Card style={{ backgroundColor: "#708090" }}>
        <Card.Header style={{ backgroundColor: "#008080" }}>
          <Accordion.Toggle as={Button} variant="info" eventKey="0">
            Header
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Hello! I'm the body</Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card style={{ backgroundColor: "#708090" }}>
        <Card.Header style={{ backgroundColor: "#008080" }}>
          <Accordion.Toggle as={Button} variant="info" eventKey="1">
            Header
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>Hello! I'm another body</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default Devlog;
