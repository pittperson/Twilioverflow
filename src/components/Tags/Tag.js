import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const Tag = (props) => {
  const [tagHref, setTagHref] = useState("");
  const [match, setMatch] = useState("");

  let variant = "";
  let regEx = new RegExp(`${props.tag};`, "gi");

  const checkForTagMatch = () => {
    if (window.location.pathname.match(regEx)) {
      setTagHref(window.location.pathname.replace(regEx, ""));
      setMatch("yes");
    } else {
      setTagHref(`${window.location.pathname}${props.tag};`);
      setMatch("no");
    }
  };

  useEffect(() => {
    checkForTagMatch();
  }, [match]);

  props.filters.match(regEx)
    ? (variant = "outline-danger")
    : (variant = "outline-secondary");

  return (
    <>
      <Button className="mt-1" variant={variant} size="sm">
        <a href={`${window.location.origin}${tagHref}`}>{props.tag}</a>
      </Button>{" "}
    </>
  );
};

export default Tag;
