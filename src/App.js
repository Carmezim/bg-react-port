import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrivateRoute from './common/PrivateRoute/AuthRoute'
import { Route } from 'react-router-dom';
import ParseService from './services/parseAPI';


// Import all components
import Login from './login';
import Dashboard from './dashboard';
import Signup from './signup';
import './App.css';


// import actions
import { unsetClient } from './client/actions'


class App extends Component {

	static propTypes = {
		children: PropTypes.node,
		logout: PropTypes.func,
		client: PropTypes.shape({
			token: PropTypes.object,
		}),
	};


	render() {

		const { client: token } = this.props;

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
				<div className="logout-button">
					{!!token.token && (
						<button onClick={this.props.unsetClient}>
							{/*<button onClick={ParseService.logOut}>*/}
						Logout
						</button>
					)}{console.log(token)}
				</div>
			</div>
		);
	}
}


const mapStateToProps = state => ({
	client: state.client
});


export default connect(mapStateToProps, { unsetClient })(App);

