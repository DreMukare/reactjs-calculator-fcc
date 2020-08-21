import React from "react";
import styled from "styled-components";

const Clear = styled.button`
  cursor: pointer;
  height: 50px;
  width: 70%;
  border: none;
  border-radius: 50px;
  font-size: 25px;
  color: #111;
  margin-top: 10px;
  background-color: #a5a5a5;
`;

export default function ClearButton(props) {
  return (
    <Clear id="clear" onClick={props.handleClear}>
      {props.children}
    </Clear>
  );
}
