import React, { Component } from 'react';
import './Description.css';

class Description extends Component {
  render() {
    return (
      <div className='container-description'>
        <nav className="container-navbar-description">
            <a href="#"></a>
            <a href="#">Go back to search results...</a> 
            <a href="#"></a>
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
