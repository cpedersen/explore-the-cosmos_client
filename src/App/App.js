import React, { Component } from 'react';
import './App.css';
import Homepage from '../views/Homepage/Homepage';
import Search from '../views/Search/Search';
import Results from '../views/Results/Results';
import Description from '../views/Description/Description';
import About from '../views/About/About';
import {Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <main className='App'>
        <Route exact path="/" component={Homepage}></Route>
        <Route exact path="/search" component={Search}></Route>
        <Route exact path="/results" component={Results}></Route>
        <Route exact path="/description" component={Description}></Route>
        <Route exact path="/about" component={About}></Route>
        {/*<Route exact path="/navbar" component={Navbar}></Route>
        <Route exact path="/countdown" component={Countdown}></Route>*/}
      </main>
    );
  }
}

export default App;
