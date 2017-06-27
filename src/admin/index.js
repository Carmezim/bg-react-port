import React, { Component } from 'react';
import ParseService from '../services/parseAPI';


class Admin extends Component {

	static isPrivate = true;

	submit() {
		console.log('test')
		ParseService.logOut()
	}

	render() {

		return (
			<div>
				<h1>Admin Panel</h1>
				<button onSubmit={this.submit()}>Logout</button>
			</div>
		);
	}
}


export default Admin;