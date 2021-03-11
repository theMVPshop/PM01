import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

function initNetlifyIdentity() {
  const script = document.createElement("script");

  script.src = "https://identity.netlify.com/v1/netlify-identity-widget.js";
  script.async = true;

  document.body.appendChild(script);
}

function openNetlifyModal() {
  const netlifyIdentity = window.netlifyIdentity;

  if (netlifyIdentity) {
    netlifyIdentity.open();
  } else {
    console.log("netlifyIdentity not defined");
  }
}

function NetlifyIdentity() {
  React.useEffect(() => {
    initNetlifyIdentity();
  }, []);

  return <div></div>;
}

function Navigation({ location }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/home" style={{ color: "white" }}>
        the<span style={{ fontWeight: "800", color: "orange" }}>MVP</span>shop
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" activeKey={location.pathname}>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/projects">Projects</Nav.Link>
          <Nav.Link href="/milestones">Milestones</Nav.Link>
          <Nav.Link href="/devlog">DevLog</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <NetlifyIdentity />
      <Button
        onClick={() => {
          openNetlifyModal();
        }}
      >
        Login
      </Button>
    </Navbar>
  );
}

export default Navigation;
