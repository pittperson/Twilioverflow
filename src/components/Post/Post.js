import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Post.scss";
import Tag from "../Tags/Tag";
import Emoji from "../Emoji/Emoji";

const Post = (props) => {
  let x = 1;
  const tagList = [];

  // console.log(props.tags);

  props.tags.forEach((tag) => {
    tagList.push(<Tag key={x} tag={tag} filters={props.filters} />);
    x++;
  });

  let bgColor = "";
  if (props.answered.toString() === "true") {
    bgColor = "#198754";
  } else {
    bgColor = "#dc3645";
  }

  let caution = "";
  if (props.answered && !props.acceptedAnswer) {
    caution = <Emoji symbol="☑️" label="unaccepted" />;
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
            {caution}
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
