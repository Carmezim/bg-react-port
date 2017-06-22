import React, { Component } from 'react';
import Login from './login';


class Admin extends Component {
	render() {
		return(
			<div>
				<h1>Admin Page</h1>
				<Login/>
			</div>
		);
	}
}

export default Admin;