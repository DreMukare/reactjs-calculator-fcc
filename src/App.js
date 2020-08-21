import React, { useState } from "react";
import Button from "./Components/Button";
import Display from "./Components/Display";
import ClearButton from "./Components/ClearButton";
import styled from "styled-components";
import * as math from "mathjs";

const Container = styled.div`
  width: 300px;
  height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #111;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default function App() {
  const [calc, setCalc] = useState({ input: "", disp: "0" });
  const [operatorFlag, setOperatorFlag] = useState(0);

  const operators = {
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/"
  };

  const handleInput = (e) => {
    let val = e.target.textContent;

    if (calc.disp === "0" && val === "0") {
      return;
    }

    if (calc.disp === "0" && val === ".") {
      setCalc({ ...calc, disp: "0." });
      return;
    }

    if (calc.disp === "0") {
      setCalc((calc.disp = ""));
    }

    if (val === operators[val]) {
      if (operatorFlag === 0) {
        setCalc({ ...calc, input: `${calc.input}${calc.disp}${val}` });
      } else {
        setCalc({ ...calc, input: `${calc.input}${val}` });
      }
    } else {
      if (!(calc.disp.includes(".") && val === ".")) {
        if (operatorFlag === 0) {
          setCalc({ ...calc, disp: `${calc.disp}${val}` });
        } else if (operatorFlag === 1) {
          setCalc({ ...calc, disp: `${val}` });
          setOperatorFlag(0);
        }
      }
    }
  };

  const handleEqual = () => {
    const mathString = `${calc.input.replace(/,/g, "")}${calc.disp}`;
    let finalMathString = mathString;
    const plusRegex = /(([/*-]+)?)?\+/g;
    const mulRegex = /(([/*+-]+)?)?\*/g;
    const divRegex = /(([/*+-]+)?)?\//g;
    const subRegex = /(([/*+-]+)?)?(([/*+-])?)?-/g;
    if (mathString.match(plusRegex)) {
      finalMathString = mathString.replace(plusRegex, "+");
    } else if (mathString.match(mulRegex)) {
      finalMathString = mathString.replace(mulRegex, "*");
    } else if (mathString.match(divRegex)) {
      finalMathString = mathString.replace(divRegex, "/");
    } else if (mathString.match(subRegex)) {
      if (mathString.match(/(([/*+-]+)?)?\+-/g)) {
        finalMathString = mathString.replace(/(([/*+-]+)?)?\+-/g, "+-");
      } else if (mathString.match(/(([/*+-]+)?)?\*-/g)) {
        finalMathString = mathString.replace(/(([/*+-]+)?)?\*-/g, "*-");
      } else if (mathString.match(/(([/*+-]+)?)?\/-/g)) {
        finalMathString = mathString.replace(/(([/*+-]+)?)?\/-/g, "/-");
      } else if (mathString.match(/(([/*+-]+)?)?--/g)) {
        finalMathString = mathString.replace(/(([/*+-]+)?)?--/g, "--");
      }
    }

    const result = math.evaluate(finalMathString).toString();

    setCalc({ input: "", disp: result });
  };

  return (
    <div className="App">
      <Container id="container">
        <Display>{calc.disp}</Display>
        <Row>
          <Button handleClick={(e) => handleInput(e)} id="seven" value="7">
            7
          </Button>
          <Button handleClick={(e) => handleInput(e)} id="eight" value="8">
            8
          </Button>
          <Button handleClick={(e) => handleInput(e)} id="nine" value="9">
            9
          </Button>
          <Button
            handleClick={(e) => {
              setOperatorFlag(1);
              handleInput(e);
            }}
            id="divide"
            className="operator"
            value="/"
          >
            /
          </Button>
        </Row>
        <Row>
          <Button handleClick={(e) => handleInput(e)} id="four" value="4">
            4
          </Button>
          <Button handleClick={(e) => handleInput(e)} id="five" value="5">
            5
          </Button>
          <Button handleClick={(e) => handleInput(e)} id="six" value="6">
            6
          </Button>
          <Button
            handleClick={(e) => {
              setOperatorFlag(1);
              handleInput(e);
            }}
            id="multiply"
            className="operator"
            value="*"
          >
            *
          </Button>
        </Row>
        <Row>
          <Button handleClick={(e) => handleInput(e)} id="one" value="1">
            1
          </Button>
          <Button handleClick={(e) => handleInput(e)} id="two" value="2">
            2
          </Button>
          <Button handleClick={(e) => handleInput(e)} id="three" value="3">
            3
          </Button>
          <Button
            handleClick={(e) => {
              setOperatorFlag(1);
              handleInput(e);
            }}
            id="add"
            class="operator"
            value="+"
          >
            +
          </Button>
        </Row>
        <Row>
          <Button handleClick={(e) => handleInput(e)} id="decimal" value=".">
            .
          </Button>
          <Button handleClick={(e) => handleInput(e)} id="zero" value="0">
            0
          </Button>
          <Button handleClick={handleEqual} id="equals">
            =
          </Button>
          <Button
            handleClick={(e) => {
              setOperatorFlag(1);
              handleInput(e);
            }}
            id="subtract"
            symbol="-"
            className="operator"
            value="-"
          >
            -
          </Button>
        </Row>
        <Row>
          <ClearButton
            id="clear"
            handleClear={() => {
              setCalc({ input: "", disp: "0" });
            }}
          >
            Clear
          </ClearButton>
        </Row>
      </Container>
    </div>
  );
}
