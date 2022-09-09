import { combineReducers } from "redux";
import userReducer from "./user";
import movieReducer from "./movie";

const rootReducer = combineReducers({
  user: userReducer,
  movie: movieReducer,
});

export default rootReducer;
