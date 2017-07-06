import React, { Component } from "react";
import PropTypes from "prop-types";
// import ReactCrop from 'react-image-crop';
import ReactList from "react-list";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Import components
import EventTemplate from "../common/forms/EventForm";
import Button from "../common/forms/Button";
import ItemsList from "../draggableList";

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
		let bigList = [
			{
				id: 1,
				text: "Event 1"
			},
			{
				id: 2,
				text: "Book Event 2 in a cool place"
			},
			{
				id: 3,
				text: "Awesome Book event 3"
			},
			{
				id: 4,
				text: "Fun Book Event 4"
			},
			{
				id: 5,
				text: "Book Event 5"
			},
			{
				id: 6,
				text: "One More Events 6"
			},
			{
				id: 7,
				text: "BOOKS BOOKS BOOKS 7"
			}
		];
		this.bigList = bigList;
		this.renderItem = this.renderItem.bind(this);
	}

	// Return infinite list item
	renderItem(index, key) {
		return (
			<div className="infinite-list-item" key={key}>
				{this.bigList[index].text}
			</div>
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
				<ItemsList />
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
						length={this.bigList.length}
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
// const connected = connect(mapStateToProps, { createEvent })(Dashboard);
const connected = connect(mapStateToProps)(Dashboard);

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
