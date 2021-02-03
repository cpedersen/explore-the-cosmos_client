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
    searchResults: [],
    total_hits: 0
  };

  render() {

    const contextValue = {
      searchResults: this.state.searchResults,
      total_hits: this.state.total_hits
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
                  exact path='/description'
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
