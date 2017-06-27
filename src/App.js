import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrivateRoute from './helpers/PrivateRoute/AuthRoute'

// Import all components
import Login from './login';
import Admin from './admin';
import Signup from './signup';
import './App.css';


class App extends Component {

	static isPrivate = false;

  render() {
    return (
      <div className="App">
        <div className="app-header">
          {/*<h2>BookGig MainPage</h2>*/}
        </div>
        <section className="app-body">
					<BrowserRouter>
						<div>
							{/*<Route path="/admin" component={Login} />*/}
							<PrivateRoute path="/admin" component={Login} />
							<PrivateRoute path="/admin-panel" component={Admin} />
							<PrivateRoute exact path="/" component={Signup} />
						</div>
					</BrowserRouter>
				</section>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
