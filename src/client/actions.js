import { SET_CURRENT_USER, LOGOUT } from './actionTypes';


export const setClient = token => {
	return {
		type: SET_CURRENT_USER,
		token,
	};
};


export const unsetClient = () => {
	return {
		type: LOGOUT
	};
};
