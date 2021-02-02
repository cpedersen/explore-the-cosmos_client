import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  render() {
    return (
        <div class="container-search">
            <nav class="navbar">
                <a class="home-link" href="#">Home</a>
                <a class="search-link" href="#">Search</a> 
                <a class="about-link" href="#">About</a> 
            </nav>
            <div class="search-criteria">
                <p class="search-criteria-intro">Select two or more search criteria:</p>
                <form action="/my-handling-form-page" method="post" class="search-criteria-form">
                    <input type="search" name="search" id="search" placeholder="Search..."/>
                    <label for="search">Enter Search Text</label>
                    <br>
                    </br>
                    <input type="number" name="number" id="number" value="100000"/> 
                    <label for="number">Item Count</label>
                    <br>
                    </br>
                    <input type="checkbox" name="recent" id="recent"/> 
                    <label for="recent">Most Recent</label>
                    <br>
                    </br>
                    <input type="checkbox" name="popular" id="popular"/> 
                    <label for="popular">Most Popular</label>
                    <br>
                    </br>
                    <input type="date" name="start-date" id="start-date"/>
                    <label for="start-date">Start Date</label>
                    <br>
                    </br>
                    <input type="date" name="end-date" id="end-date"/>
                    <label for="end-date">End Date</label>
                    <br>
                    </br>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </div>
    );
  }
}

export default Search;
