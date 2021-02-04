import React from "react";

const SearchContext = React.createContext({
  query: null,
  total_hits: 0,
  loading: false,
  //show_prev_link: false,
  //show_next_link: false,
});

export default SearchContext;
