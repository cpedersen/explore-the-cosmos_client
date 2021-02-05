import React, { Component } from "react";
import "./Results.css";
import { Link } from "react-router-dom";
//import SearchContext from "../../SearchContext";

class Results extends Component {
  /*state = {
    show_prev_link: false,
    show_next_link: false,
  };*/

  render() {
    return (
      <div className="container-results">
        <div className="all-results">
          <div className="results-count">
            <p>{this.props.total_hits} Results Found...</p>
          </div>
          {this.props.items.map((item) => {
            const { title, nasa_id, keywords } = item.data[0];
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
                      NASA Keywords:{" "}
                      {keywords?.map((keyword, index) => {
                        return <span key={index}>{keyword} </span>;
                      })}
                    </div>
                  </div>
                  <div className="tags-google">Google Tags: TBD</div>
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
