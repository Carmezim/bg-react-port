import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import components
import ItemsList from "../draggableList";
import ListHeader from "../common/headers/ListsHeader";
// import actions
import { eventRequest } from "./actions";

class Dashboard extends Component {
	// prop validation
	static propTypes = {
		client: PropTypes.shape({
			token: PropTypes.string // add required
		}),
		dashboard: PropTypes.shape({
			list: PropTypes.array,
			requesting: PropTypes.bool,
			successful: PropTypes.bool,
			messages: PropTypes.array,
			errors: PropTypes.array
		}).isRequired,
		eventCreate: PropTypes.func.isRequired,
		eventRequest: PropTypes.func.isRequired,
		reset: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
	}

	// retrieve events saved on database
	retrieveEvents = () => {
		const { client, eventRequest } = this.props;
		if (client && client.token) return eventRequest(client);
	};

	render() {
		const {
			client: { token },
			dashboard: { list, requesting, successful, messages, errors }
		} = this.props;

		return (
			<div className="admin-dashboard">
				<h1>Dashboard</h1>
				<Link to="/dashboard/create">Create Event</Link>
				<ListHeader />
				<ItemsList />
			</div>
		);
	}
}

// Getting only the piece of state we need for this component from the global state
const mapStateToProps = state => ({
	client: state.client,
	dashboard: state.dashboard
});

// Making the login state piece we've got and our actions
// available in this.props within this component (Dashboard)
// const connected = connect(mapStateToProps, { createEvent })(Dashboard);
const connected = connect(mapStateToProps, {
	eventRequest
})(Dashboard);

export default connected;
