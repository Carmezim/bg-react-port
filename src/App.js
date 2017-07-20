import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import PropTypes from "prop-types";
import PrivateRoute from "./common/authentication/AuthRoute";
import { Route, withRouter } from "react-router-dom";

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

class App extends Component {
	static propTypes = {
		children: PropTypes.node
	};

	componentDidMount() {
		this.props.fetchEvents();
	}

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
							component={Dashboard}
						/>
						<PrivateRoute
							token={token}
							isPrivate={true}
							path="/dashboard"
							component={NavBar}
						/>
						<PrivateRoute
							token={token}
							isPrivate={true}
							exact
							path="/dashboard/create"
							component={EventTemplate}
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
	connect(mapStateToProps, { fetchEvents, unsetClient })(App)
);

export default AppWithRouter;
