import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import RandomQuote from "../RandomQuote/RandomQuote";

class Homepage extends Component {
  render() {
    return (
      <div className="container-homepage">
        <nav className="navbar">
          <Link to="" className="home-link"></Link>
          <Link to="" className="search-link"></Link>
          <Link to="/about" className="about-link">
            About
          </Link>
        </nav>
        <div className="intro">
          <RandomQuote />
          <div className="intro-description">
            <p>
              Trace the origins of our knowledge and the scientific method.
              Explore 15 billion years of cosmic evolution.
            </p>
            <p>Click the button below to get started...</p>
          </div>
          <Link to="/search" className="intro-search-link">
            Search the Cosmos
          </Link>
        </div>
      </div>
    );
  }
}

export default Homepage;
