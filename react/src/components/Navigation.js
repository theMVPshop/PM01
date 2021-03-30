import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
const netlifyIdentity = require("netlify-identity-widget");

netlifyIdentity.init();

const user = netlifyIdentity.currentUser();

// netlifyIdentity.on("init", (user) => console.log("init", user));

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
    // user.role = ["client"];
    console.log(user);
  } else {
    console.log("netlifyIdentity not defined");
  }
}

function NetlifyIdentity() {
  React.useEffect(() => {
    initNetlifyIdentity();
  }, []);

  return <></>;
}

function Navigation({ location }) {
  return (
    <div style={{ paddingBottom: "6px" }}>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/" style={{ color: "white" }}>
          the<span style={{ fontWeight: "800", color: "orange" }}>MVP</span>shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" activeKey={location.pathname}>
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
    </div>
  );
}

export default Navigation;
