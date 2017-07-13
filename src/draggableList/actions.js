import {
	MOVE_ITEM_REQUEST,
	MOVE_ITEM_SUCCESS,
	MOVE_ITEM_ERROR,
	FETCH_LIST
} from "./actionTypes";

export const moveItemRequest = (itemsList, dragIndex, hoverIndex, dragItem) => {
	return {
		type: MOVE_ITEM_REQUEST,
		itemsList,
		dragIndex,
		hoverIndex,
		dragItem
	};
};

export const fetchEvents = () => {
	console.log('fetch action')
	return {
		type: FETCH_LIST
	};
};
