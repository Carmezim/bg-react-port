import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore, compose } from "redux";
import { persistStore, autoRehydrate } from "redux-persist";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { Router } from "react-router-dom";
import history from "./history";
import registerServiceWorker from "./registerServiceWorker";

// Import parent component
import App from "./App";
import "./index.css";

// Import index reducer and sagas
import IndexReducer from "./index-reducer";
import IndexSagas from "./index.sagas";

// Setup the middleware to watch between the Reducers and the Actions
const sagaMiddleware = createSagaMiddleware();

// IMPORTANT: `composeSetup` is for Redux DevTools Chrome extension
// In case you don't want to use it do comment out the code below
// and replace the `store` by
// const store = createStore(
//   IndexReducer,
//   applyMiddleware(sagaMiddleware)
// )

const composeSetup =
	process.env.NODE_ENV !== "production" &&
	typeof window === "object" &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: compose;

// Create the store
// 'autoRehydrate' is a store enhancer that will automatically shallow merge the persisted state
// for each key. Additionally it queues any actions that are dispatched before rehydration is complete,
// and fires them after rehydration is finished.
const store = createStore(
	IndexReducer,
	composeSetup(applyMiddleware(sagaMiddleware), autoRehydrate()) // allows redux devtools to watch sagas
);

// Begins periodically persisting the store
// Redux-Persist assists in persists the state on browser refresh
persistStore(store);

// Begin Index Saga
sagaMiddleware.run(IndexSagas);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
