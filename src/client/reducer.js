import Immutable from 'seamless-immutable';
import { SET_CURRENT_LOGGED_USER, LOGOUT } from './actionTypes';


const initialState = Immutable({
	token: null,
});


const reducer = (state = initialState, action) => {

	switch(action.type) {
		case SET_CURRENT_LOGGED_USER:
			return {
				// messages: [{ body: "Setting current user ", time:  new Date() }],
				token: action.token,
			};


		case LOGOUT:
			return {
				token: null,
			};

		default:
			return state;
	}
};


export default reducer;