import React, { Component } from 'react';
import './App.css';
import SearchContext from '../SearchContext';
import Homepage from '../views/Homepage/Homepage';
import Search from '../views/Search/Search';
import Results from '../views/Results/Results';
import Description from '../views/Description/Description';
//import Navbar from '../components/Navbar/Navbar';
import About from '../views/About/About';
import {Route, Switch} from 'react-router-dom';

class App extends Component {

  state = {
    query: '',
    searchResults: [],
    total_hits: 0
  };

  onSearchResults = ({results, total_hits}) => {
    this.setState({
      searchResults: results,
      total_hits
    })
  }

  onQueryChange = e => {
    const {value} = e.target
    this.setState({
      query: value
    })
  }

  render() {
    const {query, searchResults, total_hits} = this.state
    const {onSearchResults, onQueryChange} = this

    const contextValue = {
      query,
      searchResults,
      total_hits,
      onSearchResults,
      onQueryChange
    }

    return (
      <main className='App'>
        <SearchContext.Provider value={contextValue}>
          <div className='content' aria-live='polite'>
            <Switch>
              <Route
                  exact path='/'
                  component={Homepage}
              />
              <Route
                  exact path='/search'
                  component={Search}
              />
              <Route
                  exact path='/results'
                  component={Results}
              />
              <Route
                  exact path='/description/:nasa_id'
                  component={Description}
              />
              <Route
                  exact path='/about'
                  component={About}
              />
            </Switch>
          </div>
        </SearchContext.Provider>
      </main>
    );
  }
}

export default App;
