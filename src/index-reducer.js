import { combineReducers } from 'redux'
import login from './login/reducer';
import signup from './signup/reducer';
import { reducer as form } from 'redux-form';


const IndexReducer = combineReducers({
	signup,
	login,
	form,
});

export default IndexReducer;