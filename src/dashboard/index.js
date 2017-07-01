import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import ReactCrop from 'react-image-crop';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';


// Import actions
import { createEvent } from './actions';


// Import components
import EventTemplate from '../common/forms/EventForm';


class Dashboard extends Component {

	// prop validation
	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
		invalid: PropTypes.bool.isRequired,
		client: PropTypes.shape({
			token: PropTypes.string.isRequired, // add required
		}),
		dashboard: PropTypes.shape({
			list: PropTypes.array,
			requesting: PropTypes.bool,
			successful: PropTypes.bool,
			messages: PropTypes.array,
			errors: PropTypes.array,
		}).isRequired,
			createEvent: PropTypes.func.isRequired,
			reset: PropTypes.func.isRequired,
	};

	
	submit = (eventToCreate) => {
		const { client, createEvent, reset } = this.props;
	
		createEvent(client, eventToCreate);
	
		reset();
	};


	render() {
		
		const {
			handleSubmit,
			invalid,
			client,
			dashboard: {
				list,
				requesting,
				successful,
				messages,
				errors,
			},
		} = this.props;


		return (
			<div className="admin-dashboard">
				<h1>Dashboard</h1>
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
	dashboard: state.dashboard,
});

// Making the login state piece we've got and our actions
// available in this.props within this component (Dashboard)
const connected = connect(mapStateToProps, { createEvent })(Dashboard);

// In our state this form will be available in 'form.login'
const formed = reduxForm({
	form: 'dashboard',
})(connected);


export default formed;