import {
	EVENT_CREATING,
	EVENT_CREATE_SUCCESS,
	EVENT_CREATE_ERROR,
	EVENT_REQUESTING,
	EVENT_REQUEST_SUCCESS,
	EVENT_REQUEST_ERROR
} from "./actionTypes";

export const eventCreate = (client, event) => {
	return {
		type: EVENT_CREATING,
		client,
		event
	};
};

export const eventCreateSuccess = event => {
	return {
		type: EVENT_CREATE_SUCCESS,
		event
	};
};

export const eventCreateError = error => {
	return {
		type: EVENT_CREATE_ERROR,
		error
	};
};

export const eventRequest = client => {
	return {
		type: EVEMT_REQUESTING,
		client
	};
};

export const eventRequestSuccess = events => {
	return {
		type: EVENT_REQUEST_SUCCESS,
		events
	};
};

export const eventRequestError = client => {
	return {
		type: EVENT_REQUEST_ERROR,
		client
	};
};
