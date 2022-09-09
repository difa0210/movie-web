import { INSERT_MOVIE } from "../constants";

const reducer = (state = { items: null }, action) => {
  switch (action.type) {
    case INSERT_MOVIE:
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export default reducer;
