import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrivateRoute from './common/PrivateRoute/AuthRoute'
import { Route , Redirect } from 'react-router-dom';
import ParseService from './services/parseAPI';





// Import all components
import Login from './login';
import Dashboard from './dashboard';
import Signup from './signup';
import './App.css';


class App extends Component {

	// static propTypes = {
	// 	children: PropTypes.node,
	// 	client: PropTypes.shape({
	// 		token: PropTypes.object,
	// 	}),
	// };

	clickHandler = () => {
		ParseService.logOut()
	};


	render() {

		// const { client, submit } = this.props;

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
						<Route exact path="/" component={Signup} />
					</Switch>
				</section>
			<div className="logout-button">
			<button onClick={() => this.clickHandler()}>
					Logout
			</button>
			</div>
		</div>
    );
  }
}




export default (App);
