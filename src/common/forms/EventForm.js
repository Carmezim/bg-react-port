import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";

// import style
import "./EventForm.css";

// Validation for form fields
export const nameRequired = value => (value ? undefined : "Name Required");

export const renderNameInput = ({ input, type, meta: { touched, error } }) =>
	<div>
		{/* Spread RF's input properties onto our input */}
		<input {...input} type={type} />
		{/*{
		 if form is active and in error display 'error',
		 returned from 'nameRequired' function
		 `touched` is a live updating property that RF passes in that tracks
		 whether or not a field has been "touched" by a user.  This means
		 focused at least once.
		 }*/}
		{touched &&
			error &&
			<div
				style={{ color: "#cc7a6f", margin: "-10px 0 15px", fontSize: "0.7rem" }}
			>
				{error}
			</div>}
	</div>;

const EventTemplate = props => {
	const { handleSubmit, invalid } = props;

	return (
		<div className="event-form">
			<form onSubmit={handleSubmit}>
				<label className="form-label" htmlFor="Title">Title</label>
				<Field
					name="title"
					type="text"
					id="name"
					className="event-title"
					component={renderNameInput}
					validate={nameRequired}
				/>
				<label className="form-label" htmlFor="author-name">Author Name</label>
				<Field
					name="name"
					type="text"
					id="author-name"
					className="author-name"
					component="input"
					validate={nameRequired}
				/>
				<label className="form-label" htmlFor="venue">Venue</label>
				<Field
					name="venue"
					type="text"
					id="venue"
					className="venue"
					component="input"
					validate={nameRequired}
				/>
				<label className="form-label" htmlFor="address">Address</label>
				<Field
					name="address"
					type="text"
					id="address"
					className="address"
					component="input"
					validate={nameRequired}
				/>
				<label className="form-label" htmlFor="postcode">Postcode</label>
				<Field
					name="postCode"
					type="number"
					id="postcode"
					className="postcode"
					component="input"
					validate={nameRequired}
				/>
				<label className="form-label" htmlFor="price">Price</label>
				<Field
					name="price"
					type="number"
					id="price"
					className="price"
					component="input"
					validate={nameRequired}
				/>
				<label className="form-label" htmlFor="event-url">Event URL</label>
				<Field
					name="url"
					type="text"
					id="event-url"
					className="event-url"
					component="input"
					validate={nameRequired}
				/>
				<label className="form-label" htmlFor="description">Description</label>
				<Field
					name="description"
					type="text"
					id="description"
					className="description"
					component="input"
					validate={nameRequired}
				/>
				<label className="form-label" htmlFor="more-about-event">More About This Event</label>
				<Field
					name="aboutEvent"
					type="text"
					id="more-about-event"
					className="more-about-event"
					component="input"
					validate={nameRequired}
				/>
				<label className="form-label" htmlFor="banner-title">Banner Title</label>
				<Field
					name="banner"
					type="text"
					id="banner-title"
					className="banner-title"
					component="input"
					validate={nameRequired}
				/>
				<button disabled={invalid} type="submit">
					Create
				</button>
			</form>
		</div>
	);
};

EventTemplate.propTypes = {
	handleSubmit: PropTypes.func.isRequired
};

// Connect our form named 'EventTemplate' (Redux Form)
// to EventTemplate component
export default reduxForm({
	form: "eventForm"
})(EventTemplate);
