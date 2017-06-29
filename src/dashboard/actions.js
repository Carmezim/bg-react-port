import { CREATE_EVENT, CREATE_EVENT_SUCCESS, CREATE_ERROR } from './actionTypes';


export const createEvent = (client, eventToCreate) => {
	return {
		type: CREATE_EVENT,
		client,
		eventToCreate,
	};
};


export const eventCreateSuccess = (eventToCreate) => {
	return {
		type: CREATE_EVENT_SUCCESS,
		eventToCreate,
	};
};


export const eventCreateError = (error) => {
	return {
		type: CREATE_ERROR,
		error
	};
};