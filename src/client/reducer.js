import Immutable from 'seamless-immutable';
import { SET_CURRENT_USER, LOGOUT } from './actionTypes';


const initialState = Immutable({
	token: null,
});


const reducer = (state = initialState, action) => {

	switch(action.type) {
		case SET_CURRENT_USER:
			return {
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