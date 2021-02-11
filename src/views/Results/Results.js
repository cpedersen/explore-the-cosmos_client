import React, { Component } from "react";
import "./Results.css";
import { Link } from "react-router-dom";

class Results extends Component {
  onTagClick = (e, keyword) => {
    e.preventDefault();
    this.props.onTagClick(keyword);
  };
  render() {
    //console.log("this in results: ", this);
    const { total_hits, items } = this.props;
    return (
      <div className="container-results">
        <div className="results-quote"></div>
        <div className="all-results">
          <div className="results-count">
            <p>{total_hits} Results Found...</p>
          </div>
          {items.map((item) => {
            const { title, nasa_id, keywords, tags } = item.data[0];
            return (
              <div className="item-result" key={nasa_id}>
                <div className="item">{title}</div>
                <div>
                  <Link to={`/description/${nasa_id}`}>
                    <img
                      className="item-result-image"
                      src={item.links[0].href}
                      alt={title}
                    />
                  </Link>
                </div>
                <div className="all-tags">
                  <div className="tags-nasa">
                    <div>
                      <b>NASA keywords: </b>
                      {keywords?.map((keyword, index) => {
                        return (
                          <button className="single-nasa-tag">
                            <a
                              onClick={(e) => this.onTagClick(e, keyword)}
                              key={index}
                            >
                              <span>{keyword} </span>
                            </a>
                          </button>
                        );
                      })}
                    </div>
                    {tags ? (
                      <div>
                        <b>Google Vision tags:</b>
                        {tags.map(({ score, description }) => {
                          return (
                            <button className="single-vision-tag">
                              <a
                                onClick={(e) => this.onTagClick(e, description)}
                                key={description}
                              >
                                {description}: {(score * 100).toFixed(2)}%
                              </a>
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                  {/*<div className="tags-google">Google Vision tags: TBD</div>*/}
                </div>
                <div>
                  <br></br>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Results;
