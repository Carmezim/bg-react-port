import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import ReactCrop from 'react-image-crop';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import ParseService from '../services/parseAPI';

import { createEvent } from './actions';
import { unsetClient } from '../client/actions';


// Validation for form fields
const nameRequired = value => (value ? undefined : 'Name Required');


class Admin extends Component {

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


		renderNameInput = ({ input, type, meta: { touched, error } }) => (
			<div>
				{/* Spread RF's input properties onto our input */}
				<input
					{...input}
					type={type}
				/>
				{/*{
					if form is active and in error display 'error',
					returned from 'nameRequired' function
					`touched` is a live updating property that RF passes in that tracks
					whether or not a field has been "touched" by a user.  This means
					focused at least once.
				}*/}
				{touched && error && (
					<div style={{ color: '#cc7a6f', margin: '-10px 0 15px', fontSize: '0.7rem' }}>
						{error}
					</div>
				)
				}
			</div>
		);


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
					<form onSubmit={handleSubmit(this.submit)}>
						<h1>Admin Panel</h1>
						<h3 className="create-event">Add Event</h3>
						<label htmlFor="Title">Title</label>
						<Field
							name="title"
							type="text"
							id="name"
							className="event-title"
							component={this.renderNameInput}
							validate={nameRequired}
						/>
						<label htmlFor="author-name">Author Name</label>
						<Field
							name="author-name"
							type="text"
							id="author-name"
							className="author-name"
							component="input"
						/>
						<label htmlFor="venue">Venue</label>
						<Field
							name="venue"
							type="text"
							id="venue"
							className="venue"
							component="input"
						/>
						<label htmlFor="address">Address</label>
						<Field
							name="address"
							type="text"
							id="address"
							className="address"
							component="input"
						/>
						<label htmlFor="postcode">Postcode</label>
						<Field
							name="postcode"
							type="number"
							id="postcode"
							className="postcode"
							component="input"
						/>
						<label htmlFor="address">Address</label>
						<Field
							name="address"
							type="text"
							id="address"
							className="address"
							component="input"
						/>
						<label htmlFor="price">Price</label>
						<Field
							name="price"
							type="number"
							id="price"
							className="price"
							component="input"
						/>
						<label htmlFor="event-url">Event URL</label>
						<Field
							name="event-url"
							type="text"
							id="event-url"
							className="event-url"
							component="input"
						/>
						<label htmlFor="description">Description</label>
						<Field
							name="description"
							type="text"
							id="description"
							className="description"
							component="input"
						/>
						<label htmlFor="more-about-event">More About This Event</label>
						<Field
							name="more-about-event"
							type="text"
							id="more-about-event"
							className="more-about-event"
							component="input"
						/>
						<label htmlFor="banner-title">Banner Title</label>
						<Field
							name="banner-title"
							type="text"
							id="banner-title"
							className="banner-title"
							component="input"
						/>
						<button
							disabled={invalid}
							action="submit"
						>Submit</button>
						{/*<button type="button" onClick={unsetClient(this.submit)}>Logout</button>*/}
					</form>
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
const connected = connect(mapStateToProps, { createEvent, unsetClient })(Admin);

// In our state this form will be available in 'form.login'
const formed = reduxForm({
	form: 'bookEvents',
})(connected);


export default formed;