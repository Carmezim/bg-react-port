import {
	call,
	fork,
	put,
	take,
	cancel,
	cancelled,
	takeEvery,
	takeLatest
} from "redux-saga/effects";
import ParseService from "../services/parseAPI";

// import DnD action types
import {
	MOVE_ITEM_REQUEST,
	MOVE_ITEM_SUCCESS,
	MOVE_ITEM_ERROR,
	FETCH_LIST,
	FETCH_LIST_SUCCESS,
	FETCH_LIST_ERROR
} from "./actionTypes";

// Fetch current list to populate list when initializing
function* fetchEventsList() {
	const events = yield ParseService.loadEvents();
	console.log("events fetched: ", events);
	return events;
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
		yield put({ type: MOVE_ITEM_SUCCESS, reorderedList });

		// continues to watch for requests
		yield call(dndWatcher);
	} catch (error) {
		yield put({ type: MOVE_ITEM_ERROR, error });
	}
}
// Populates events initial state
function* loadEventsFlow() {
	try {
		// Fetch the current events stored on the backend
		const events = yield call(fetchEventsList);

		console.log("laod data flow", events);
		// Populate list state with fetched data and
		// inform Redux fetching action completed successfully
		yield put({ type: FETCH_LIST_SUCCESS, events });
	} catch (error) {
		yield put({ type: FETCH_LIST_ERROR, errors: error });
	} finally {
		if (yield cancelled()) {
			// handle cancelled if needed
		}
	}
}

function* loadEvents(){
	const populateInitState = yield fork(loadEventsFlow);

	yield take(FETCH_LIST_SUCCESS);

	yield cancel(populateInitState);
}

// watch drag and drop actions
function* dndWatcher() {
	while (true) {
		// Fetch list on database and update the list
		// state calling 'fetchListFlow'
		// then handle retrieving DnD move actions requests data
		// by watching whenever an item is dragged
		// and taking all the data sent on the action when it happens

		// Listen to FETCH_LIST action dispatched when dashboard component
		// finishes mounting and starts events flow that populates the
		// app initial state with data from the backend
		yield takeLatest(FETCH_LIST, loadEvents);

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
