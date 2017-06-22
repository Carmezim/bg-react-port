import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import LoginForm  from '../../components/LoginForm/loginForm';
import './login.css';


class Login extends Component {

	constructor(props) {
		super(props);
		autoBind(this);
	}

	render() {
		return (
			<div className="login">
				<form className="cd-form floating-labels login-form" method="post">

					<fieldset>
						<legend>Admin Console</legend>
						{/*<div className="info" style="display:contents"><p></p></div>*/}

						<div className="icon">
							<LoginForm
								label="Username"
								labelfor="cd-name"
								inputClass="user"
								type="text"
								id="login-username"
								onChange={}
							/>
						</div>

						<div className="icon">
							<LoginForm
								label="Password"
								labelfor="cd-lock"
								inputClass="lock"
								type="password"
								id="login-password"
								onChange={}
							/>
						</div>

						<div>
							<input type="submit" value="Login" />
						</div>
					</fieldset>

				</form>
			</div>
		);
	}
}

export default Login;