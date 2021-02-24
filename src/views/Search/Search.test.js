import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Search from "./Search";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Search />);
  const result = renderer.getRenderOutput();
  expect(result.type).toBe("div");
});

/*import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Search from "./Search";
import { BrowserRouter } from "react-router-dom";
import SearchContext from "../../context/SearchContext";

it("renders without crashing", () => {
  const div = document.createElement("div");

  const contextValue = {
    query: "",
    searchResults: [],
    total_hits: 0,
    onSearchResults: () => {},
    onQueryChange: () => {},
    setResults: () => {},
    quote: "...",
  };

  ReactDOM.render(
    <BrowserRouter>
      <SearchContext.Provider value={contextValue}>
        <Search />
      </SearchContext.Provider>
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});*/
