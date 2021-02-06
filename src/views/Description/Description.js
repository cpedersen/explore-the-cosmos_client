import React, { Component } from "react";
import "./Description.css";
import { Link } from "react-router-dom";
import config from "../../config";

class Description extends Component {
  state = {
    loading: false,
    error: null,
    data: {},
  };

  componentDidMount() {
    const SEARCH_URL = `${config.API_ENDPOINT}?nasa_id=${this.props.match.params.nasa_id}`;
    console.log("SEARCH URL: " + SEARCH_URL);
    this.setState({
      loading: true,
      error: null,
    });

    //TODO - Add loading support here

    //Fetching the item search data
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
        console.log("result: ", result);
        const item = {
          ...result.collection.items[0].data[0],
          image: result.collection.items[0].links[0].href,
        };
        this.setState({
          loading: false,
          data: item,
        });
      })
      .catch((error) => {
        console.error("error: ", error);
        this.setState({
          loading: false,
          error: true,
        });
      });
  }

  render() {
    //console.log("this in description", this);
    const {
      center,
      description,
      date_created,
      //title,
      nasa_id,
      image,
    } = this.state.data;
    return (
      <div className="container-description">
        <nav className="navbar">
          <Link to="/" className="no-link"></Link>
          <button
            onClick={() => this.props.history.goBack()}
            className="search-link"
          >
            Go back to search results...
          </button>
          <Link to="/" className="no-link"></Link>
        </nav>
        <div className="item-description">
          <div className="header-description">Description Information:</div>
          <ul>
            <li>URL: {image}</li>
            <li>File Size</li>
            <li>File Format</li>
            <li>NASA ID: {nasa_id}</li>
            <li>Center: {center}</li>
            <li>Date Created: {date_created}</li>
            <li>Location</li>
            <li>Photographer</li>
            <li>Description: {description}</li>
          </ul>
        </div>
        {/*<nav className="container-footer-results">
          <a href="#"></a>
          <a href="#"></a>
          <a href="#">Next</a>
        </nav>*/}
      </div>
    );
  }
}

export default Description;
