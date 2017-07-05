import {
	MOVE_ITEM_REQUEST,
	MOVE_ITEM_SUCCESS,
	MOVE_ITEM_ERROR
} from "./actionTypes";

export const moveItemRequest = (itemsList, dragIndex, hoverIndex, dragItem) => {
	// console.log('itemsList', itemsList)
	// console.log('dragIndex', dragIndex)
	// console.log(' hoverIndex', hoverIndex)
	// console.log('dragItem', dragItem)
	return {
		type: MOVE_ITEM_REQUEST,
		itemsList,
		dragIndex,
		hoverIndex,
		dragItem
	};
};
