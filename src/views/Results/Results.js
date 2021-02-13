import React, { Component } from "react";
import "./Results.css";
import ResultItem from "./ResultItem";

class Results extends Component {
  onTagClick = (e, keyword) => {
    e.preventDefault();
    this.props.onTagClick(keyword);
  };
  render() {
    //console.log("this in results: ", this);
    const {
      total_hits,
      items,
      fetchVisionTags,
      searchInitialised,
    } = this.props;
    return (
      <div className="container-results">
        <div className="all-results">
          {searchInitialised && !items.length ? (
            "No results found"
          ) : searchInitialised ? (
            <div className="results-count">
              <p>{total_hits} Results Found...</p>
            </div>
          ) : null}
          {items.map((item) => {
            return (
              <ResultItem
                item={item}
                onTagClick={this.onTagClick}
                key={item.data[0].nasa_id}
                fetchVisionTags={fetchVisionTags}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Results;
