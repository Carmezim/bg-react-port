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
	fetchEvents() {
		const event = new Parse.Query(this.EventClass);

		event.notEqualTo("name", null);
		event.notEqualTo("objectId", null);
		event.notEqualTo("objectId", null);
		event.notEqualTo("price", null);
		event.notEqualTo("startDate", null);
		event.notEqualTo("startTime", null);
		event.notEqualTo("title", null);
		event.select(
			"name",
			"title",
			"address",
			"price",
			"startDate",
			"startTime",
			"order"
		);

		event.limit(7);
		// 'query.find' not filtering based on constraints
		// maybe related https://github.com/parse-community/parse-server/issues/211
		console.log("Fetching list");
		return event.find().then({
			success: results => {
				console.log("Events fetched: ", results);
			},
			error: err => {
				console.error(err);
			}
		});
	}

	fetchFullList() {
		const event = new Parse.Query(this.EventClass);

		event.notEqualTo("name", null);
		event.notEqualTo("objectId", null);
		event.notEqualTo("objectId", null);
		event.notEqualTo("price", null);
		event.notEqualTo("startDate", null);
		event.notEqualTo("startTime", null);
		event.notEqualTo("title", null);
		event.select(
			"name",
			"title",
			"address",
			"price",
			"startDate",
			"startTime",
			"order"
		);
		event.skip(7);
		event.limit(20);
		// 'query.find' not filtering based on constraints
		// maybe related https://github.com/parse-community/parse-server/issues/211
		console.log("Fetching full list");
		return event.find().then({
			success: results => {
				console.log("Events fetched: ", results);
			},
			error: err => {
				console.error(err);
			}
		});
	}

	saveEventsList(eventsList) {
		const event = new this.EventClass();
		const eventArr = [];

		// eventsList.map(event => {
		// 	event.set("name", event.attributes.name);
		// 	event.set("title", event.attributes.title);
		// 	eventArr.push(event.attributes)
		// 	event.save(eventArr);
		// });
		console.log(eventsList);
		event.set("sort_order", "ascending");
		Parse.Object
			.saveAll(eventsList)
			.then(
				list => console.log("Events list state successfully saved", list),
				error => console.log("Failed to save events list due: ", error)
			);
	}

	createEvent(eventData) {
		const event = new this.EventClass();
		const banner = []; // temporary workaround for banner array
		banner.push(eventData.banner);
		event.save(
			{
				name: eventData.name,
				address: eventData.address,
				price: eventData.price,
				venue: eventData.venue,
				postCode: eventData.postCode,
				description: eventData.description,
				aboutEvent: eventData.aboutEvent,
				banner: banner,
				title: eventData.title
			},
			{
				success: eventData => {
					console.log("Successfuly saved submitted event!", eventData);
				},
				error: error => {
					console.error("Failed to save submitted event due to ", error);
				}
			}
		);
	}
}

export default new ParseService();
