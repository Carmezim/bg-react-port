import Parse from 'parse';

class ParseService {
	constructor(props) {
		Parse.initialize("bookgig", "bookgig");
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


	// create new user
	createUSer(username, password) {
		let user = new Parse.User();
		user.set("username", username);
		user.set("password", password);

		user.signUp(null, {
			success: function (user) {
				console.log('New user successfully created');
			},
			error: function (user, error) {
				alert(`Error: ${error.code} ${error.message}`)
			}
		});
	}


	// Log user in returning session token on a successful call.
	login(username, password) {
		 return Parse.User.logIn(username, password, {
			success: function(user) {
				console.log(`Successfully logged user ${username}`);
			},
			error: function(user, error) {
				console.error(`Parse failed to login due to: ${error.code} ${error.message}`);
				// return false;
			}
		});
	}

	isUserAuthenticated() {
		let currentUser = Parse.User.current();
		if (currentUser) {
			return true;
		}
		else {
			return false;
		}
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
		console.log('logging out');
		Parse.User.logOut()
	}

}

export default new ParseService();