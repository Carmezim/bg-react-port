import React, { Component } from "react";
import PropTypes from "prop-types";
// import ReactCrop from 'react-image-crop';
import ReactList from "react-list";
import { connect } from "react-redux";
import { getFormValues, reset } from "redux-form";

// import components
import EventTemplate from "../common/forms/EventForm";
import ItemsList from "../draggableList";
import ListHeader from "../common/headers/ListsHeader";
import NavBar from "../common/navigation/NavBar";
// import actions
import { eventCreate, eventRequest } from "./actions";

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

	// submit event form data
	handleSubmit = event => {
		const { eventCreate, reset } = this.props;
		// call to our widgetCreate action.
		eventCreate(event);
		// reset the form upon submit.
		reset("eventForm");
	};

	render() {
		const {
			client,
			dashboard: { list, requesting, successful, messages, errors }
		} = this.props;

		return (
			<div className="admin-dashboard">
				<NavBar />
				<ListHeader />
				<ItemsList />
				<h1>Dashboard</h1>
				<div className="create-event-form">
					<div>
						<EventTemplate ref="eventForm" onSubmit={this.handleSubmit} />
					</div>
				</div>
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
	reset,
	eventCreate,
	eventRequest
})(Dashboard);

export default connected;
