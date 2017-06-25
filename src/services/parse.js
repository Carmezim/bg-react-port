import Parse from 'parse';

class ParseService {
	constructor(props) {
		Parse.initialize("APPLICATION_ID", "JAVASCRIPT_KEY");
		Parse.serverURL = 'http://localhost:1337/parse';
	}



	// this function is called on 'sagas.js' and returns the response
	// that will be inserted into the corresponding dispatched action e.g.
	// the returned value is dispatched in the SIGNUP_SUCCESS action
	signupEmail(emailResponse) {
		// TODO: check how emails for newsletter will be handled by Parse
		alert(`Mocking email ${emailResponse.email} submission for newsletter`);
		return emailResponse;
	}


	// Log user in returning session token on a successful call.
	login(username, password) {
		Parse.User.logIn(username, password, {
			success: function(user) {
				alert('Login successful');
				return Parse.User.getSessionToken();
			},
			error: function(user, error) {
				console.log('Login failed');
				// return false;
			}
		});
	}


	// set current user through session token
	setCurrentUser(token) {
		Parse.User.become(token.toString()).then( (user) => {
			console.log('Token was validated and current user is now set.');
		}, (error) => {
			console.error('Token could not be validated');
		});
	}

	// Log user out
	logOut() {
		Parse.User.logOut()
	}

}

export default new ParseService();