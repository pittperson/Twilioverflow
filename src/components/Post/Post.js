import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Post.scss";
import Tag from "../Tags/Tag";

const Post = (props) => {
  let x = 1;
  const tagList = [];

  // console.log(props.tags);

  props.tags.forEach((tag) => {
    tagList.push(<Tag key={x} tag={tag} filters={props.filters} />);
    x++;
  });

  let answered = "";
  let variant = "";
  if (props.answered) {
    answered = "yes";
    variant = "success";
  } else {
    answered = "no";
    variant = "danger";
  }

  return (
    <>
      <Container className="titleBox">
        <Row>
          <Col>
            <a href={props.link} target="_blank" rel="noreferrer">
              {props.title}
            </a>
          </Col>
        </Row>
        <Row>
          <Col xs="10">
            <div className="pt-1 pb-1">{tagList}</div>
          </Col>
          <Col>
            <div className="d-grid gap-2 pt-1 pb-1">
              <Button className="mt-1 float-end" size="sm" variant={variant}>
                answered: {answered}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Post;
