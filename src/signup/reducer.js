import Immutable from "seamless-immutable";
import { SIGNUP_REQUESTING, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./actionTypes";

const initialState = Immutable({
	requesting: false,
	successful: false,
	messages: [],
	errors: []
});

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGNUP_REQUESTING:
			return {
				requesting: true,
				successful: false,
				messages: [{ body: "Signing email up...", time: new Date() }],
				errors: []
			};

		case SIGNUP_SUCCESS:
			return {
				requesting: false,
				successful: true,
				messages: [
					{
						body: `Successfully submitted ${action.response
							.email} for newsletter`,
						time: new Date()
					}
				],
				errors: []
			};

		case SIGNUP_ERROR:
			return {
				requesting: false,
				successful: false,
				messages: [],
				errors: state.errors.concat([
					{
						body: action.error.toString(),
						time: new Date()
					}
				])
			};

		default:
			return state;
	}
};

export default reducer;
