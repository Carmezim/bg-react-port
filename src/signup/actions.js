import { SIGNUP_REQUESTING } from "./actionTypes";

const signupRequest = email => {
	return {
		type: SIGNUP_REQUESTING,
		email
	};
};

export default signupRequest;
