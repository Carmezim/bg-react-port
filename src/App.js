import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrivateRoute from './common/PrivateRoute/AuthRoute'
import { Route } from 'react-router-dom';
import ParseService from './services/parseAPI';


// Import all components
import LogoutButton from './common/buttons/Logout';
import Login from './login';
import Dashboard from './dashboard';
import Signup from './signup';
import './App.css';


// import actions
import { unsetClient } from './client/actions'


class App extends Component {

	static propTypes = {
		children: PropTypes.node,
	};

	render() {

	const { client: { token } , unsetClient } = this.props;

		return (
			<div className="App">
				<div className="app-header">
				<LogoutButton buttonClass="logout-button" token={token} onClick={unsetClient} />
				</div>
				<section className="app-body">
					<Switch>
						<PrivateRoute token={token} isPrivate={false} path="/admin" component={Login} />
						<PrivateRoute token={token} isPrivate={true} path="/dashboard" component={Dashboard} />
						<PrivateRoute exact isPrivate={false} path="/" component={Signup} />
					</Switch>
				</section>
			</div>
		);
	}
}


const mapStateToProps = state => ({
	client: state.client
});


export default connect(mapStateToProps, { unsetClient })(App);

