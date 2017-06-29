import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrivateRoute from './common/PrivateRoute/AuthRoute'
import { Route } from 'react-router-dom';
// Import all components
import Login from './login';
import Dashboard from './Dashboard';
import Signup from './signup';
import './App.css';


class App extends Component {


  render() {
    return (
      <div className="App">
        <div className="app-header">
          {/*<h2>BookGig MainPage</h2>*/}
        </div>
        <section className="app-body">
					<Switch>
						{/*<Route path="/admin" component={Login} />*/}
						<PrivateRoute path="/admin" component={Login} />
						<PrivateRoute path="/dashboard" component={Dashboard} />
						<Route path="/" component={Signup} />
					</Switch>
				</section>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
