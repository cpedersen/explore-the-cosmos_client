import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Search from "./Search";
import { BrowserRouter } from "react-router-dom";
import SearchContext from "../../context/SearchContext";

it("renders without crashing", () => {
  // first create a DOM element to render the component into
  const div = document.createElement("div");

  const contextValue = {
    //query: "",
    searchResults: [],
    total_hits: 0,
    onSearchResults: () => {},
    onQueryChange: () => {},
    setResults: () => {},
    quote: "...",
  };

  // render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(
    <BrowserRouter>
      <SearchContext.Provider value={contextValue}>
        <Search />
      </SearchContext.Provider>
    </BrowserRouter>,
    div
  );

  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});
