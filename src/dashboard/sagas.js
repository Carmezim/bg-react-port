import { call, put, takeLatest } from "redux-saga/effects";
import ParseService from "../services/parseAPI";

import { 
	EVENT_CREATING,
	EVENT_REQUESTING
} from "./actionTypes.js";
// TODO: implement dashboard saga handling event creation flow and remaining actions side effects
import {
	eventCreateSuccess,
	eventCreateError,
	eventRequestSuccess,
	eventRequestError
} from "./actions.js";

function eventRequest() {
	return ParseService.loadEvents();
}

function eventCreate() {
	// call Parse method to create the new event
}

function* eventCreateFlow() {
	try {
		const { event } = action;
		const createEvent = yield call(eventCreate);
		// TODO: implement Parse method to create event and add it here
	} catch {
		yield put(eventCreateError(error));
	}
}

function* eventRequestFlow(action) {
	try {
		// call Parse to return events
		const events = yield call(eventRequest);
		//
		yield put(eventRequestSuccess(events));
	} catch (error) {
		yield put(eventRequestError(error))
	}
}

function* dashboardWatcher() {
	
		yield [
			takeLatest(EVENT_CREATING, eventCreateFlow),
			takeLatest(EVENT_REQUESTING, eventRequestFlow)
		];
	}
}

export default dashboardWatcher;
