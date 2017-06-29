import { combineReducers } from 'redux';
import client from './client/reducer';
import signup from './signup/reducer';
import login from './login/reducer';
import bookEvents from './dashboard/reducer';
import { reducer as form } from 'redux-form';


const IndexReducer = combineReducers({
	client,
	signup,
	login,
	bookEvents,
	form,
});

export default IndexReducer;