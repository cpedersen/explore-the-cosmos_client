import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Results from "./Results";
import ShallowRenderer from "react-test-renderer/shallow";

it.skip("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Results />);
  const result = renderer.getRenderOutput();
  expect(result.type).toBe("div");
});
