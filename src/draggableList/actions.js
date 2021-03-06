import {
	MOVE_ITEM_REQUEST,
	MOVE_ITEM_SUCCESS,
	MOVE_ITEM_ERROR,
	FETCH_LIST
} from "./actionTypes";

export const moveItemRequest = (list, dragIndex, hoverIndex, dragItem) => {
	console.log("ACTION MOVE SORTED LIST", list);
	return {
		type: MOVE_ITEM_REQUEST,
		list,
		dragIndex,
		hoverIndex,
		dragItem
	};
};

export const fetchEvents = () => {
	return {
		type: FETCH_LIST
	};
};
