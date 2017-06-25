import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import signupRequest from './actions';


// If unit testing connected components, export the non
// connected componend and then the connected component as default


class Signup extends Component {

	static propTypes = {
		handleSubmit: PropTypes.func,
		signupRequest: PropTypes.func,
		signup: PropTypes.shape({
			requesting: PropTypes.bool,
			successful: PropTypes.bool,
			messages: PropTypes.array,
			errors: PropTypes.array,
		}),
	};

	// Called by ReduxForm with the values of the Form field, in thss case "email"
	// when the for is submitted
	submit = (email) => {
		this.props.signupRequest(email);
		// userEmail object looks like
		// userEmail : {
		// 	email: "actualEmail@something.com"
		// }

	};

	render() {
		// what we need from props, handleSubmit from ReduxForm
		// and the respective pieces of state from the global state
		const {
			handleSubmit,
			signup: {
				requesting,
				successful,
				messages,
				errors,
			},
		} = this.props;

		return (
			<div className="signup-email">
				<form className="signup-email-form" onSubmit={handleSubmit(this.submit)}>
					<h1>Subscribe to our newsletter</h1>
					<label htmlFor="email">Email</label>
					<Field
						name="email"
						type="text"
						id="email"
						className="signup-email-field"
						label="email"
						component="input" // informs redux form to use the default input, can pass custom form component here
															// receives PropType.Node
					/>
					<button action="submit">SIGNUP NOW</button>
				</form>
				{!requesting && !!errors.length && (
					console.log(`Submission falied due to ${errors}`)
				)}
				{!requesting && !!messages.length && (
					messages.map(message => {
						console.log(`${message.body} at ${message.time}`)
					})
				)}
				{!requesting && successful && (
					<div>Your email was successfully submitted to our newsletter</div>
					// put a redirect here with React Router
				)}
			</div>
		);
	}
}


// Use the only piece of state needed from global state
const mapStateToProps = state => ({
	signup: state.signup,
});


// Connect the component to Redux and attach the "signup" state to props
// as well as "signupRequest" action to "props".
const connected = connect(mapStateToProps, { signupRequest })(Signup);


// Connect the connected component to Redux Form.
// It namespaces the form in this component as "signup"
const formed = reduxForm({
	form: 'signup',
})(connected);

export default formed;