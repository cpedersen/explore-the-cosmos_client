import React, { Component } from 'react';
import './Search.css';

const START_DATE = 1920
const END_DATE = new Date().getFullYear()

const NASA_URL = 'https://images-api.nasa.gov/search'

class Search extends Component {
    state = {
        query: '',
        resultsType: '',
        startDate: START_DATE,
        endDate: END_DATE,
        results: []
    }

    updateFormState = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    onSubmitSearchForm = e => {
        e.preventDefault()
        console.log('e', e)
        console.log('state', this.state)
        //Put fetch here
    }

    render() {
        return (
            <div className="container-search">
                <nav className="navbar">
                    <a className="home-link" href="#">Home</a>
                    <a className="search-link" href="#">Search</a> 
                    <a className="about-link" href="#">About</a> 
                </nav>
                <div className="search-criteria">
                    <p className="search-criteria-intro">Select search criteria:</p>
                    <form action="/my-handling-form-page" method="post" className="search-criteria-form" onSubmit={this.onSubmitSearchForm}>
                        <input type="search" value={this.state.query} name="query" id="search" placeholder="Search..." onChange={this.updateFormState}/>
                        <label htmlFor="search">Enter Search Text</label>
                        <br>
                        </br>
                        {/*<input type="number" name="number" id="number" value="100000"/> 
                        <label htmlFor="number">Item Count</label>
                        <br>
                        </br>*/}
                        <input type="radio" checked={this.state.resultsType === 'most-recent'} value="most-recent" name="resultsType" id="recent" onChange={this.updateFormState}/> 
                        <label htmlFor="recent">Most Recent</label>
                        <br>
                        </br>
                        <input type="radio" checked={this.state.resultsType === 'most-popular'} value="most-popular" name="resultsType" id="popular" onChange={this.updateFormState}/> 
                        <label htmlFor="popular">Most Popular</label>
                        <br>
                        </br>
                        <input type="radio" checked={this.state.resultsType === ''} value="" name="resultsType" id="no-search-result-type" onChange={this.updateFormState}/> 
                        <label htmlFor="no-search-result-type">None</label>
                        <br>
                        </br>
                        <input type="range" name="startDate" value={this.state.startDate} min={START_DATE} max={END_DATE} id="startDate" onChange={this.updateFormState} />
                        <label htmlFor="startDate">Start date ({this.state.startDate})</label>
                        <br>
                        </br>
                        <input type="range" name="endDate" value={this.state.endDate} min={START_DATE} max={END_DATE} id="endDate" onChange={this.updateFormState} />
                        <label htmlFor="endDate">End date ({this.state.endDate})</label>
                    {/* <input type="date" name="start-date" id="start-date"/>
                        <label htmlFor="start-date">Start Date</label>
                        <br>
                        </br>
                        <input type="date" name="end-date" id="end-date"/>
                        <label htmlFor="end-date">End Date</label>
                        <br>
                    </br>*/}
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        );
  }
}

export default Search;
