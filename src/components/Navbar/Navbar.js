import React, { Component } from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div className="container-navbar">
        <nav className="navbar">
          <Link to="/" target="_blank" className="home-link">Home</Link>
          <Link to="/search" target="_blank" className="search-link">Search</Link> 
          <Link to="/about" target="_blank" className="about-link">About</Link> 
        </nav>
      </div>
    );
  }
}

export default Navbar;
