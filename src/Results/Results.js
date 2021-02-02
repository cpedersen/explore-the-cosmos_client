import React, { Component } from 'react';
import './Results.css';

class Results extends Component {
  render() {
    return (
      <div className='container-results'>
        <nav class="container-navbar">
            <a href="#">Home</a>
            <a href="#">Search</a> 
            <a href="#">About</a> 
        </nav>
        <div class="quote-results">
        <p>“The cosmos is within us. We are made of star-stuff."</p>
        <p>- Carl Sagan</p>
        </div>
        <div class="all-results">
            <div class="results-count"><p>1 Result Found...</p></div>
            <div class="item-result">
            <div class="item">Item: Polaris</div>
            <div class="all-tags">
                <div class="tags-nasa">NASA Tags</div>
                <div class="tags-google">Google Tags</div>
            </div>
            </div>
        </div>
        <nav class="footer-results">
            <a href="#"></a> 
            <a href="#"></a> 
            <a href="#">Next</a> 
        </nav>  
      </div>
    );
  }
}

export default Results;
