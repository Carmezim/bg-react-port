import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects';
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from './actionTypes';
import history from '../history'
import ParseService from '../services/parseAPI';


import { setClient, unsetClient } from '../client/actions';
import { LOGOUT } from '../client/actionTypes';

function* logout () {
	yield put(unsetClient());

	localStorage.removeItem('token');

	yield ParseService.logOut();

	history.push('/admin');
}

function* loginFlow (username, password) {
	let parsePromise;
	let token;
	try {
		// invoke logIn function that communicates with Parse API.
		// Redux Saga pauses here until we successfully log in or
		// receive an error
		parsePromise = yield call(ParseService.login, username, password);

		token = parsePromise.attributes.sessionToken;

		if (token) {
			// inform Redux to set user token, non blocking.
			yield put(setClient(token));

			// informRedux login was successful
			yield put({ type: LOGIN_SUCCESS });

			// set stringified version of the token to localstorage
			localStorage.setItem('token', JSON.stringify(token));

			// place a redirect here to admin panel when ready
			// history.push("/admin-panel");
		}
	} catch (error) {
		// if error, send it to Redux
		yield put({ type: LOGIN_ERROR, error});
	} finally {
		// if the forked task is cancelled we then redirect
		// to login again
		if (yield cancelled()) {
			yield call(history.push, "/admin");
		}
	}
}

// Watcher
function* loginWatcher () {

	// Generators halt execution until their next step is ready
	// so this look isn't firing in the background instead it
	// compares the boolean and starts the first step
	// e.g.: a loop inside a generator function stops at each yield and wait
	while (true) {
		// sees a yield statement first which pauses the loop until
		// the action is complete

		// yield take(ACTION) means when the generator sees the ACTION
		// it will pull from that ACTION's payload the username and password
		// and only after this happens the loop continues and pass username
		// and password to 'loginFlow()'
		// e.g.: once LOGIN_REQUEST is dispatched from Login component
		// this will take the username and password off of the action
		// and fork a background task (the loop will continue)
		// that then runs loginFlow()
		const { username, password } = yield take(LOGIN_REQUESTING);

		// the fork() method resembles thread handling in C. It will
		// start another 'process' that deals with handling loginFlow execution
		// in the background
		// It will also pass back a reference to this forked task that's stored in our
		// const task. We can use this to manage the task.
		// fork() does not block the loop, it runs in the background as soon as our loop
		// executes it. The loop then continues and starts looking for the next actions on'take()' which
		// are LOGOUT or LOGIN_ERROR. The user logs in once so we only need to
		// watch for a LOGOUT or LOGIN_ERROR
		const task = yield fork(loginFlow, username, password);

		// At this point it is watching only for a LOGOUT or LOGIN_ERROR
		// The moment the user logs out or a login error occurs
		// the loop will move forward
		const action = yield take([LOGOUT, LOGIN_ERROR]);

		// If users try to logout before the task that was trying
		// to log then in completes we can cancel it and continue
		if (action.type === LOGOUT) yield cancel(task);

		// Log user out
		yield call(logout);
	}
}

export default loginWatcher;