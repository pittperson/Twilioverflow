import React, { setState, useState } from "react";
import { Button, ToggleButton } from "react-bootstrap";

const SearchTag = (props) => {
  const [checked, setChecked] = useState(false);
  const [checkedColor, setCheckedColor] = useState("outline-secondary");
  const [tagPath, setTagPath] = useState("");

  let tagName = props.tagName;

  const handleChange = ({ target }) => {
    console.log(checked);

    setChecked(!checked);

    console.log(checked);
  };

  return (
    <>
      <ToggleButton
        className="mt-1"
        id="tagSearch[]"
        type="checkbox"
        variant={checkedColor}
        checked={checked}
        value={tagName}
        onChange={handleChange}
        size="sm"
      >
        {tagName}
      </ToggleButton>{" "}
    </>
  );
};

export default SearchTag;
