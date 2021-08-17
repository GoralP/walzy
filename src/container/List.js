import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { Button } from "reactstrap";

const List = (props) => {
  return (
    <Button
      className="add-tag-btn"
      onClick={() => {
        props.onSelect(props.id);
      }}
    >
      {props.text}
      <GrFormClose className="ml-33" />
    </Button>
  );
};

export default List;
