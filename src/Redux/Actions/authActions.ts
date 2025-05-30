import { AUTH_ACTION } from "../../consts";
import { UserData } from "../../types";
import { AuthActionTypes } from "../types";

export const loginSuccess = (
  user: UserData,
  token: string
): AuthActionTypes => ({
  type: AUTH_ACTION.LOGIN_SUCCESS,
  payload: { user, token },
});

export const loginFail = (error: string): AuthActionTypes => ({
  type: AUTH_ACTION.LOGIN_FAIL,
  payload: error,
});

export const logout = (): AuthActionTypes => ({
  type: AUTH_ACTION.LOGOUT,
});

export const initialAuth = (): AuthActionTypes => ({
  type: AUTH_ACTION.INIT_AUTH,
});
