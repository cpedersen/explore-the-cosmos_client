import React, { Component } from "react";
import "./About.css";
import { Link } from "react-router-dom";

class About extends Component {
  render() {
    return (
      <div className="container-about">
        <nav className="navbar">
          <Link to="/" target="_blank" className="home-link">
            Home
          </Link>
          <Link to="/search" target="_blank" className="search-link">
            Search
          </Link>
          <Link to="" className="no-link"></Link>
        </nav>
        <div className="about-text">
          <p>
            Talk about Carl Sagan, describing his spirit of exploration and
            wonder.
          </p>
          <p>Then describe NASA.</p>
          <p>
            Next describe NASA's public repository of images, which was provided
            to excite the public more about astronomy.
          </p>
          <p>Explain that 100 images are displayed per page.</p>
        </div>
      </div>
    );
  }
}

export default About;
