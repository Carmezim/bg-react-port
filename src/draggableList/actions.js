import { MOVE_LIST_ITEM } from "./actionTypes";

export const moveItem = (listItems, dragIndex, hoverIndex) => {
	const dragItem = listItems[dragIndex];
	return {
		type: MOVE_LIST_ITEM,
		listItems,
		dragIndex,
		hoverIndex,
		dragItem
	};
};

export default moveItem;
