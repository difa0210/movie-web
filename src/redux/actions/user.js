import { LOGIN, LOGOUT } from "../constants";

const login = (user) => ({
  type: LOGIN,
  payload: user,
});

const logout = () => ({
  type: LOGOUT,
});

export { login, logout };
