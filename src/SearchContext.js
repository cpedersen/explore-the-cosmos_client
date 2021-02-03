import React from 'react'

const SearchContext = React.createContext({
  query: null,
  search_results: [],
  total_hits: 0,
  total_pages: 0,
  current_page_no: 0,
  error: null,
  start_date: 1920,
  end_date: new Date().getFullYear(),
  loading: false,
  show_prev_link: false,
  show_next_link: false
})

export default SearchContext