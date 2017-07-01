import { takeLatest, call, put } from "redux-saga/effects";
import { SIGNUP_REQUESTING, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./actionTypes";
import ParseService from "../services/parseAPI";

// Waits until  SIGNUP_REQUESTING action is dispatched
// calls singupFLow() with the action received
// ssignupFlow() then run in a generator stepping through each call synchronously

function* signupFlow(action) {
	try {
		const { email } = action;

		// add email to databse with Parse, waiting for instructions
		// on how to handle newsletter emails

		// pulls "calls" to ParseService API with email
		// from dispatched singup action
		// will pause here until API async function is complete
		const response = yield call(ParseService.signupEmail, email);

		// when the API call has completed it will "put" or dispatch an action
		// of type SIGNUP_SUCCESS with the successful response
		yield put({ type: SIGNUP_SUCCESS, response });
	} catch (error) {
		// if API call fails it will "put" SIGNUP_ERROR into the dispatch
		// along the error
		yield put({ type: SIGNUP_ERROR, error });
	}
}

function* signupWatcher() {
	yield takeLatest(SIGNUP_REQUESTING, signupFlow);
}

export default signupWatcher;
