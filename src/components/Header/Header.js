import React, { useState } from "react";
import Cookies from "universal-cookie";
import {
  Container,
  Nav,
  Modal,
  Button,
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Emoji from "../Emoji/Emoji";
import Navbar from "react-bootstrap/Navbar";
import "./Header.scss";

const Header = (props) => {
  const cookies = new Cookies();

  // modal constants
  const [about, setAbout] = useState(false);
  const [search, setSearch] = useState(false);

  // search constant
  const [searchString, setSearchString] = useState("");

  // handle modals
  const closeAbout = () => setAbout(false);
  const openAbout = () => setAbout(true);
  const closeSearch = () => setSearch(false);
  const openSearch = () => setSearch(true);

  // handle search submit
  const handleSearch = (event) => {
    cookies.set("search", searchString, { path: "/" });
    cookies.set("answered", event, { path: "/" });
    closeSearch();
    window.location.reload();
  };

  const clearSearch = (event) => {
    cookies.remove("search", { path: "/" });
    cookies.remove("answered", { path: "/" });
    closeSearch();
    window.location.reload();
  };

  let clearSearchLink = "";
  if (cookies.get("search")) {
    clearSearchLink = <Nav.Link onClick={clearSearch}>Clear Search</Nav.Link>;
  }

  let caution = <Emoji symbol="☑️" label="unaccepted" />;

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
            <Nav.Link onClick={openAbout}>About</Nav.Link>

            <Nav.Link href="mailto:twilioverflow@twilioverflow.com">
              Contact
            </Nav.Link>

            <Nav.Link onClick={openSearch}>Search</Nav.Link>
          </Nav>
          <Nav className="text-end ms-auto">{clearSearchLink}</Nav>
        </Container>
      </Navbar>

      <Modal show={about} onHide={closeAbout}>
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
          <Button variant="secondary" onClick={closeAbout}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={search} onHide={closeSearch}>
        <Modal.Header closeButton>
          <Modal.Title>Search Twilioverflow</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              aria-label="Search For"
              placeholder="Search For..."
              onChange={(e) => setSearchString(e.target.value)}
            />

            <DropdownButton
              variant="outline-secondary"
              title="Search"
              id="input-group-dropdown-2"
              align="end"
              onSelect={handleSearch}
            >
              <Dropdown.Item eventKey="">All</Dropdown.Item>
              <Dropdown.Item eventKey="true">Answered</Dropdown.Item>
              <Dropdown.Item eventKey="false">Unanswered</Dropdown.Item>
            </DropdownButton>
          </InputGroup>
          {caution}{" "}
          <span style={{ fontSize: "10pt" }}>= Unaccepted Answer</span>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
