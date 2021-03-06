import { combineReducers } from "redux";
import client from "./client/reducer";
import signup from "./signup/reducer";
import login from "./login/reducer";
import dashboard from "./dashboard/reducer";
import draggable from "./draggableList/reducer";
import { reducer as form } from "redux-form";

const IndexReducer = combineReducers({
	client,
	signup,
	login,
	form,
	dashboard,
	draggable
});

export default IndexReducer;
