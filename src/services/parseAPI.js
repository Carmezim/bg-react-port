import Parse from "parse";
import moment from "moment";

export const PAST_EVENTS_LIMIT = 100;
export const AUTHORS_LIMIT = 200;

class ParseService {
	constructor(props) {
		Parse.initialize("bookgig", "bookgig");
		Parse.serverURL = "http://localhost:1337/parse";

		this.EventClass = Parse.Object.extend("Event");
		this.EventBooks = Parse.Object.extend("EventBooks");
		this.Author = Parse.Object.extend("Author");
		this.Category = Parse.Object.extend("Category");
	}

	// this function is called on 'sagas.js' and returns the response
	// that will be inserted into the corresponding dispatched action e.g.
	// the returned value is dispatched in the SIGNUP_SUCCESS action
	signupEmail(emailResponse) {
		// TODO: check how emails for newsletter will be handled by Parse
		alert(`Mocking email ${emailResponse.email} submission for newsletter`);
		return emailResponse;
	}

	// ----------------- USER RELATED METHODS -----------------------
	// create new user
	createUSer(username, password) {
		let user = new Parse.User();
		user.set("username", username);
		user.set("password", password);

		user.signUp(null, {
			success: function(user) {
				console.log("New user successfully created");
			},
			error: function(user, error) {
				alert(`Error: ${error.code} ${error.message}`);
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
				console.error(
					`Parse failed to login due to: ${error.code} ${error.message}`
				);
				// return false;
			}
		});
	}

	isUserAuthenticated() {
		let currentUser = Parse.User.current();
		if (currentUser) {
			return true;
		} else {
			return false;
		}
	}

	// set current user through session token
	setCurrentUser(token) {
		return Parse.User.become(token.toString()).then(
			user => {
				console.log("Token was validated and current user is now set.");
			},
			error => {
				console.error("Token could not be validated");
			}
		);
	}

	// Log user out
	logOut() {
		if (Parse.User.current()) {
			console.log(
				`Current user is ${Parse.User.current().attributes.username}`
			);
		} else {
			console.log(`Current user is ${Parse.User.current()}`);
		}
		Parse.User.logOut().then(
			success => {
				console.log(`User logged out! Current user is ${Parse.User.current()}`);
			},
			error => {
				console.error(`Loggout failed due: ${error}`);
			}
		);
	}

	//---------------------------DATA RELATED METHODS--------------------------
	loadEvents() {
		const event = new Parse.Query(this.EventClass);
		const resultArr = [];

		event.limit(50);
		event.select("name", "address", "price", "startDate", "startTime", "order");
		return event.find({
			success: results => {
				results.map(result => {
					console.log(result.attributes)
					resultArr.push(result.attributes);
				});
				return resultArr;
			},
			error: err => {
				console.error(err);
			}
		});
	}

	createEvent(eventData) {
		const event = new Parse.Query(this.EventClass);

		event.set("name", eventDAta.name);
		event.set("address", eventData.address);
		event.set("price", eventData.price);
		event.set("startDate", eventData.startDate);
		event.set("startTime", eventData.startTime);
		event.set("order", eventData.order);
		event.save(null, {
			success: data => {
				console.log("Successfuly saved submitted event!");
			},
			error: error => {
				console.error(`Failed to save submitted event due to ${error}!`);
			}
		});
	}
}

export default new ParseService();
