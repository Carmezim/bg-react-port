import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import ReactCrop from 'react-image-crop';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import ParseService from '../services/parseAPI';


// Import actions
import { createEvent } from './actions';
import { unsetClient } from '../client/actions';


import EventTemplate from '../common/forms/EventForm';

class Dashboard extends Component {

	// flag for Route authentication
	static isPrivate = true;

	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
		invalid: PropTypes.bool.isRequired,
		client: PropTypes.shape({
			token: PropTypes.object.isRequired,
		}),
		bookEvents: PropTypes.shape({
			list: PropTypes.array,
			requesting: PropTypes.bool,
			successful: PropTypes.bool,
			messages: PropTypes.array,
			errors: PropTypes.array,
		}).isRequired,
			createEvent: PropTypes.func.isRequired,
			reset: PropTypes.func.isRequired,
		};

	constructor(props) {
		super(props);
	}


	submit = (eventToCreate) => {
		const { client, createEvent, reset } = this.props;

		createEvent(client, eventToCreate);

		reset();
	};


	logout = () => {
		console.log('test');

		this.props.unsetClient();

		ParseService.logOut();
	};


	render() {

		const {
			handleSubmit,
			invalid,
			bookEvents: {
				list,
				requesting,
				successful,
				messages,
				errors,
			},
		} = this.props;

		return (
			<div className="admin-dashboard">
				<div className="create-event-form">
					<EventTemplate submit={handleSubmit(this.submit)} invalid={invalid} />
					<hr />
				</div>
			</div>
		);
	}
}



// Getting only the piece of state we need for this component from the global state
const mapStateToProps = state => ({
	client: state.client,
	bookEvents: state.bookEvents,
});

// Making the login state piece we've got and 'loginRequest' action
// available in this.props within this component (Login)
const connected = connect(mapStateToProps, { createEvent, unsetClient })(Dashboard);

// In our state this form will be available in 'form.login'
const formed = reduxForm({
	form: 'bookEvents',
})(connected);


export default formed;