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
  let bgColor = "";
  if (props.answered) {
    answered = "yes";
    variant = "success";
    bgColor = "#dc3645";
  } else {
    answered = "no";
    variant = "danger";
    bgColor = "#198754";
  }

  return (
    <>
      <Container className="titleBox">
        <Row>
          <Col xs={11}>
            <Row className="p-0">
              <Col>
                <a href={props.link} target="_blank" rel="noreferrer">
                  {props.title}
                </a>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="pt-1 pb-1">{tagList}</div>
              </Col>
            </Row>
          </Col>
          <Col xs={1} className="p-0 text-end">
            <div
              style={{
                backgroundColor: bgColor,
                width: "15px",
                height: "100%",
                float: "right",
              }}
            ></div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Post;
