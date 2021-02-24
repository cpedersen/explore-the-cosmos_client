import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import About from "./About";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<About />);
  const result = renderer.getRenderOutput();
  expect(result.type).toBe("div");
});

/*it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<About />, div);

  ReactDOM.unmountComponentAtNode(div);
});*/
