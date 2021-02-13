import React, { Component } from "react";
import "./About.css";
import { Link } from "react-router-dom";

class About extends Component {
  render() {
    return (
      <div className="container-about">
        <nav className="navbar">
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/search" className="link">
            Search
          </Link>
          <Link to="" className="no-link"></Link>
        </nav>
        <div className="about-text">
          <p>
            Talk about Carl Sagan, describing his spirit of exploration and
            wonder.
          </p>
          <p>Describe NASA.</p>
          <p>
            Describe NASA's public repository of images, which was provided to
            excite the public about astronomy.
          </p>
          <p>Explain that 100 images are displayed per page.</p>
          <p>
            Explain how keywords work: that this is a NASA query param, that
            selecting it again will clear it, that if you don't find what you're
            looking for using the keyword then try using the keyword in the
            Search field.
          </p>
          <p>
            Specifically explain how the NASA keywords work: that NASA has
            created these for potentially useful searches of their repository.
          </p>
          <p>
            Specifically explain how Google Vision labels work: that these run
            the images through the Google Vision API and create potentially
            useful (or useless) terms to use in the searches.
          </p>
        </div>
      </div>
    );
  }
}

export default About;
