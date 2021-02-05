import React from "react";

const SearchContext = React.createContext({
  query: null,
  total_hits: 0,
  loading: false,
});

export default SearchContext;
