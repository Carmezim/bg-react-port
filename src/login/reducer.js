import Immutable from 'seamless-immutable';
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from './actionTypes';


const initialState = Immutable({
	requesting: false,
	successful: false,
	messages: [],
	errors: [],
});

const reducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case LOGIN_REQUESTING:
			return {
				requesting: true,
				successful: false,
				messages: [{ body: "Logging in...", time:  new Date() }],
				errors: [],
			};

		case LOGIN_SUCCESS:
			return {
				requesting: false,
				successful: true,
				messages: [],
				errors: [],
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
			};

		default:
			return state;
	}
};


export default reducer;