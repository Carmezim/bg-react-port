import Immutable from 'seamless-immutable';
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR, SET_CURRENT_LOGGED_USER, LOGOUT } from './actionTypes';


const initialState = Immutable({
	requesting: false,
	successful: false,
	messages: [],
	errors: [],
	token: null,
});

const reducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case LOGIN_REQUESTING:
			return {
				requesting: true,
				successful: false,
				messages: [{ body: "Logging in...", time:  new Date() }],
				errors: [],
				...state,
			};

		case LOGIN_SUCCESS:
			return {
				requesting: false,
				successful: true,
				messages: [],
				errors: [],
				...state,
			};

		case LOGIN_ERROR:
			return {
				requesting: false,
				successful: false,
				errors: state.errors.concat([{
					body: action.error.message.toString(),
					time: new Date(),
				}]),
				messages: [],
				...state,
			};

		case SET_CURRENT_LOGGED_USER:
			return {
				messages: [{ body: "Setting current user ", time:  new Date() }],
				token: action.token,
				...state,
			};

		case LOGOUT:
			return {
				token: null,
				...state,
			};

		default:
			return state;
	}
};


export default reducer;