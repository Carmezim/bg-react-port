import { call, fork, put, take } from "redux-saga/effects";

// import DnD action
import { MOVE_ITEM_REQUEST, MOVE_ITEM_ERROR } from "./actionTypes";
import { moveItemRequest } from "./actions";

// as we cannot mutate our data we will use those helper
// function to nned to achieve deletion and insertion (to replace splice)
// first we remove the item to be replaced
function sliceList(listItems, dIndex) {
	return listItems.slice(0, dIndex).concat(listItems.slice(dIndex + 1));
}
// then we insert the new one no its place
function insert(arr, index, newItem) {
	return [
		// part of the array before the specified index
		...arr.slice(0, index),
		// inserted item
		newItem,
		// part of the array after the specified index
		...arr.slice(index)
	];
}

// drag and drop move flow
function* moveItem(action) {
	try {
		yield put(moveItemRequest(action));
	} catch (error) {
		yield put({ type: MOVE_ITEM_ERROR, error });
	}
}

// watch drag and drop actions
function* dndWatcher() {
	while (true) {
		// retrieving DnD move request action data
		const { itemsList, dragIndex, hoverIndex, dragItem } = yield take(
			MOVE_ITEM_REQUEST
		);

		const slicedList = yield call(sliceList, itemsList, dragIndex);

		const result = yield call(insert, slicedList, hoverIndex, dragItem);

		yield fork(moveItem, result);

		// after 'moveItem' task is forked start to watch for errors
		yield take(MOVE_ITEM_ERROR);
	}
}

export default dndWatcher;
