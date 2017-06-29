import Immutable from 'seamless-immutable';
import { CREATE_EVENT, CREATE_EVENT_SUCCESS, CREATE_ERROR } from './actionTypes';


const initialState = Immutable({
	list: [],
	requesting: false,
	successful: false,
	messages: [],
	errors: [],
});


const reducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_EVENT:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `event being created`,
					time: new Date(),
				}],
				errors: [],
			};

		// On success include the new event into the list
		// this list will render later.
		case CREATE_EVENT_SUCCESS:
			return {
				list: state.list.concat([action.event]),
				requesting: false,
				successful: true,
				messages: [{
					body: `event successfully created`,
					time: new Date(),
				}],
				errors: [],
			};

		case CREATE_ERROR:
			return {
				...state,
				requesting: false,
				successful: false,
				messages: [],
				errors: state.errors.concat([{
					body: action.error.toString(),
					time: new Date(),
				}]),
			};

		default:
			return state;
	}
};


export default reducer;