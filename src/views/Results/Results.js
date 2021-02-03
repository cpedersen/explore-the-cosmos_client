import React, { Component } from 'react';
import './Results.css';
import {Link} from 'react-router-dom'
import SearchContext from '../../SearchContext';

class Results extends Component {

  static contextType = SearchContext;

  state = {
    show_prev_link: false,
    show_next_link: false
}

  handlePageClick = event => {
    event.eventpreventDefault();
    //To fill in
  }

  handlePrevClick = event => {
      event.eventpreventDefault();
      //To fill in
  }

  handleNextClick = event => {
      event.eventpreventDefault();
      //To fill in
  }
  render() {
    return (
      <div className='container-results'>
        <nav className="navbar">
          <Link to="/" target="_blank" className="home-link">Home</Link>
          <Link to="/search" target="_blank" className="search-link">Search</Link> 
          <Link to="/about" target="_blank" className="about-link">About</Link> 
        </nav>
        <div className="quote-results">
        <p>“The cosmos is within us. We are made of star-stuff."</p>
        <p>- Carl Sagan</p>
        </div>
        <div className="all-results">
            <div className="results-count"><p>1 Result Found...</p></div>
            {/*<div className="results-count"><p>{this.context.totalResults} Results Found...</p></div>*/}
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
