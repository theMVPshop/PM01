import React from "react";
import { Container, Accordion, Card, Button } from "react-bootstrap";

function Devlog() {
  return (
    <Container className="p-12">
      <Accordion
        style={{ color: "white" }}
        defaultActiveKey="0"
        className="p-12"
      >
        <Card style={{ backgroundColor: "#708090" }}>
          <Card.Header style={{ backgroundColor: "lemonchiffon" }}>
            <Accordion.Toggle as={Button} variant="info" eventKey="0">
              Header
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card style={{ backgroundColor: "#708090" }}>
          <Card.Header style={{ backgroundColor: "lemonchiffon" }}>
            <Accordion.Toggle as={Button} variant="info" eventKey="1">
              Header
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
}

export default Devlog;
