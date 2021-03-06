import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchContext from "../../context/SearchContext";
import config from "../../config";
import Keywords from "./Keywords";
import Results from "../Results/Results";
import "./Search.css";
import SpecificQuote from "../SpecificQuote/SpecificQuote";
import "../SpecificQuote/SpecificQuote.css";

// Set date range
const START_DATE = 1920;
const END_DATE = new Date().getFullYear();

class Search extends Component {
  static contextType = SearchContext;

  constructor() {
    super();
    this.state = {
      start_date: START_DATE /* Used for date picker */,
      end_date: END_DATE /* Used for date picker */,
      error: null /* Error if fetch failed */,
      loading: false /* Indicates whether quotes/tags are being loaded */,
      page: 1 /* Current page */,
      // numOfPages: 1 /* Provides page count */,
      keywords: {} /* Track keywords/labels */,
      searchInitialised: false /* Track whether search was cleared */,
      didMount: false /* NOT USED: use for button to generate Random quotes */,
      newSearch: false /* Time to display a new random quote */,
      quote: "" /* Quote is cleared to start */,
    };

    // Save quote using localStorage
    const quotesCache = window.localStorage.getItem("quotesCache");
    if (quotesCache) {
      this.quotesCache = JSON.parse(quotesCache);
    } else {
      this.quotesCache = {};
    }
  }

  componentDidMount() {
    //console.log("mounted: ", this.props);

    // Persist the quote when the component finishes rendering.
    window.addEventListener("beforeunload", this.persistQuotesCache);

    // Get the url
    const url = new URLSearchParams(this.props.location.search);

    // Get the query that the user inputted; if no query found,
    // the query is null
    const query = url.get("q") || "";
    //console.log("q: ", query);

    // Get keywords/labels selected by user
    const keywordsText = url.get("keywords") || "";

    //console.log("keywords text: ", keywordsText);

    // If found, separate keywords/labels using a pipe since pipe
    // works the same as a comma in a url search
    const keywords = keywordsText.length
      ? keywordsText.split("||").reduce((acc, keyword) => {
          acc[keyword] = true;
          return acc;
        }, {})
      : {};

    //console.log("split keywords: ", keywords);

    // Find the page from the url; if nothing found, page is 1 by
    // default
    const page = parseInt(url.get("page")) || 1;

    // Find the date from the url; if nothing found, then use
    // the default
    const start_date = parseInt(url.get("year_start")) || START_DATE;
    const end_date = parseInt(url.get("year_end")) || END_DATE;

    // Pass the query to the onQueryChange function defined in App
    this.context.onQueryChange(query);
    console.log({
      start_date,
      end_date,
      page,
      query,
      keywordsText: !keywordsText.length,
    });
    if (
      // Check if we're using default settings to begin with
      start_date === START_DATE &&
      end_date === END_DATE &&
      page === 1 &&
      query === "" &&
      !keywordsText.length
    ) {
      console.log(
        "bail out; do not search",
        start_date,
        end_date,
        page,
        query,
        keywordsText
      );
      // Exit this function if default settings found
      //console.log("Default search settings found");
      /*if (this.context.searchResults?.length) {
        this.setState({
          searchInitialised: true,
        });
        const keywordsText = this.prepareKeywordsUrlValue(this.state.keywords);
        const urlParams = `?q=${this.context.query}&media_type=image&year_start=${this.state.start_date}&year_end=${this.state.end_date}&keywords=${keywordsText}&page=${page}`;
        this.initQuote(urlParams);
      }*/
      // this.initSearch(page);
      return;
    } else {
      console.log("search?");
      this.setState(
        {
          page,
          start_date,
          end_date,
          keywords,
        },
        () => {
          this.initSearch(page);
          this.setState({
            searchInitialised: true,
          });
        }
      );
      // If we are using non-default settings, then continue
      //console.log("User-provided search settings found");
    }

    // This setting is in case we want to generate random quotes
    // using a Random button; for now this is unused:
    // this.setState({ didMount: true });

    // Default settings found, so we need to 1) pass to state an object
    // containing the state we need to update (page, start_date, end_date,
    // keywords) and 2) pass to state a callback function that will
    // initialize search parameters needed for pagination and for clearing
    // the date settings; the callback function initSearch is executed once
    // setState is completed and the component is re-rendered
  }

