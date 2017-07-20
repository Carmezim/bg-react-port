import { call, put, takeLatest, all } from "redux-saga/effects";
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

function createEvent(event) {
	ParseService.createEvent(event);
}

function* eventCreateFlow(action) {
	try {
		const { event } = action;
		console.log(event);
		yield call(createEvent, event);

		yield put(eventCreateSuccess(event));
	} catch (error) {
		yield put(eventCreateError(error));
	}
}

function* eventRequestFlow(action) {
	try {
		// call Parse to return events
		const events = yield call(eventRequest, action);
		console.log("sagas fetched events", action);
		// if there is a token we inform Redux the request was successful
		yield put(eventRequestSuccess(events));
	} catch (error) {
		yield put(eventRequestError(error));
	}
}

function* dashboardWatcher() {
	yield all([
		takeLatest(EVENT_CREATING, eventCreateFlow),
		takeLatest(EVENT_REQUESTING, eventRequestFlow)
	]);
}

export default dashboardWatcher;
