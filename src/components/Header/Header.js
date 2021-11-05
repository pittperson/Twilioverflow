import React, { useState } from "react";
import { useHistory, Redirect, Link } from "react-router-dom";
import { Container, Nav, Modal, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Envelope } from "react-bootstrap-icons";
import "./Header.scss";

const Header = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar variant="dark" bg="danger" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="/logo512.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />{" "}
            Twilioverflow
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={handleShow}>About</Nav.Link>

            <Nav.Link href="mailto:twilioverflow@twilioverflow.com">
              Contact
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>About Twilioverflow</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            New to Twilio, I was browsing stack
            <span style={{ fontWeight: "bold" }}>overflow</span> and me, being
            me, thought, "there has to be a quicker way to consume everything
            Twilio..." Enter Twilioverflow!
          </div>
          <br />
          <div>
            An aggregation of everything Twilio via stack
            <span style={{ fontWeight: "bold" }}>overflow</span>. Want to narrow
            things down? Just click on a tag below the title.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