  componentWillUnmount() {
    // Persist the quote before unmounting
    window.removeEventListener("beforeunload", this.persistQuotesCache);
    this.persistQuotesCache();
  }

  persistQuotesCache = () => {
    // Quote should be persisted when a user selects an item to get the
    // description, then selects Go Back
    //console.log("Persisting quotes cache");
    window.localStorage.setItem(
      "quotesCache",
      JSON.stringify(this.quotesCache)
    );
  };

  clearQuotesCache = () => {
    // Quote should be cleared when user selects Reset
    //console.log("Clearing quote");
    this.setState({
      quote: "",
    });
    //console.log("quote: ", this.state.quote);
    window.localStorage.removeItem("quotesCache");
  };

  updateFormState = (e) => {
    // Update state using value inputted by the user (name is key)
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onTagClick = (tag) => {
    // Is the tag in keywords?
    //     If it is, set it to the opposite value
    //     Otherwise, set it to true
    const tagLower = tag; //.toLowerCase();
    let nextTagValue = true;
    this.setState({
      newSearch: true,
    });

    // Don't allow the user to add the same tag twice to the list of
    // keywords used in the query
    // If user keeps selecting the same tag, then add or remove it from
    // the query (nextTagValue = true/false)
    if (Reflect.has(this.state.keywords, tagLower)) {
      nextTagValue = !this.state.keywords[tagLower];
      //console.log("nextTagValue inside Reflect: ", nextTagValue);
    }
    //console.log("nextTagValue: ", nextTagValue);

    const keywords = {
      ...this.state.keywords,
      [tagLower]: nextTagValue,
    };

    // When the query has been cleared, make sure everything else is
    // cleared: quote, page count, results count. Then scroll to top
    this.context.onQueryChange("");
    this.setState(
      {
        keywords,
      },
      () => {
        this.initSearch(this.state.page);
      }
    );
    window.scrollTo(0, 0);
  };

  onSubmitSearchForm = (e) => {
    // Keep the page visible with preventDefault after a search;
    // Store the url search parameters after user has inputted
    // their search
    e.preventDefault();
    this.initSearch(this.state.page);
  };

  prepareKeywordsUrlValue = (keywords) => {
    // Put together the url when the user selects a
    // NASA keyword or Google label
    if (this.state.keywords) {
      return Object.entries(keywords)
        .reduce((acc, [keyword, isActive]) => {
          if (!isActive) return acc;
          // Keyword is active
          acc.push(keyword);
          return acc;
        }, [])
        .join("||");
    }
  };

  fetchVisionTags = async (nasa_id, image) => {
    // Get the Google Vision labels using an async
    // function

    //console.log("in fetch vision", nasa_id, image);
    const taggedResponse = await fetch(
      `${config.REACT_APP_BASE_URL}/api/vision/tag-images`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([image]),
      }
    );

    const taggedResults = await taggedResponse.json();
    const { tags } = taggedResults;
    const imageTags = tags?.[0];
    //console.log("image tags: ", imageTags);
    const searchResults = this.context.searchResults.map((item) => {
      const result = item.data[0];
      if (result.nasa_id === nasa_id) {
        const clonedItem = JSON.parse(JSON.stringify(item));
        //console.log("matched item: ", nasa_id, clonedItem);
        clonedItem.data[0].tags = imageTags;
        return clonedItem;
      }
      return item;
    });

    this.context.setResults(searchResults);
    return imageTags;
  };

