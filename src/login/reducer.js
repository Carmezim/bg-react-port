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
				token: null,
			};

		case LOGIN_SUCCESS:
			return {
				requesting: false,
				successful: true,
				messages: [],
				errors: [],
				token: null,
			};

		case LOGIN_ERROR:
			return {
				requesting: false,
				successful: false,
				errors: state.errors.concat([{
					body: action.error.toString(),
					time: new Date(),
				}]),
				messages: [],
				token: null,
			};

		case SET_CURRENT_LOGGED_USER:
			return {
				...state,
				messages: [{ body: "Setting current user...", time:  new Date() }],
				token: action.token,
			};

		case LOGOUT:
			return {
				...state,
				messages: [{ body: "Logging out...", time:  new Date() }],
				token: null,
			};

		default:
			return state;
	}
};


export default reducer;