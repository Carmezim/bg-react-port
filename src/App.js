import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Admin from './components/admin';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router> 
        <div className="App">
          <Link to="/admin"></Link>
          <Route path="/admin" component={Admin} />
        </div>
      </Router>
    );
  }
}

export default App;
