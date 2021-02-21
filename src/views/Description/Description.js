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
    window.scrollTo(0, 0);

    const SEARCH_URL = `${config.NASA_API_ENDPOINT}?nasa_id=${this.props.match.params.nasa_id}`;
    //console.log("SEARCH URL: " + SEARCH_URL);
    this.setState({
      loading: true,
      error: null,
    });

    //Fetch the item search data
    fetch(SEARCH_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.NASA_API_KEY}`,
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
    //console.log("this in description: ", this);
    const {
      title,
      center,
      description,
      date_created,
      nasa_id,
      image,
      location,
    } = this.state.data;

    const readable_date = new Date(date_created).toDateString();

    return (
      <div className="container-description">
        <nav className="navbar">
          <Link to="/" className="no-link"></Link>
          <button onClick={() => this.props.history.goBack()} className="link">
            Go back to search results...
          </button>
          <Link to="/" className="no-link"></Link>
        </nav>
        <div className="item-description">
          <h2 className="header-description">{title}</h2>
          <ul>
            <li>
              <b>URL: </b>{" "}
              <a target="_blank" href={image}>
                {image}
              </a>
            </li>
            {/*<li>File Size</li>
            <li>File Format</li>*/}
            <li>
              <b>NASA ID: </b> {nasa_id}
            </li>
            <li>
              <b>Center: </b> {center}
            </li>
            <li>
              <b>Date Created: </b> {readable_date}
            </li>
            <li>
              <b>Location: </b> {location}
            </li>
            <li>
              <b>Description:</b> {description}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Description;
