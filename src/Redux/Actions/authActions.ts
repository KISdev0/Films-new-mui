import { UserData } from "../../types";
import { AuthActionTypes } from "../types";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const INIT_AUTH = "INIT_AUTH";

export const loginSuccess = (
  user: UserData,
  token: string
): AuthActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: { user, token },
});

export const logout = (): AuthActionTypes => ({
  type: LOGOUT,
});

export const initialAuth = (): AuthActionTypes => ({
  type: INIT_AUTH,
});
