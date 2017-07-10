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
			success: user => {
				console.log("New user successfully created");
			},
			error: (user, error) => {
				alert(`Error: ${error.code} ${error.message}`);
			}
		});
	}

	// Log user in returning session token on a successful call.
	async login(username, password) {
		return Parse.User.logIn(username, password, {
			success: user => {
				console.log(`Successfully logged user ${username}`);
			},
			error: (user, error) => {
				console.error(
					`Parse failed to login due to: ${error.code} ${error.message}`
				);
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

		event.select(
			"name",
			"title",
			"address",
			"price",
			"startDate",
			"startTime",
			"order"
		);
		event.exists(
			"name",
			"objectId",
			"price",
			"startDate",
			"startTime",
			"title"
		);
		event.limit(5);
		return event.find({
			success: results => {
				results.map(result => {
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
		console.log("event data service API", eventData);
		const event = new Parse.Query(this.EventClass);

		event.set("name", eventData.name);
		event.set("address", eventData.address);
		event.set("price", eventData.price);
		event.set("venue", eventData.venue);
		event.set("postCode", eventData.postCode);
		event.set("description", eventData.description);
		event.set("aboutEvent", eventData.aboutEvent);
		event.set("banner", eventData.banner);
		event.set("title", eventData.title);
		event.save(null, {
			success: event => {
				console.log("Successfuly saved submitted event!");
			},
			error: error => {
				console.error(`Failed to save submitted event due to ${error}!`);
			}
		});
	}
}

export default new ParseService();
