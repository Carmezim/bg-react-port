import Immutable from "seamless-immutable";
import {
	EVENT_CREATING,
	EVENT_CREATE_SUCCESS,
	EVENT_CREATE_ERROR,
	EVENT_REQUESTING,
	EVENT_REQUEST_SUCCESS,
	EVENT_REQUEST_ERROR
} from "./actionTypes";

const initialState = Immutable({
	list: [],
	requesting: false,
	successful: false,
	messages: [],
	errors: []
});

const reducer = (state = initialState, action) => {
	console.log("creating event");
	switch (action.type) {
		case EVENT_CREATING:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [
					{
						body: `Creating ${action.event} event...`,
						time: new Date()
					}
				],
				errors: []
			};

		// On success include the new event into the list
		// this list will render later.
		case EVENT_CREATE_SUCCESS:
			console.log("event create success", action.event);
			return {
				...state,
				requesting: false,
				successful: true,
				messages: [
					{
						body: `Event ${action.event} successfully created`,
						time: new Date()
					}
				],
				errors: []
			};

		case EVENT_CREATE_ERROR:
			return {
				...state,
				requesting: false,
				successful: false,
				messages: [],
				errors: state.errors.concat([
					{
						body: action.error.toString(),
						time: new Date()
					}
				])
			};

		case EVENT_REQUESTING:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [
					{
						body: `Fetching events...`,
						time: new Date()
					}
				],
				errors: []
			};

		case EVENT_REQUEST_SUCCESS:
			return {
				list: action.events,
				requesting: false,
				successful: true,
				messages: [
					{
						body: `Events successfully fetched`,
						time: new Date()
					}
				],
				errors: []
			};

		case EVENT_REQUEST_ERROR:
			return {
				requesting: false,
				successful: false,
				messages: [],
				errors: state.errors.concat([
					{
						body: action.error.toString(),
						time: new Date()
					}
				])
			};

		default:
			return state;
	}
};

export default reducer;
