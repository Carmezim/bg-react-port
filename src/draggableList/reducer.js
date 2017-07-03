import { MOVE_LIST_ITEM } from "./actionTypes";

const initialState = {
	listItems: [
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
};

const reducer = (state = initialState, action) => {
	const { dragIndex, hoverIndex, dragItem } = action;
	switch (action.type) {
		case MOVE_LIST_ITEM:
			return {
				listItems: state.listItems.splice(
					[dragIndex, 1],
					[hoverIndex, 0, dragItem]
				)
			};

		default:
			return state;
	}
};

export default reducer;
