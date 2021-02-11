import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchContext from "../../context/SearchContext";
import config from "../../config";
import Results from "../Results/Results";
import "./Search.css";

const START_DATE = 1920;
const END_DATE = new Date().getFullYear();

class Search extends Component {
  static contextType = SearchContext;

  // start_date & end_date: start year and end year
  // loading: true (still waiting on NASA search return), else false
  // limitReached: number of items on the page (max: 100)
  // keywords: NASA keyword search support
  state = {
    start_date: START_DATE,
    end_date: END_DATE,
    error: null,
    loading: false,
    page: 1,
    limitReached: false,
    keywords: {},
  };

  componentDidMount() {
    // Print out the props
    console.log("mounted: ", this.props);

    // Construct the url using this.props.location (location contains
    // information about the query params)
    const url = new URLSearchParams(this.props.location.search);

    // Get the query that the user inputted; if no query found, then
    // pass an empty string
    const query = url.get("q") || "";

    const keywordsText = url.get("keywords") || "";
    console.log("keywords text", keywordsText);
    const keywords = keywordsText.length
      ? keywordsText.split(",").reduce((acc, keyword) => {
          acc[keyword] = true;
          return acc;
        }, {})
      : {};

    console.log("keywords", keywords);

    // Find the page from the url; if nothing found, page is 1 by
    // default, according to API
    const page = parseInt(url.get("page")) || 1;

    // Find the start_date from the url; if nothing found, then it's
    // always the default; ditto for end_date
    const start_date = parseInt(url.get("year_start")) || START_DATE;
    const end_date = parseInt(url.get("year_end")) || END_DATE;

    // Pass the query to the onQueryChange function defined in App
    this.context.onQueryChange(query);

    if (
      // Check if we're using default settings to begin with (no
      // user input)
      start_date === START_DATE &&
      end_date === END_DATE &&
      page === 1 &&
      query === ""
    ) {
      // exit this function if default settings found
      console.log("Default search settings found");
      return;
    } else {
      // if we are using non-default settings, then continue
      console.log("User-provided search settings found");
    }

    // Default settings found, so we need to 1) pass to state an object
    // containing the state we need to update (page, start_date, end_date,
    // keywords) and 2) pass to state a callback function that will
    // initialize search parameters needed for pagination and for clearing
    // the date settings; the callback function initSearch is executed once
    // setState is completed and the component is re-rendered
    this.setState(
      {
        page,
        start_date,
        end_date,
        keywords,
      },
      () => {
        this.initSearch(page);
      }
    );
  }

