import { ThunkDispatch } from "redux-thunk";
import {
  initialAuth,
  loginFail,
  loginSuccess,
  logout,
} from "../actions/authActions";
import { RootState } from "../store/store";
import { AuthActionTypes } from "../types";
import { UserData } from "../../types";

export const initAuthThunk = () => {
  return async (
    dispatch: ThunkDispatch<RootState, unknown, AuthActionTypes>
  ) => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        const isValid = true;
        if (isValid) {
          dispatch(loginSuccess(JSON.parse(storedUser), storedToken));
        } else {
          dispatch(logout());
        }
      } catch (err) {
        console.error("Ошибка аутентификации:", err);
      }
    } else {
      dispatch(initialAuth());
    }
  };
};

export const loginThunk = (userData: UserData, authToken: string) => {
  return async (
    dispatch: ThunkDispatch<RootState, unknown, AuthActionTypes>
  ) => {
    try {
      const isValid = true;
      if (!isValid) {
        throw new Error("Invalid token");
      }

      dispatch(loginSuccess(userData, authToken));
      return true;
    } catch (err) {
      dispatch(loginFail(`Login failed:${err}`));
      return false;
    }
  };
};