  fetchQuote = async (urlParams) => {
    // Fetch a random quote from the backend database
    //console.log("url params: ", urlParams);
    fetch(`${config.REACT_APP_BASE_URL}/api/quote`, {
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((quote) => {
        this.setState({
          quote,
        });

        // Save the quote to local storage
        this.quotesCache[urlParams] = quote;
        //console.log("After fetch quote: ", quote, this.quotesCache);
      });
  };

  initQuote = (urlParams) => {
    // componentDidMount and initSearch need the quote
    if (Object.prototype.hasOwnProperty.call(this.quotesCache, urlParams)) {
      this.setState({
        quote: this.quotesCache[urlParams],
      });
    } else {
      this.fetchQuote(urlParams);
    }
  };

  initSearch = async (page) => {
    // initSearch is used to track a number of things required by
    // Search: url, loading, whether new search has been triggered,
    // results, number hits.

    // Get the url search params, so that the user has the full path of
    // the search available

    const keywordsText = encodeURIComponent(
      this.prepareKeywordsUrlValue(this.state.keywords)
    );
    const urlParams = `?q=${this.context.query}&media_type=image&year_start=${this.state.start_date}&year_end=${this.state.end_date}&keywords=${keywordsText}&page=${page}`;
    this.initQuote(urlParams);
    const SEARCH_URL = `${config.NASA_API_ENDPOINT}${urlParams}`;
    this.props.history.push(`${this.props.match.path}${urlParams}`);

    // Need to know whether loading is true so that Submit
    // button can indicate that a search is underway
    // newSearch is needed to track when it's time to
    // display a new random quote
    // Callback function executes once setState has completed
    // and component has re-rendered
    this.setState(
      {
        loading: true,
        newSearch: false,
      },
      () => {
        this.setState({
          newSearch: true,
        });
      }
    );

    // Use await to pass code through a promise;
    // this fetch lets us know whether we need to
    // paginate, whether we're loading, what the
    // results are, and number of items in the results
    try {
      const response = await fetch(SEARCH_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.NASA_API_KEY}`,
        },
        mode: "cors",
      });

      const result = await response.json();
      //console.log("NASA results: ", result);
      /*if (result.collection.items?.length < 100) {
        this.setState({
          limitReached: true,
        });
      }*/

      this.context.onSearchResults({
        results: result.collection.items,
        total_hits: result.collection.metadata.total_hits,
        numOfPages: this.getPageCount(result.collection.metadata.total_hits),
      });

      this.setState({
        loading: false,
        // numOfPages: this.getPageCount(this.context.total_hits),
      });
    } catch (error) {
      console.error("error: ", error);
      this.setState({
        error: error.message,
        loading: false,
        newSearch: false,
      });
    } finally {
      /*console.log(
        "in init search finally",
        this.state,
        this.state.searchInitialised
      );*/
      if (this.state.searchInitialised) return;
      this.setState({
        searchInitialised: true,
      });
    }
  };

  onQueryChange = (e) => {
    // When the query has been changed by the user, reset
    // the page to 1 (default)
    if (this.state.page > 1) {
      this.setState({ page: 1 });
    }
    this.context.onQueryChange(e.target.value);
  };

  onNextPage = (e) => {
    // Track pagination for Next
    e.preventDefault();
    //if (this.state.limitReached) return;
    const nextPage = this.state.page + 1;
    this.setState({
      page: nextPage,
    });
    this.initSearch(nextPage);
  };

  onPrevPage = (e) => {
    // Track pagination for Previous
    e.preventDefault();
    const prevPage = this.state.page === 1 ? 1 : this.state.page - 1;
    this.setState({
      page: prevPage,
    });
    this.initSearch(prevPage);
  };

  getPageCount = (total, denominator = 100) => {
    // Count the number of pages to display (denominator = 100 items/page,
    // total = total_hits)
    const divisible = total % denominator === 0;
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor(total / denominator) + valueToBeAdded;
  };

  resetForm = (e) => {
    // Reset button sets search params and pagination
    // back to the default values; also, the results and url
    // are cleared

    // Stop the event from continuing to display the results
    e.preventDefault();
    // Go back to default settings
    this.setState({
      page: 1,
      // numOfPages: 1,
      start_date: START_DATE,
      end_date: END_DATE,
      keywords: {},
      searchInitialised: false,
      newSearch: false,
    });
    // Clear query entered by user
    this.context.onQueryChange("");
    // Clear results displayed on the Search page
    this.context.setResults([]);
    this.context.resetNumPages();
    // Clear url search params
    this.props.history.push("/search");
    // Clear quote
    this.clearQuotesCache();
  };

  removeKeyword = (e, keyword) => {
    e.preventDefault();
    let keywords = { ...this.state.keywords };
    delete keywords[keyword];
    this.setState(
      {
        keywords,
      },
      () => this.initSearch(this.state.page)
    );
  };

  render() {
    // On the Search page, navbar links open new pages to prevent any
    // clearing of search results
    // If search results found, then render them; otherwise render null
    // If search has been done, then display a new quote
    //console.log("this in search: ", this);

    return (
      <div className="container-search">
        <nav className="navbar">
          <Link to="/" target="_blank" rel="noreferrer" className="link">
            Home
          </Link>
          <Link to="/search" target="_blank" rel="noreferrer" className="link">
            Search
          </Link>
          <Link to="/about" target="_blank" rel="noreferrer" className="link">
            About
          </Link>
        </nav>

        {/* Only display a quote when there are results */}
        <div className="search-criteria">
          {this.context.total_hits > 0 ? (
            <SpecificQuote quote={this.state.quote} />
          ) : (
            <span></span>
          )}
          {/*<!--<p className="search-criteria-intro">Enter Search Criteria:</p>-->*/}
          <form
            method="get"
            className="search-criteria-form"
            onSubmit={this.onSubmitSearchForm}
          >
            <label htmlFor="search">Enter search text</label>
            <input
              type="search"
              value={this.context.query || ""}
              name="query"
              id="search"
              placeholder="Perseverance"
              onChange={this.onQueryChange}
            />
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

            <table>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="range"
                      name="start_date"
                      value={this.state.start_date}
                      min={START_DATE}
                      max={END_DATE}
                      id="start_date"
                      onChange={this.updateFormState}
                    />
                  </td>
                  <td>
                    <label htmlFor="start_date">Start date</label>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className="monospace">{this.state.start_date}</span>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="range"
                      name="end_date"
                      value={this.state.end_date}
                      min={START_DATE}
                      max={END_DATE}
                      id="end_date"
                      onChange={this.updateFormState}
                    />
                  </td>
                  <td>
                    <label htmlFor="end_date">End date</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="monospace">{this.state.end_date}</span>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>

            {parseInt(this.state.start_date) > parseInt(this.state.end_date) ? (
              <p className="error-text">
                Start date must be before the end date!
              </p>
            ) : null}

            <Keywords
              keywords={this.state.keywords}
              removeKeyword={this.removeKeyword}
            />

            <button
              className="submitButton"
              type="submit"
              disabled={this.state.loading}
            >
              {this.state.loading ? "Submitting" : "Submit"}
            </button>
            <button className="resetButton" onClick={this.resetForm}>
              Reset
            </button>
          </form>
        </div>
        <>
          <Results
            items={this.context.searchResults}
            total_hits={this.context.total_hits}
            onTagClick={this.onTagClick}
            fetchVisionTags={this.fetchVisionTags}
            searchInitialised={this.state.searchInitialised}
            keywords={this.state.keywords}
          />
          {this.context.searchResults?.length ? (
            <nav className="footer-results">
              {this.state.page !== 1 ? (
                <button className="footer-nav-button" onClick={this.onPrevPage}>
                  Prev
                </button>
              ) : (
                <span></span>
              )}
              <span className="page-num">
                {this.state.page} of {this.context.numOfPages}
              </span>

              {this.state.page !== this.context.numOfPages ? (
                <button className="footer-nav-button" onClick={this.onNextPage}>
                  Next
                </button>
              ) : (
                <span></span>
              )}
            </nav>
          ) : null}
        </>
      </div>
    );
  }
}

export default Search;
