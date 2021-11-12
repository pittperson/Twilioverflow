import SearchTag from "../Tags/SearchTags";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import {
  Container,
  Nav,
  Modal,
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton,
  ToggleButton,
} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
// import Tag from "../Tags/Tag";
import "./Header.scss";

const Header = (props) => {
  const cookies = new Cookies();
  const twilioTags = props.twilioTags;

  // modal constants
  const [about, setAbout] = useState(false);
  const [search, setSearch] = useState(false);

  // search constant
  const [searchString, setSearchString] = useState("");
  const [checkedState, setCheckedState] = useState([]);

  console.log(twilioTags);
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };
  console.log(checkedState);
  // let searchTagList = [];
  // twilioTags.forEach((tag) => {
  //   searchTagList.push(<SearchTag key={tag} tagName={tag} />);
  // });

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

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="sm"
        variant="dark"
        bg="danger"
        sticky="top"
      >
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

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsove-navbar-nav">
            <Nav className="text-end me-auto">
              <Nav.Link onClick={openAbout}>About</Nav.Link>

              <Nav.Link href="mailto:twilioverflow@twilioverflow.com">
                Contact
              </Nav.Link>

              <Nav.Link onClick={openSearch}>Search</Nav.Link>
            </Nav>
          </Navbar.Collapse>
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
        </Modal.Body>
        {/* <Modal.Body>{searchTagList}</Modal.Body> */}
        <Modal.Body>
          {twilioTags.map((tag, index) => {
            return (
              <ToggleButton
                className="mx-1 my-1"
                id={`tag-${index}`}
                key={`${tag}-${index}`}
                type="checkbox"
                variant="outline-secondary"
                checked={checkedState[index]}
                value={tag}
                onChange={() => handleOnChange(index)}
                size="sm"
              >
                {tag}
              </ToggleButton>
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
