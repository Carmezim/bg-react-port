import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';


// helpers
import Errors from '../helpers/notifications/Errors';


// import action
import { loginRequest } from './actions';


class Login extends Component {

	static isPrivate = false;

		// validation
	static propTypes = {
		handleSubmit: PropTypes.func,
		loginRequest: PropTypes.func,
		login: PropTypes.shape({
			requesting: PropTypes.bool,
			successful: PropTypes.bool,
			messages: PropTypes.array,
			errors: PropTypes.array
		}),
	};

	// our custom 'submit' function that will be passed to Redux Form
	// to handle the username and password submitted
	submit = (values) => {
		this.props.loginRequest(values);
	};

	render () {
		// saving up some typing by assigning all our props to constants
		const {
			handleSubmit,
			login: {
				requesting,
				successful,
				messages,
				errors,
			},
		} = this.props;

		return (
			<div className="login">
				<form className="cd-form floating-labels login-form" onSubmit={handleSubmit(this.submit)}>
					<fieldset>
						<legend>Admin Console</legend>

						<div className="icon">
							<label htmlFor="username">Username</label>
							<Field
								name="username"
								type="text"
								id="login-username"
								className="user"
								component="input"
							/>
						</div>

						<div className="icon">
							<label htmlFor="password">Password</label>
							<Field
								name="password"
								type="password"
								id="login-password"
								className="lock"
								component="input"
							/>
						</div>
						<button action="submit">Login</button>
					</fieldset>
				</form>
				<div className="login-handling">
				{/* Some loggin handling */}
					{!requesting && !!errors.length && (
						<Errors message="Failure to login due to:" errors={errors} />
					)}
					{!requesting && !!messages.length && (
						console.log(messages)
					)}
					{requesting && <div>Logging in...</div>}
					{!requesting && !successful && (
					<div>Don't have an account yet? Create one to login.</div>
					// not sure yet how this will be handled so just leaving this message
					// AFAIK dashboard is used to create admin users(?)
					// an option would be to link the user to a signup ?
					)}
				</div>
			</div>
		);
	}
}


// Getting only the piece of state we need for this component from the global state
const mapStateToProps = state => ({
	login: state.login,
});

// Making the login state piece we've got and 'loginRequest' action
// available in this.props within this component (Login)
const connected = connect(mapStateToProps, { loginRequest })(Login);

// In our state this form will be available in 'form.login'
const formed = reduxForm({
	form: 'login',
})(connected);


export default formed;