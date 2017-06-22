import React, { Component } from 'react';


class Login extends Component {
	// ---------------------------------------------------------------
	// THIS SHOULD NOT BE HERE AS COMPONENTS ARE ONLY PRESENTATIONAL
	// STRICTLY FOR DEMONSTRATION PURPOSES 
	constructor(props){
		super(props);
		this.state = {username: '' };
		this.mockLoginOnChange = this.mockLoginOnChange.bind(this);
		this.testingHandleSubmit = this.testingHandleSubmit.bind(this);
	}

	mockLoginOnChange(event) {
		this.setState({username: event.target.value});
	}
	
	testingHandleSubmit(event) {
		alert(`Username ${this.state.username} submitted!`);
		event.preventDefault();
	}
	// ----------------------------------------------------------------
	render() {
		return (
			<form onSubmit={this.testingHandleSubmit}>
				<label>
					Name: 
					<input type="text" value={this.state.username} onChange={this.mockLoginOnChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		)
	}
}

export default Login;