  updateFormState = (e) => {
    // Update state using value inputted by the user (name is key)
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onTagClick = (tag) => {
    // Is the tag in keywords?
    // If it is, set it to the opposite value
    // Otherwise, set it to true
    const tagLower = tag.toLowerCase();
    let nextTagValue = true;

    // Don't allow the user to add the same tag twice to the list of
    // keywords used in the query
    // If user keeps selecting the same tag, then add or remove it from
    // the query (nextTagValue = true/false)
    if (Reflect.has(this.state.keywords, tagLower)) {
      nextTagValue = !this.state.keywords[tagLower];
      console.log("nextTagValue inside Reflect: ", nextTagValue);
    }
    console.log("nextTagValue: ", nextTagValue);

    const keywords = {
      ...this.state.keywords,
      [tagLower]: nextTagValue,
    };

    this.context.onQueryChange("");
    this.setState(
      {
        keywords,
      },
      () => {
        this.initSearch(this.state.page);
      }
    );
  };

  onSubmitSearchForm = (e) => {
    //Keep the page visible with preventDefault after a search;
    //Store the url search parameters after user has inputted
    //their search
    e.preventDefault();
    this.initSearch(this.state.page);
  };

  prepareKeywordsUrlValue = (keywords) => {
    return Object.entries(keywords)
      .reduce((acc, [keyword, isActive]) => {
        if (!isActive) return acc;
        // Keyword is active
        acc.push(keyword);
        return acc;
      }, [])
      .join(",");
  };

  //Get the url search params, so that the user has the full path of
  //the search available; set loading to true, so that we can indicate
  //that a search is underway
  initSearch = async (page) => {
    const keywordsText = this.prepareKeywordsUrlValue(this.state.keywords);
    const urlParams = `?q=${this.context.query}&media_type=image&year_start=${this.state.start_date}&year_end=${this.state.end_date}&keywords=${keywordsText}&page=${page}`;
    const SEARCH_URL = `${config.API_ENDPOINT}${urlParams}`;
    this.props.history.push(`${this.props.match.path}${urlParams}`);
    this.setState({
      loading: true,
    });
    try {
      const response = await fetch(SEARCH_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.API_KEY}`,
        },
        type: "cors",
      });

      const result = await response.json();
      console.log("NASA results: ", result);
      if (result.collection.items.length < 100) {
        this.setState({
          limitReached: true,
        });
      }

      const itemsToTag = result.collection.items
        .slice(0, 5)
        .map((item) => item.links?.[0].href);
      console.log("items to tag: ", itemsToTag);
      const taggedResponse = await fetch(
        "http://localhost:8000/api/vision/tag-images",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemsToTag),
        }
      );

      const taggedResults = await taggedResponse.json();

      console.log({ taggedResults });
      const { tags } = taggedResults;

      let data = [...result.collection.items];
      tags.forEach((imageTags, index) => {
        data[index].data[0].tags = imageTags;
      });

      this.context.onSearchResults({
        results: data,
        total_hits: result.collection.metadata.total_hits,
      });
      this.setState({
        loading: false,
      });
    } catch (error) {
      console.error("Error: ", error);
      this.setState({
        error: error.message,
        loading: false,
      });
    }

    //Fetch the search data; each page includes up to 100 images, according
    //to NASA API; establish whether limitReached (needed for Next) was found
    //for current page; get results and total_hits (number items found); set
    //loading to false

    /*
    fetch(SEARCH_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
      type: "cors",
    })
      .then((response) => response.json())
      .then(async (result) => {
        console.log("Success: ", result);
        if (result.collection.items.length < 100) {
          this.setState({
            limitReached: true,
          });
        }
      })
      .then((result) => {
        this.context.onSearchResults({
          results: result.collection.items,
          total_hits: result.collection.metadata.total_hits,
        });
        this.setState({
          loading: false,
        });
      })
      .catch((error) => {
        console.error("Error: ", error);
        this.setState({
          error: error.message,
          loading: false,
        });
      });*/
  };

  //When the query has been changed by the user, we need to reset
  //the page to 1 (default) in both state and context
  onQueryChange = (e) => {
    if (this.state.page > 1) {
      this.setState({ page: 1 });
    }
    this.context.onQueryChange(e.target.value);
  };

  //Track pagination for Next
  onNextPage = (e) => {
    e.preventDefault();
    if (this.state.limitReached) return;
    const nextPage = this.state.page + 1;
    this.setState({
      page: nextPage,
    });
    this.initSearch(nextPage);
  };

  //Track pagination for Previous
  onPrevPage = (e) => {
    e.preventDefault();
    const prevPage = this.state.page === 1 ? 1 : this.state.page - 1;
    this.setState({ page: prevPage });
    this.initSearch(prevPage);
  };

  //Count the number of pages to display (denominator = results/page)
  /*getPagesCount = (total, denominator) => {
    const divisible = total % denominator === 0;
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor(total / denominator) + valueToBeAdded;
  };*/

  //We need a Reset button so that the search params and pagination
  //can be set back to the default values; also, the results and url
  //need to be cleared
  resetForm = (e) => {
    //Stop the event from continuing to display the results
    e.preventDefault();
    //Go back to default settings
    this.setState({
      page: 1,
      start_date: START_DATE,
      end_date: END_DATE,
    });
    //Clear query entered by user
    this.context.onQueryChange("");
    //Clear results displayed on the Search page
    this.context.setResults([]);
    //Clear url search params
    this.props.history.push("/search");
  };

  //On the Search page, navbar links open new pages to prevent any
  //clearing of search results; Submit button should indicate whether
  //loading is happening; if search results found, then render them;
  //otherwise render null
  render() {
    console.log("this in search: ", this);
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
              onTagClick={this.onTagClick}
            />
            <nav className="footer-results">
              {this.state.page !== 1 ? (
                <button onClick={this.onPrevPage}>Prev</button>
              ) : (
                <span></span>
              )}
              <span>{this.state.page}</span>

              {!this.state.limitReached ? (
                <button onClick={this.onNextPage}>Next</button>
              ) : (
                <span></span>
              )}
            </nav>
          </>
        ) : null}
      </div>
    );
  }
}

export default Search;
