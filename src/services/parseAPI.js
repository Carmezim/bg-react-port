import Parse from 'parse';


export const PAST_EVENTS_LIMIT = 100;
export const AUTHORS_LIMIT = 200;


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



	// ----------------- USER RELATED METHODS -----------------------
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





	// Load data
	loadData(type, status, options, callback) {

		const Post = Parse.Object.extend('Event');
		const query = new Parse.Query(Post);
		const promise = new Parse.Promise();
		query.include('eventBook');

		if ( options.imports ){
			query.equalTo('importSource', options.imports);
			query.skip(((options.page||0) * PAST_EVENTS_LIMIT) || 0);
			options.limit = PAST_EVENTS_LIMIT;
		}

		if (!!options.limit){
			query.limit(options.limit); // rows limit
		} else {
			query.limit(1000);  // "soft" limit 100 to overwrite the 100 default
		}

		if (!!options.sort){
			query.ascending(options.sort);
		} else {
			query.ascending("startDate");
		}

		if (typeof(type) !== 'undefined' && type && !options.author){
			query.equalTo("type", type);
		}

		// Search for author
		if (options.author){
			query.containsAll('author_search_array', [options.author]);
		}

		if (status !== 'draft' && status !== 'import'){
			if (status !== 'past'){
				query.equalTo("status", status);
				query.greaterThanOrEqualTo('endDate', new Date(moment().subtract(12, 'hours')));
			} else {
				query.lessThanOrEqualTo('endDate', new Date(moment().subtract(12, 'hours')));
				query.skip((options.page * PAST_EVENTS_LIMIT) || 0);
				query.limit(PAST_EVENTS_LIMIT);
			}
		} else {
			query.equalTo("status", status);
			query.descending("createdAt");
		}

		query.find().then( (results) => {

			let items = dl.prepareData(results);

			if ( options.waitPromise ){
				options.waitPromise.then( () => {
					done();
				});
				return;
			}

			done();

			function done(){
				callback({'items' : items });
				promise.resolve({
					items : items
				});
			}

		},function(error) {
			console.log('error',error);
			promise.reject(error);
			return false;
		});
	}




}

export default new ParseService();