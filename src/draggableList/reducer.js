import Immutable from "seamless-immutable";

// import action types
import {
	MOVE_ITEM_REQUEST,
	MOVE_ITEM_SUCCESS,
	MOVE_ITEM_ERROR
} from "./actionTypes";

const initialState = Immutable({
	pending: false,
	itemsList: [
		{
			id: 1,
			text: "Event 1"
		},
		{
			id: 2,
			text: "Book Event 2 in a cool place"
		},
		{
			id: 3,
			text: "Awesome Book event 3"
		},
		{
			id: 4,
			text: "Fun Book Event 4"
		},
		{
			id: 5,
			text: "Book Event 5"
		},
		{
			id: 6,
			text: "One More Events 6"
		},
		{
			id: 7,
			text: "BOOKS BOOKS BOOKS 7"
		}
	]
});

// handles requests for items to be dragged by
// receiving current state from saga sent through the container
// by 'moveItemReques' action when items on the list are dragged
const reducer = (state = initialState, action) => {
	const { itemsList } = state;
	const { dragIndex, hoverIndex, dragItem, result } = action;

	switch (action.type) {
		case MOVE_ITEM_REQUEST:
			return {
				pending: true,
				itemsList: result
			};

		case MOVE_ITEM_SUCCESS:
			return {
				...state,
				pending: false
			};

		case MOVE_ITEM_ERROR:
			return {
				...state,
				pending: false
			};

		default:
			return state;
	}
};

export default reducer;
