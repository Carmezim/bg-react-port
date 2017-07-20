import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import PropTypes from "prop-types";
import PrivateRoute from "./common/authentication/AuthRoute";
import { Route, withRouter } from "react-router-dom";
import { reset} from "redux-form";

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
		children: PropTypes.node
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
							exact
							path="/dashboard"
							render={() => <Dashboard />}
						/>
						<PrivateRoute
							token={token}
							isPrivate={true}
							exact
							path="/dashboard"
							render={() => <NavBar />}
						/>
						<PrivateRoute
							token={token}
							isPrivate={true}
							exact
							path="/dashboard/create"
							render={() => <EventTemplate onSubmit={this.handleSubmit} />}
						/>
						<Route exact path="/" component={Signup} />
						<Route render={() => <div>Not Found :(</div>} />
					</Switch>
				</section>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	client: state.client,
	draggable: state.draggable
});

const AppWithRouter = withRouter(
	connect(mapStateToProps, { fetchEvents, unsetClient, eventCreate, reset })(App)
);

export default AppWithRouter;
