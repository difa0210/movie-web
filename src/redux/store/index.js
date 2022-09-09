import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import { createLogger } from "redux-logger";
import rootReducer from "../reducers";

// const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
