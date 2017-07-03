import { MOVE_LIST_ITEM } from "./actionTypes";

export const moveItem = (dragIndex, hoverIndex, dragItem) => {
	return {
		type: MOVE_LIST_ITEM,
		dragIndex,
		hoverIndex,
		dragItem
	};
};

export default moveItem;
