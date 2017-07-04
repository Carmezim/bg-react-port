import {
	MOVE_ITEM_REQUEST,
	MOVE_ITEM_SUCCESS,
	MOVE_ITEM_ERROR
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
