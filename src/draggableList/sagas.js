import { call, fork, put, take, cancel, takeLatest } from "redux-saga/effects";
import ParseService from "../services/parseAPI";

// import DnD action types
import {
	MOVE_ITEM_REQUEST,
	MOVE_ITEM_SUCCESS,
	MOVE_ITEM_SECOND_SUCCESS,
	MOVE_ITEM_ERROR,
	FETCH_LIST,
	FETCH_LIST_SUCCESS,
	FETCH_LIST_ERROR
} from "./actionTypes";

// Fetch current list to populate list when initializing
function* fetchEventsList() {
	const listArr = [];
	const events = yield ParseService.fetchEvents();
	const fullList = yield ParseService.fetchFullList();
	listArr.push(events);
	listArr.push(fullList);

	return listArr;
}

// Save re-ordered list to the server
function* saveEventsList(list) {
	yield ParseService.saveEventsList(list);
}

// As we cannot mutate our data we will use those helper
// function to achieve deletion and insertion (to replace splice).
// First we remove the item to be replaced
function removeListItem(listItems, dIndex) {
	return listItems.slice(0, dIndex).concat(listItems.slice(dIndex + 1));
}

// Then we insert the new one in its place
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

// DragDand drop move flow
function* moveItem(reorderedList) {
	try {
		// receive new re-ordered list and on success dispatch
		// the new list, updating the state

		// If isn't the main list
		// we will inform Redux and update accordingly
		console.log(reorderedList.length)
		if (reorderedList.length <= 7) {
			// update main list
			yield put({ type: MOVE_ITEM_SUCCESS, reorderedList });
		} else {
			// update secondary list
			yield put({ type: MOVE_ITEM_SECOND_SUCCESS, reorderedList });
		}
		// continues to watch for requests
		yield call(dndWatcher);
	} catch (error) {
		yield put({ type: MOVE_ITEM_ERROR, error });
	}
}

// Populates events initial state
function* loadEventsFlow() {
	try {
		// Initializes the call to fetch the
		// current events stored on the backend
		const eventsArr = yield call(fetchEventsList);
		const mainList = eventsArr[0];
		const fullList = eventsArr[1];
		// Populate list state with fetched data and
		// inform Redux action completed successfully

		yield put({ type: FETCH_LIST_SUCCESS, mainList, fullList });
	} catch (error) {
		yield put({ type: FETCH_LIST_ERROR, error });
	}
}

// Watches for events to be successfully fetched
function* loadEventsWatcher() {
	const populateInitState = yield fork(loadEventsFlow);

	yield take(FETCH_LIST_SUCCESS);

	yield cancel(populateInitState);
}

// initiate populating state
// and watch drag and drop actions
function* dndWatcher() {
	while (true) {
		// Fetch list on database and update the list
		// state calling 'fetchListFlow'
		// then handle retrieving DnD move actions requests data
		// by watching whenever an item is dragged
		// and taking all the data sent on the action when it happens

		// Listen to FETCH_LIST action dispatched when App.js
		// finishes mounting and starts events flow that populates the
		// app initial state with data from the backend
		yield takeLatest(FETCH_LIST, loadEventsWatcher);

		const { list, dragIndex, hoverIndex, dragItem } = yield take(
			MOVE_ITEM_REQUEST
		);

		// then we reorder the list accordingly using the helper functions
		// first we delete the dragged item from its previous place
		const withoutPrevItem = yield call(removeListItem, list, dragIndex);

		// then we add it to the place where it will
		// take on the list re-ordering the list
		const reorderedList = yield call(
			insert,
			withoutPrevItem,
			hoverIndex,
			dragItem
		);

		// at last we fork a new task sending the updated list to
		// be dispatched and update the state
		yield fork(moveItem, reorderedList);

		// then save re-ordered list to the server
		yield call(saveEventsList, reorderedList);

		// after the new list was saved start to watch for errors
		yield take(MOVE_ITEM_ERROR);
	}
}

export default dndWatcher;
