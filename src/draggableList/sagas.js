import { call, fork, put, take } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

// import DnD actionTypes
import {
	MOVE_ITEM_REQUEST,
	MOVE_ITEM_SUCCESS,
	MOVE_ITEM_ERROR
} from "./actionTypes";
// // import action
// import { moveItemRequest } from "./actions";

// as we cannot mutate our data we will use those helper
// function to achieve deletion and insertion (to replace splice)
// first we remove the item to be replaced
function removeListItem(listItems, dIndex) {
	return listItems.slice(0, dIndex).concat(listItems.slice(dIndex + 1));
}

// then we insert the new one in its place
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
function* moveItem(reorderedList) {
	try {
		// receive new re-ordered list and on success dispatch
		// the new list, updating the state
		yield put({ type: MOVE_ITEM_SUCCESS, reorderedList });

		// continues to watch for requests
		yield call(dndWatcher);
	} catch (error) {
		yield put({ type: MOVE_ITEM_ERROR, error });
	}
}

// watch drag and drop actions
function* dndWatcher() {
	while (true) {
		// retrieving DnD move request action data
		// we here are watching whenever an item is dragged
		// once it happens we take all the data sent on the action 
		// fired from our view
		const { itemsList, dragIndex, hoverIndex, dragItem } = yield take(
			MOVE_ITEM_REQUEST
		);

		// then we reorder the list accordingly using the helper functions
		// first we delete the dragged item from its previous place
		const withoutPrevItem = yield call(removeListItem, itemsList, dragIndex);

		// then we add it to the place where it will take on the list re-ordering the list
		const reordereList = yield call(
			insert,
			withoutPrevItem,
			hoverIndex,
			dragItem
		);

		// at last we fork a new task sending the updated list to be dispatched and update the state
		yield fork(moveItem, reordereList);

		// after 'moveItem' task is forked start to watch for errors
		yield take(MOVE_ITEM_ERROR);
	}
}

export default dndWatcher;
