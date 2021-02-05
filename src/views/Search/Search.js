import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchContext from "../../context/SearchContext";
import config from "../../config";
import Results from "../Results/Results";
import "./Search.css";
import { v4 as uuidv4 } from "uuid";
import GlobalSpinner from "../../components/GlobalSpinner/GlobalSpinner";
import GlobalSpinnerContext from "../../context/GlobalSpinnerContext";

const START_DATE = 1920;
const END_DATE = new Date().getFullYear();

class Search extends Component {
  static contextType = SearchContext;

  state = {
    start_date: START_DATE,
    end_date: END_DATE,
    error: null,
    loading: false,
    page: 1,
    limitReached: false,
  };

  componentDidMount() {
    console.log("mounted", this.props);
    const url = new URLSearchParams(this.props.location.search);
    console.log("urls?", ...url.keys());
    const q = url.get("q") || "";
    const page = parseInt(url.get("page")) || 1;
    const start_date = parseInt(url.get("year_start")) || START_DATE;
    const end_date = parseInt(url.get("year_end")) || END_DATE;
    this.context.onQueryChange(q);
    if (
      start_date === START_DATE &&
      end_date === END_DATE &&
      page == 1 &&
      q == ""
    )
      return;

    this.setState(
      {
        page,
        start_date,
        end_date,
      },
      () => {
        this.initSearch(page);
      }
    );
  }

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

  initSearch = async (page) => {
    //console.log("NASA_URL " + `${config.API_ENDPOINT}`);
    //console.log("query:", this.state.query);
    const urlParams = `?q=${this.context.query}&media_type=image&year_start=${this.state.start_date}&year_end=${this.state.end_date}&page=${page}`;
    const SEARCH_URL = `${config.API_ENDPOINT}${urlParams}`;
    //console.log("SEARCH URL: " + SEARCH_URL);
    this.props.history.push(`${this.props.match.path}${urlParams}`);
    this.setState({
      loading: true,
    });

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
        });
        this.setState({
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
    //const query = e.target.value;
    if (this.state.page > 1) {
      this.setState({ page: 1 });
    }
    this.context.onQueryChange(e.target.value);
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

  resetForm = (e) => {
    e.preventDefault();
    this.setState({
      page: 1,
      start_date: START_DATE,
      end_date: END_DATE,
    });
    this.context.onQueryChange("");
    this.context.setResults([]);
    this.props.history.push("/search");
  };

  render() {
    console.log("this in search", this);
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
            <input
              type="submit"
              value={this.state.loading ? "Submitting" : "Submit"}
              disabled={this.state.loading}
            />
            <button onClick={this.resetForm}>Reset</button>
          </form>
        </div>
        {this.context.searchResults.length ? (
          <>
            <Results
              items={this.context.searchResults}
              total_hits={this.context.total_hits}
            />
            <nav className="footer-results">
              <button onClick={this.onPrevPage}>Prev</button>
              <span>{this.state.page}</span>
              <button onClick={this.onNextPage}>Next</button>
            </nav>
          </>
        ) : null}
      </div>
    );
  }
}

export default Search;
