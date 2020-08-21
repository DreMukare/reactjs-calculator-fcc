import React from "react";
import styled from "styled-components";

const DisplayArea = styled.div`
  height: 30px;
  width: 80%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: bold;
  font-size: 40px;
  color: white;
  padding: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export default function Display(props) {
  return <DisplayArea id="display">{props.children}</DisplayArea>;
}
