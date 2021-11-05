import React from "react";
import { useHistory, Redirect, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
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
            <Navbar.Brand href="/">
              <img
                src="logo512.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />{" "}
              Twilioverflow
            </Navbar.Brand>
          </span>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
