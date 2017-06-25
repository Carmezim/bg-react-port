import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';


// Import all components
import Login from './login';
import Signup from './signup';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="app-header">
          <h2>BookGig MainPage</h2>
        </div>
        <section className="app-body">
          {/*<Route path="/admin" component={Login} />*/}
          <Route path="/" component={Signup} />
        </section>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
