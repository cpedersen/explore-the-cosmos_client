import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './Homepage.css';

class Homepage extends Component {
  render() {
    return (
      <div className='container-homepage'>
        <nav className="navbar">
          <Link to="" className="home-link"></Link>
          <Link to="" className="search-link"></Link> 
          <Link to="/about" target="_blank" className="about-link">About</Link> 
        </nav>
        <div className="intro">
          <div className="intro-quote">"Exploration is in our nature. We began as wanderers, and we are wanderers still. We have lingered long enough on the shores of the cosmic ocean. We are ready at last to set sail for the stars.”<p><em>- Carl Sagan</em></p></div>
          <div className="intro-description"><p>Trace the origins of our knowledge and the scientific method. Explore 15 billion years of cosmic evolution.
          </p>
          <p>Click the button below to get started...</p>
          </div>
          <Link to="/search" className="intro-search-link">Search the Cosmos</Link>
        </div>
      </div>
    );
  }
}

export default Homepage;





