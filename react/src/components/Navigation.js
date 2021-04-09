import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

function Navigation({ location, NetlifyIdentity, openNetlifyModal }) {
  let loggedIn = localStorage.getItem("loggedIn");
  return (
    <div style={{ paddingBottom: "6px" }}>
      <Navbar bg="light" variant="light" expand="lg">
        <Navbar.Brand href="/" style={{ color: "black" }}>
          the<span style={{ fontWeight: "800", color: "black" }}>MVP</span>shop
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
          {loggedIn === "true" ? "Logout" : "Login"}
        </Button>
      </Navbar>
    </div>
  );
}

export default Navigation;
