import { UserData } from "../../types";
import { loginFail, loginSuccess, logout } from "../reducers/authSlice";
import { AppThunk } from "../store/store";

export const initAuthThunk = (): AppThunk => (dispatch) => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  if (storedUser && storedToken) {
    try {
      const isValid = true;
      if (isValid) {
        dispatch(
          loginSuccess({ user: JSON.parse(storedUser), token: storedToken })
        );
      } else {
        dispatch(logout());
      }
    } catch (err) {
      console.error("Ошибка аутентификации:", err);
    }
  }
};

export const loginThunk =
  (userData: UserData, authToken: string): AppThunk =>
  async (dispatch) => {
    {
      try {
        const isValid = true;
        if (!isValid) {
          throw new Error("Invalid token");
        }

        dispatch(loginSuccess({ user: userData, token: authToken }));
        return true;
      } catch (err) {
        dispatch(loginFail(`Login failed:${err}`));
        return false;
      }
    }
  };
