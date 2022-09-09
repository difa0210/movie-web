import { LOGIN, LOGOUT } from "../constants";

const reducer = (state = { data: null }, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        data: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("session_id");
      return {
        ...state,
        data: null,
      };

    default:
      return state;
  }
};

export default reducer;
