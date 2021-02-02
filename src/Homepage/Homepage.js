import React, { Component } from 'react';
import './Homepage.css';

class Homepage extends Component {
  render() {
    return (
      <div className='container-homepage'>
        <a href="#" class="about-link">About</a>
        <div class="intro">
          <div class="intro-quote">"Exploration is in our nature. We began as wanderers, and we are wanderers still. We have lingered long enough on the shores of the cosmic ocean. We are ready at last to set sail for the stars.”<p><em>- Carl Sagan</em></p></div>
          <div class="intro-description"><p><p>Trace the origins of our knowledge and the scientific method. Explore 15 billion years of cosmic evolution.
          </p>Click the button below to get started...</p></div>
          <a href="#" class="intro-search-link">Search the Cosmos</a>
        </div>
      </div>
    );
  }
}

export default Homepage;





