import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Accordion,
  Card,
  Button,
  Form,
  Col,
  Modal,
} from "react-bootstrap";

function Devlog() {
  const [logs, setLogs] = useState([]);
  const [counter, setCounter] = useState(1);
  const [input, setInput] = useState({
    title: "",
    subtitle: "",
    post: "",
    date: "",
    // id: counter,
  });
  let projectID = 1;
  let newLog = {};

  const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4001/devlog/${projectID}`
        );
        setLogs(result.data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchData().then(() => console.log("logs:", logs));
  }, []);

  const postLog = () => {
    console.log("log", newLog);
    axios
      .post(
        `http://localhost:4001/devlog`,
        // newMilestoneRequest,
        newLog
      )
      .then(function (response) {
        console.log("post devlog response", response);
      })
      .then(() => fetchData())
      .catch(function (error) {
        console.log("post devlog error", error);
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
    newLog = {
        title: input.title,
        // id: counter,
        post: input.post,
        date: input.date,
        subtitle: input.subtitle,
      };
    setCounter(counter + 1);
    setInput({
      title: "",
      subtitle: "",
      post: "",
      date: "",
    });
    postLog();
  };

  // modal component code begins below
  function DevlogModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Add Log Entry
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Developer Log</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#adb5bd" }}>
            <Container className="d-flex p-6 justify-content-center">
              <Form className="m-4" onSubmit={onSubmit}>
                <Form.Row>
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      placeholder="Post Title..."
                      value={input.title}
                      onChange={onChange}
                      name="title"
                    />
                  </Form.Group>
                  <Col xs="auto">
                    <Form.Group controlId="subtitle">
                      <Form.Label>Subtitle</Form.Label>
                      <Form.Control
                        placeholder="Subtitle..."
                        value={input.subtitle}
                        onChange={onChange}
                        name="subtitle"
                      />
                    </Form.Group>
                  </Col>
                  <Form.Group controlId="date">
                    <Form.Label>Log Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={input.date}
                      onChange={onChange}
                      name="date"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Group controlId="post">
                  <Form.Label>Log Post</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={input.post}
                    onChange={onChange}
                    name="post"
                    placeholder="Post..."
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="float-right">
                  Add Entry
                </Button>
              </Form>
            </Container>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  // modal component code ends here

  return (
    <>
      <DevlogModal />
      {/* accordion starts below */}
      <Container className="p-12">
        <Accordion
          style={{ color: "white" }}
          defaultActiveKey="0"
          className="p-12"
        >
          {logs.map((log, idx) => (
            <Card style={{ backgroundColor: "#708090" }}>
              <Card.Header style={{ backgroundColor: "lemonchiffon" }}>
                <Accordion.Toggle as={Button} variant="info" eventKey="0">
                  {log.title}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>{log.post}</Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </Container>
    </>
  );
}

export default Devlog;
