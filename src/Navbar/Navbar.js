import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
        <nav class="container-navbar">
            <a href="#">Home</a>
            <a href="#">Search</a> 
            <a href="#">About</a> 
        </nav>
    );
  }
}

export default Navbar;
