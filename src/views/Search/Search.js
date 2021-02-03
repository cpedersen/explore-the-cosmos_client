import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import SearchContext from '../../SearchContext';
import config from '../../config';
import Results from '../Results/Results';
import './Search.css';

const START_DATE = 1920
const END_DATE = new Date().getFullYear()

class Search extends Component {    

    static contextType = SearchContext;

    state = {
        query: '',
        start_date: START_DATE,
        end_date: END_DATE,
        results: [],
        error: null,
        total_hits: 0,
        loading: false,
        current_page_no: 0,
        total_pages: 0
    }

    updateFormState = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    onSubmitSearchForm = event => {
        event.preventDefault()
        console.log('NASA_URL ' + `${config.API_ENDPOINT}`);
        console.log('query:', this.state.query);
        const SEARCH_URL = `${config.API_ENDPOINT}` + '?q=' + this.state.query + '&media_type=image' + '&year_start=' + this.state.start_date + '&year_end=' + this.state.end_date ;
        console.log("SEARCH URL: " + SEARCH_URL);

        //Fetching the search data
        fetch(SEARCH_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            },
            type: 'cors'
        })
        .then(response => response.json())
        .then(result => {
            console.log("Success: ", result); 
            this.setState({
                results: result,
                query: this.state.query,
                total_hits: result.collection.metadata.total_hits,
                loading: false,
            });
            console.log("total_hits: " + result.collection.metadata.total_hits);
        })
        .catch(error => {
            console.error("Error: ", error);
            this.setState({ 
                error: error.message,
                loading: false,
            });
        })
    }

    handleOnInputChange = event => {
        const query = event.target.value;
    };



    //Count the number of pages to display (denominator = results/page)
    getPagesCount = (total, denominator) => {
        const divisible = total % denominator === 0;
        const valueToBeAdded = divisible ? 0 : 1;
        return Math.floor(total / denominator) + valueToBeAdded;
    }
 
    render() {
        return (
            <div className="container-search">
                <nav className="navbar">
                    <Link to="/" target="_blank" className="home-link">Home</Link>
                    <Link to="/search" target="_blank" className="search-link">Search</Link> 
                    <Link to="/about" target="_blank" className="about-link">About</Link> 
                </nav>
                <div className="search-criteria">
                    <p className="search-criteria-intro">Enter Search Criteria:</p>
                    <form action="/my-handling-form-page" method="get" className="search-criteria-form" onSubmit={this.onSubmitSearchForm}>
                        <input type="search" value={this.state.query} name="query" id="search" placeholder="Search..." onChange={this.updateFormState}/>
                        <label htmlFor="search">Enter search text</label>
                        <br>
                        </br>
                        {/*<input type="radio" checked={this.state.resultsType === 'most-recent'} value="most-recent" name="resultsType" id="recent" onChange={this.updateFormState}/> 
                        <label htmlFor="recent">Most recent</label>
                        <br>
                        </br>
                        <input type="radio" checked={this.state.resultsType === 'most-popular'} value="most-popular" name="resultsType" id="popular" onChange={this.updateFormState}/> 
                        <label htmlFor="popular">Most popular</label>
                        <br>
                        </br>
                        <input type="radio" checked={this.state.resultsType === ''} value="" name="resultsType" id="no-search-result-type" onChange={this.updateFormState}/> 
                        <label htmlFor="no-search-result-type">None</label>*/}
                        <br>
                        </br>
                        <input type="range" name="start_date" value={this.state.start_date} min={START_DATE} max={END_DATE} id="start_date" onChange={this.updateFormState} />
                        <label htmlFor="start_date">Start date ({this.state.start_date})</label>
                        <br>
                        </br>
                        <input type="range" name="end_date" value={this.state.end_date} min={START_DATE} max={END_DATE} id="end_date" onChange={this.updateFormState} />
                        <label htmlFor="end_date">End date ({this.state.end_date})</label>
                        <br>
                        </br>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
                {/*<Results />*/}
            </div>
        );
  }
}

export default Search;
