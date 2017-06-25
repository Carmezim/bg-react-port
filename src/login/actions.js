import { LOGIN_REQUESTING, SET_CURRENT_LOGGED_USER, LOGOUT } from './actionTypes';


export const loginRequest = ({ username, password }) => {
	return {
		type: LOGIN_REQUESTING,
		username,
		password,
	};
};


// Sets current user
export const setClient = token => {
	return {
		type: SET_CURRENT_LOGGED_USER,
		token,
	};
};

// log out user and removes access token from state
export const unsetClient = () => {
	return {
		type: LOGOUT,
	};
};