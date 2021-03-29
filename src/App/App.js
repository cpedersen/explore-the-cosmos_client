import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import SearchContext from "../context/SearchContext";
import Homepage from "../views/Homepage/Homepage";
import Search from "../views/Search/Search";
import Results from "../views/Results/Results";
import Description from "../views/Description/Description";
import About from "../views/About/About";
import RandomQuote from "../views/RandomQuote/RandomQuote";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  state = {
    query: "",
    searchResults: [],
    total_hits: 0,
    quote: "",
    numOfPages: 1,
  };

  onSearchResults = ({ results, total_hits, numOfPages }) => {
    this.setState({
      searchResults: results,
      total_hits,
      numOfPages,
    });
  };

  setResults = (value) => {
    this.setState({
      searchResults: value,
    });
  };

  onQueryChange = (value) => {
    this.setState({
      query: value,
    });
  };

  resetNumPages = () => {
    this.setState({
      numOfPages: 1,
    });
  };

  render() {
    //console.log("this in app", this);

    const { query, searchResults, total_hits, quote, numOfPages } = this.state;
    const { onSearchResults, onQueryChange, setResults, resetNumPages } = this;

    const contextValue = {
      query,
      searchResults,
      total_hits,
      onSearchResults,
      onQueryChange,
      setResults,
      quote,
      numOfPages,
      resetNumPages,
    };

    return (
      <BrowserRouter>
        <main className="App">
          <SearchContext.Provider value={contextValue}>
            <div className="content" aria-live="polite">
              <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/results" component={Results} />
                <Route exact path="/quote" component={RandomQuote} />
                <Route
                  exact
                  path="/description/:nasa_id"
                  component={Description}
                />
                <Route exact path="/about" component={About} />
              </Switch>
            </div>
          </SearchContext.Provider>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
