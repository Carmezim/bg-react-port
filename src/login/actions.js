import { LOGIN_REQUESTING } from './actionTypes';


const loginRequest = ({ username, password }) => {
	return {
		type: LOGIN_REQUESTING,
		username,
		password,
	};
};

export default loginRequest;