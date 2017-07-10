import Immutable from "seamless-immutable";

// import action types
import {
	MOVE_ITEM_REQUEST,
	MOVE_ITEM_SUCCESS,
	MOVE_ITEM_ERROR,
	INITIALIZE_LIST
} from "./actionTypes";

const initialState = Immutable({
	itemsList: [
		// {
		// 	id: 1,
		// 	text: "Event 1"
		// },
		// {
		// 	id: 2,
		// 	text: "Book Event 2 in a cool place"
		// },
		// {
		// 	id: 3,
		// 	text: "Awesome Book event 3"
		// },
		// {
		// 	id: 4,
		// 	text: "Fun Book Event 4"
		// },
		// {
		// 	id: 5,
		// 	text: "Book Event 5"
		// },
		// {
		// 	id: 6,
		// 	text: "One More Events 6"
		// },
		// {
		// 	id: 7,
		// 	text: "BOOKS BOOKS BOOKS 7"
		// }
	],
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
				])
			};
		// populate list with current stored data
		case INITIALIZE_LIST:
			return {
				...state,
				itemsList: action.initialList
			}
		default:
			return state;
	}
};

export default reducer;
