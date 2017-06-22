import React, { Component } from 'react';


class Login extends Component {
	render() {
		return (
			<div className="login">
				<form className="cd-form floating-labels login-form" method="post">

					<fieldset>
						<legend>Admin Console</legend>

						{/*<div className="info" style="display:none"><p></p></div>*/}

						<div className="icon">
							<label className="cd-label" for="cd-name">Username</label>
							<input className="user" type="text" name="cd-name" id="login-username" required />
						</div>

						<div className="icon">
							<label className="cd-label" for="cd-lock">Password</label>
							<input className="lock" type="password" name="cd-lock" id="login-password" required />
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