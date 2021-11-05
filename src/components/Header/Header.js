import React from "react";
import { useHistory, Redirect, Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "./Header.scss";

const Header = () => {
  const history = useHistory();

  const clearFilters = () => {
    return <Redirect to="/" />;
  };

  return (
    <>
      <Navbar variant="dark" bg="danger" sticky="top">
        <Container>
          <span style={{ fontWeight: "bold" }}>
            <Navbar.Brand href="/">Twilioverflow</Navbar.Brand>
          </span>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
