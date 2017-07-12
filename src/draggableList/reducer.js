import Immutable from "seamless-immutable";

// import action types
import {
	MOVE_ITEM_REQUEST,
	MOVE_ITEM_SUCCESS,
	MOVE_ITEM_ERROR,
	FETCH_LIST,
	FETCH_LIST_SUCCESS,
	FETCH_LIST_ERROR

} from "./actionTypes";

const initialState = Immutable({
	itemsList: [],
	isFetching: false,
	requesting: false,
	messages: [],
	errors: []
});

// handles requests for items to be dragged by receiving current state
// from saga sent from the container by 'moveItemReques' action
// which is fired when items on the list are dragged.
// Then once the saga saw the request taking place it will reorder the list
// and return a new re-ordered list on success, updating this way the draggable
// list state
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case MOVE_ITEM_REQUEST:
			return {
				...state,
				requesting: true,
				messages: state.messages.concat([
					{
						body: "Requesting to move draggable item",
						time: new Date()
					}
				]),
				itemsList: action.itemsList
			};

		case MOVE_ITEM_SUCCESS:
			return {
				itemsList: action.reorderedList,
				requesting: false,
				messages: [],
				error: []
			};

		case MOVE_ITEM_ERROR:
			return {
				...state,
				requesting: false,
				errors: state.errors.concat([
					{
						body: action.error.toString(),
						time: new Date()
					}
				]),
				messages: []
			};

		// populate list with current stored data
		case FETCH_LIST:
			return {
				...state,
				isFetching: true,
				messages: state.messages.concat([
					{
						body: "Fetching event list",
						time: new Date()
					}
				])
			};

		// Once data is successfully fetched the state is updated
		case FETCH_LIST_SUCCESS:
			return {
				...state,
				isFetching: false,
				itemsList: action.initialList,
				messages: []
			};

		// handle errors in case the fetch call fails
		case FETCH_LIST_ERROR:
			return {
				...state,
				isFetching: false,
				itemsList: action.itemsList,
				errors: state.errors.concat([
					{
						body: action.error.toString(),
						time: new Date()
					}
				]),
				messages: []
			};

		default:
			return state;
	}
};

export default reducer;
