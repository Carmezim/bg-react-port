import { call, put, takeLatest } from "redux-saga/effects";
import ParseService from "../services/parseAPI";

import { EVENT_CREATING, EVENT_REQUESTING } from "./actionTypes.js";

import {
	eventCreateSuccess,
	eventCreateError,
	eventRequestSuccess,
	eventRequestError
} from "./actions.js";

function eventRequest() {
	return ParseService.loadEvents();
}

function eventCreate(event) {
	ParseService.createEvent(event);
}

function* eventCreateFlow(action) {
	try {
		const { event } = action;

		const createEvent = yield call(eventCreate, event);
		// TODO: implement Parse method to create event and add it here
	} catch (error) {
		yield put(eventCreateError(error));
	}
}

function* eventRequestFlow(action) {
	try {
		// call Parse to return events
		const events = yield call(eventRequest);
		console.log("sagas fetched events", action);
		// if there is a token we inform Redux the request was successful
		yield put(eventRequestSuccess(events));
	} catch (error) {
		yield put(eventRequestError(error));
	}
}

function* dashboardWatcher() {
	yield [
		takeLatest(EVENT_CREATING, eventCreateFlow),
		takeLatest(EVENT_REQUESTING, eventRequestFlow)
	];
}

export default dashboardWatcher;
