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
          <Link to="/about" className="no-link">
            About
          </Link>
        </nav>
        <div className="about-text">
          <h2>Explore the Cosmos with Carl Sagan</h2>
          <p>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://en.wikipedia.org/wiki/Carl_Sagan"
            >
              Carl Sagan
            </a>{" "}
            was an American astronomer, who captivated audiences with his{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/Cosmos:_A_Personal_Voyage"
            >
              Cosmos
            </a>{" "}
            TV series in 1980. He was the face of science in America, reminding
            us that we are but a granular part of the universe and encouraging
            us to explore who we are by learning where we came from.{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/watch?v=PPTnuUcUVVY"
            >
              "We are made of starstuff,"
            </a>{" "}
            he said with characteristic boyish enthusiasm.
          </p>
          <p>
            Sagan played a leading role in the American space program from its
            inception. He was an adviser to the{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://en.wikipedia.org/wiki/NASA"
            >
              National Aeronautics and Space Administration (NASA)
            </a>{" "}
            starting in 1958, when NASA was formed. NASA awarded Sagan for both
            his scientific achievement and public service in educating the
            citizenry. NASA has always tried to engage the public in its efforts
            to collect data about the solar system and the universe, and about
            the development of its sophisticated technology to enable the space
            program. Indeed, NASA's pictures are{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.nasa.gov/multimedia/guidelines/index.html"
            >
              legally in the public domain
            </a>
            . Before NASA, there was NACA, or the National Advisory Committee
            for Aeronautics, which was formed in 1915 to direct the scientific
            study of flight.
          </p>
          <p>
            As part of its educational effort, NASA developed{" "}
            <a target="_blank" rel="noreferrer" href="https://api.nasa.gov/">
              {" "}
              APIs
            </a>{" "}
            intended to make NASA's data, including imagery,{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://sti.nasa.gov/for-developers/"
            >
              "eminently accessible"
            </a>
            . In this Explore the Cosmos tool, you can search almost 185,000
            NASA images using your own text or NASA keywords provided with the
            NASA API. One hundred images are displayed per page of results. A
            date range tool enables images to be displayed from as far back as
            1920, when the field of aeronautics was in its infancy.{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://cloud.google.com/vision/docs/labels"
            >
              Google Vision API labels
            </a>{" "}
            are also provided to further inspire your searches, though Google
            labels do not guarantee a successful result in the same way that
            NASA tags do. Note, too, that you may see a lag in displaying a
            quote, the Google labels, or in displaying additional pages, if you
            scroll up and down the screen. If that happens, wait one or two
            minutes for the API responses to catch up to your requests. When a
            NASA keyword or Google label are selected, a new search is
            performed, overwriting the previous search results.{" "}
            {/*(selecting the
            Submit button is not necessary when selecting keywords or labels)*/}
            NASA keywords and Google labels can in turn be de-selected either by
            selecting the 'x' in the search criteria section at the top of the
            Search page, or by selecting the highlighted keyword or label yet
            again. In addition, every successful search rewards you with a new
            Carl Sagan quote.
          </p>
          <div></div>
          <p className="last-paragraph">
            <em>
              <b>
                Now let Carl Sagan be your inspiration while you take
                <Link to="/search" className="link">
                  this journey
                </Link>
                around the Cosmos.
              </b>
            </em>
          </p>
        </div>
      </div>
    );
  }
}

export default About;
