import React, { Component } from "react";
import PropTypes from "prop-types";
// import ReactCrop from 'react-image-crop';
import ReactList from "react-list";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Import actions

// Import components
import EventTemplate from "../common/forms/EventForm";
import Button from "../common/forms/Button";
import ListItem from "../draggableList";

class Dashboard extends Component {
	// prop validation
	static propTypes = {
		// handleSubmit: PropTypes.func.isRequired,
		// invalid: PropTypes.bool.isRequired,
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
		// createEvent: PropTypes.func.isRequired,
		// reset: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
	}

	// Return infinite list item
	renderItem(index, key) {
		const { list } = this.props;
		console.log(list);
		return (
			<ListItem
				className="finfinite-list-item"
				key={key}
				content={list[index]}
			/>
		);
	}

	render() {
		const {
			invalid,
			client,
			dashboard: { list, requesting, successful, messages, errors }
		} = this.props;

		return (
			<div className="admin-dashboard">
				<ListItem />
				<h1>Dashboard</h1>
				<div className="create-event-form">
					<div>
						<EventTemplate invalid={invalid} />
						<Button />
					</div>
					<hr />
				</div>
				<div className="intinite-list">
					<ReactList
						itemRenderer={this.renderItem}
						length={list.length}
						type="uniform"
					/>
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
const connected = connect(mapStateToProps, { createEvent })(Dashboard);

// In our state this form will be available in 'form.login'
// const formed = reduxForm({
// 	form: "dashboard"
// })(connected);

// <Link
// 	to={{
// 		pathname: "/addevent",
// 		submit: handleSubmit(this.submit)
// 	}}
// >
// 	Add Event
// </Link>
export default connected;
