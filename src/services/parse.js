import Parse from 'parse';

class ParseService {
	constructor(props) {
		Parse.initialize("APPLICATION_ID", "JAVASCRIPT_KEY");
		Parse.serverURL = 'http://localhost:1337/parse';
	}


	login(username, password) {
		Parse.User.logIn(username, password, {
			success: function(user) {
				alert('Login successful');
				return true;
			},
			error: function(user, error) {
				console.log('Login failed');
			}
		});
	}

	// this function is called on 'sagas.js' and returns the response
	// that will be inserted into the corresponding dispatched action e.g.
	// the returned value is dispatched in the SIGNUP_SUCCESS action
	signupEmail(emailResponse) {
		// TODO: check how emails for newsletter will be handled by Parse
		alert(`Mocking email ${emailResponse.email} submission for newsletter`);
		return emailResponse;
	}

}

export default new ParseService();