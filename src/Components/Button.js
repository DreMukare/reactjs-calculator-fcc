import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  cursor: pointer;
  height: 50px;
  width: 50px;
  border-radius: 50px;
  border: none;
  margin: 5px;
  font-size: 25px;
  background-color: #333333;
  color: white;
`;

export default function Button(props) {
  return (
    <Btn onClick={props.handleClick} id={props.id}>
      {props.children}
    </Btn>
  );
}
