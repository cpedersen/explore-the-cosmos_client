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
          <h2>Explore the Cosmos with Carl Sagan</h2>
          <p>
            <a target="_blank" href="https://en.wikipedia.org/wiki/Carl_Sagan">
              Carl Sagan
            </a>{" "}
            was an American astronomer, who captivated audiences with his{" "}
            <a
              target="_blank"
              href="https://en.wikipedia.org/wiki/Cosmos:_A_Personal_Voyage"
            >
              Cosmos
            </a>{" "}
            TV series in 1980. He was the face of science in America, reminding
            us again and again that we are but a granular part of the universe,
            and encouraging us to explore who we are by learning where we came
            from.{" "}
            <a
              target="_blank"
              href="https://www.youtube.com/watch?v=PPTnuUcUVVY"
            >
              "We are made of starstuff,"
            </a>{" "}
            he would say with characteristic boyish enthusiasm.
          </p>
          <p>
            Sagan played a leading role in the American space program from its
            inception. He was an adviser to the{" "}
            <a target="_blank" href="https://en.wikipedia.org/wiki/NASA">
              National Aeronautics and Space Administration (NASA)
            </a>{" "}
            starting in 1958, when NASA was formed. NASA awarded him with medals
            for both his scientific achievement and public service educating
            citizens. NASA has always tried to engage the public in its efforts
            to collect data about the solar system and the universe. Indeed,
            NASA's pictures are{" "}
            <a
              target="_blank"
              href="https://www.nasa.gov/multimedia/guidelines/index.html"
            >
              legally in the public domain
            </a>
            .
          </p>
          <p>
            As part of its educational effort, NASA developed{" "}
            <a target="_blank" href="https://api.nasa.gov/">
              {" "}
              APIs
            </a>{" "}
            intended to make NASA's data, including imagery,{" "}
            <a target="_blank" href="https://sti.nasa.gov/for-developers/">
              "eminently accessible"
            </a>
            . Almost 185,000 images are currently searchable using text or NASA
            keywords. In this Explore the Cosmos tool, one hundred images are
            displayed per page of results.{" "}
            <a
              target="_blank"
              href="https://cloud.google.com/vision/docs/labels"
            >
              Google Vision API labels
            </a>{" "}
            are provided to further inspire your searches. New searches are
            performed using the NASA API's keyword field when a NASA keyword or
            Google label are selected. The keyword or label can be de-selected
            either by selecting the 'x' in the search criteria section at the
            top of the Search page, or by selecting the highlighted keyword or
            label yet again. In addition, every search rewards you with a Carl
            Sagan quote.
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
