import React, { Component } from 'react';
import './Description.css';
import {Link} from 'react-router-dom'

class Description extends Component {
  render() {
    return (
      <div className='container-description'>
        <nav className="navbar">
          <Link to="/" className="no-link"></Link>
          <Link to="/results" target="_blank" className="search-link">Go back to search results...</Link> 
          <Link to="/" className="no-link"></Link> 
        </nav>
        <div className="item-description">
            <div className="header-description">
            Description Information:
            </div>
            <ul>
            <li>URL</li>
            <li>File Size</li>
            <li>File Format</li>
            <li>NASA ID</li>
            <li>Center</li>
            <li>Date Created</li>
            <li>Location</li>
            <li>Photographer</li>
            <li>Description</li>
            </ul>
        </div>
        <nav className="container-footer-results">
            <a href="#"></a>
            <a href="#"></a>
            <a href="#">Next</a> 
        </nav>  
      </div>
    );
  }
}

export default Description;
