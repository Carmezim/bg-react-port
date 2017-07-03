import { MOVE_LIST_ITEM } from "./actionTypes";

export const moveItem = (list, dragIndex, hoverIndex) => {
	const dragItem = items[dragIndex];
	return {
		type: MOVE_LIST_ITEM,
		list,
		dragIndex,
		hoverIndex,
		dragItem
	};
};

export default moveItem;
