import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import PropTypes from "prop-types";
import PrivateRoute from "./common/authentication/AuthRoute";
import { Route, withRouter } from "react-router-dom";
import { reset } from "redux-form";

// Import all components
import Login from "./login";
import Dashboard from "./dashboard";
import Signup from "./signup";
import NavBar from "./common/navigation/NavBar";
import EventTemplate from "./common/forms/EventForm";
import "./App.css";
// import actions
import { unsetClient } from "./client/actions";
import { fetchEvents } from "./draggableList/actions";
import { eventCreate } from "./dashboard/actions";

class App extends Component {
	static propTypes = {
		children: PropTypes.node,
		eventCreate: PropTypes.func.isRequired,
		reset: PropTypes.func.isRequired,
		client: PropTypes.shape({
			token: PropTypes.string
		}).isRequired,
		unsetClient: PropTypes.func.isRequired
	};

	// Populate initial state with
	// events data from the database
	// when 'Appp' component renders
	componentDidMount() {
		this.props.fetchEvents();
	}

	// submit handler provided to Redux Form
	// we call 'eventCreate' imported from 'dashboard' actions
	// which will be listened by the 'dashboard' sagas and
	// handle the API calls passing the data submitted
	// from the form to the database
	handleSubmit = event => {
		const { eventCreate, reset } = this.props;
		// call to our widgetCreate action.
		eventCreate(event);
		// reset the form upon submit.
		reset("eventForm");
	};

	render() {
		const { client: { token }, unsetClient } = this.props;
		return (
			<div className="App">
				<div className="app-header">
					{!!token && <button onClick={unsetClient}>Logout</button>}
				</div>
				<section className="app-body">
					<Switch>
						<PrivateRoute
							token={token}
							isPrivate={false}
							path="/admin"
							component={Login}
						/>
						<PrivateRoute
							token={token}
							isPrivate={true}
							exact={true}
							path="/dashboard"
							component={Dashboard}
						/>
						<PrivateRoute
							token={token}
							isPrivate={true}
							exact={true}
							path="/dashboard/create"
							render={() => <EventTemplate onSubmit={this.handleSubmit} />}
						/>
						<Route exact path="/" component={Signup} />
						<Route render={() => <div>Not Found :(</div>} />
					</Switch>
					{
						// Switch matches the first occurrence of a path (url) so we need
						// to add another 'Switch'  (or how many respectively to the number of components
						// we need to render with the same url)
						// Reference: https://github.com/ReactTraining/react-router/issues/3928#issuecomment-282495394
					}
					<Switch>
						<PrivateRoute
							token={token}
							isPrivate={true}
							exact={false}
							path="/dashboard"
							component={NavBar}
						/>
						<Route render={() => <div>Not Found :(</div>} />
					</Switch>
				</section>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	client: state.client,
	draggable: state.draggable,
	dashboard: state.dashboard
});

const AppWithRouter = withRouter(
	connect(mapStateToProps, { fetchEvents, unsetClient, eventCreate, reset })(
		App
	)
);

export default AppWithRouter;
