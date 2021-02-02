import React, { Component } from 'react';
import './Results.css';

class Results extends Component {
  render() {
    return (
      <div className='container-results'>
        <nav className="container-navbar">
            <a href="#">Home</a>
            <a href="#">Search</a> 
            <a href="#">About</a> 
        </nav>
        <div className="quote-results">
        <p>“The cosmos is within us. We are made of star-stuff."</p>
        <p>- Carl Sagan</p>
        </div>
        <div className="all-results">
            <div className="results-count"><p>1 Result Found...</p></div>
            <div className="item-result">
            <div className="item">Item: Polaris</div>
            <div className="all-tags">
                <div className="tags-nasa">NASA Tags</div>
                <div className="tags-google">Google Tags</div>
            </div>
            </div>
        </div>
        <nav className="footer-results">
            <a href="#"></a> 
            <a href="#"></a> 
            <a href="#">Next</a> 
        </nav>  
      </div>
    );
  }
}

export default Results;
