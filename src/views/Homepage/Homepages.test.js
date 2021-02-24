import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Homepage from "./Homepage";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Homepage />);
  const result = renderer.getRenderOutput();
  expect(result.type).toBe("div");
});
