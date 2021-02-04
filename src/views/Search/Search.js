import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchContext from "../../SearchContext";
import config from "../../config";
import Results from "../Results/Results";
import "./Search.css";

const START_DATE = 1920;
const END_DATE = new Date().getFullYear();

class Search extends Component {
  static contextType = SearchContext;

  state = {
    start_date: START_DATE,
    end_date: END_DATE,
    error: null,
    loading: false,
    total_pages: 0,
    page: 1,
    limitReached: false,
  };

  updateFormState = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmitSearchForm = (e) => {
    e.preventDefault();
    this.initSearch(this.state.page);
  };

  initSearch = (page) => {
    //console.log("NASA_URL " + `${config.API_ENDPOINT}`);
    //console.log("query:", this.state.query);
    const SEARCH_URL = `${config.API_ENDPOINT}?q=${this.context.query}&media_type=image&year_start=${this.state.start_date}&year_end=${this.state.end_date}&page=${page}`;
    //console.log("SEARCH URL: " + SEARCH_URL);

    //Fetching the search data
    fetch(SEARCH_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
      type: "cors",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success: ", result);
        if (result.collection.items.length < 100) {
          this.setState({
            limitReached: true,
          });
        }
        this.context.onSearchResults({
          results: result.collection.items,
          total_hits: result.collection.metadata.total_hits,
          loading: false,
        });
        //console.log("total_hits: " + result.collection.metadata.total_hits);
      })
      .catch((error) => {
        console.error("Error: ", error);
        this.setState({
          error: error.message,
          loading: false,
        });
      });
  };

  onQueryChange = (e) => {
    const query = e.target.value;
    if (this.state.page > 1) {
      this.setState({ page: 1 });
    }
    this.context.onQueryChange(e);
  };

  onNextPage = (e) => {
    e.preventDefault();
    if (this.state.limitReached) return;
    const nextPage = this.state.page + 1;
    this.setState({
      page: nextPage,
    });
    this.initSearch(nextPage);
  };
  onPrevPage = (e) => {
    e.preventDefault();
    const prevPage = this.state.page === 1 ? 1 : this.state.page - 1;
    this.setState({ page: prevPage });
    this.initSearch(prevPage);
  };

  //Count the number of pages to display (denominator = results/page)
  getPagesCount = (total, denominator) => {
    const divisible = total % denominator === 0;
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor(total / denominator) + valueToBeAdded;
  };

  render() {
    console.log("in search", this);
    return (
      <div className="container-search">
        <nav className="navbar">
          <Link to="/" target="_blank" className="home-link">
            Home
          </Link>
          <Link to="/search" target="_blank" className="search-link">
            Search
          </Link>
          <Link to="/about" target="_blank" className="about-link">
            About
          </Link>
        </nav>
        <div className="search-criteria">
          <p className="search-criteria-intro">Enter Search Criteria:</p>
          <form
            action="/my-handling-form-page"
            method="get"
            className="search-criteria-form"
            onSubmit={this.onSubmitSearchForm}
          >
            <input
              type="search"
              value={this.context.query}
              name="query"
              id="search"
              placeholder="Search..."
              onChange={this.onQueryChange}
            />
            <label htmlFor="search">Enter search text</label>
            <br></br>
            {/*<input type="radio" checked={this.state.resultsType === 'most-recent'} value="most-recent" name="resultsType" id="recent" onChange={this.updateFormState}/> 
                        <label htmlFor="recent">Most recent</label>
                        <br>
                        </br>
                        <input type="radio" checked={this.state.resultsType === 'most-popular'} value="most-popular" name="resultsType" id="popular" onChange={this.updateFormState}/> 
                        <label htmlFor="popular">Most popular</label>
                        <br>
                        </br>
                        <input type="radio" checked={this.state.resultsType === ''} value="" name="resultsType" id="no-search-result-type" onChange={this.updateFormState}/> 
                        <label htmlFor="no-search-result-type">None</label>*/}
            <br></br>
            <input
              type="range"
              name="start_date"
              value={this.state.start_date}
              min={START_DATE}
              max={END_DATE}
              id="start_date"
              onChange={this.updateFormState}
            />
            <label htmlFor="start_date">
              Start date ({this.state.start_date})
            </label>
            <br></br>
            <input
              type="range"
              name="end_date"
              value={this.state.end_date}
              min={START_DATE}
              max={END_DATE}
              id="end_date"
              onChange={this.updateFormState}
            />
            <label htmlFor="end_date">End date ({this.state.end_date})</label>
            <br></br>
            <input type="submit" value="Submit" />
          </form>
        </div>
        {this.context.searchResults.length ? (
          <>
            <Results
              items={this.context.searchResults}
              total_hits={this.context.total_hits}
            />
            <nav className="footer-results">
              <a href="#" onClick={this.onPrevPage}>
                Prev
              </a>
              <span href="#">{this.state.page}</span>
              <a href="#" onClick={this.onNextPage}>
                Next
              </a>
            </nav>
          </>
        ) : null}
      </div>
    );
  }
}

export default Search;
