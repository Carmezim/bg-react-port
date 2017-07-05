import { all } from "redux-saga/effects";
import SignupSaga from "./signup/sagas";
import LoginSaga from "./login/sagas";
import dndWatcher from "./draggableList/sagas";

export default function* IndexSaga() {
	yield all([SignupSaga(), LoginSaga(), dndWatcher()]);
}
