import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INIT_STATE_AUTH_REDUCER } from "../../consts";
import { AuthState } from "../types";
import { UserData } from "../../types";

const authSlice = createSlice({
  name: "auth",
  initialState: INIT_STATE_AUTH_REDUCER,
  reducers: {
    loginSuccess(
      state: AuthState,
      action: PayloadAction<{ user: UserData; token: string }>
    ) {
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      state.isAuth = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    loginFail(state: AuthState, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    logout(state: AuthState) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.isAuth = false;
      state.token = null;
      state.user = null;
    },
    initAuth(state: AuthState) {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        try {
          state.isAuth = true;
          state.token = storedToken;
          state.user = JSON.parse(storedUser);
        } catch (err) {
          console.error("Ошибка аутентификации:", err);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          state.isAuth = false;
          state.token = null;
          state.user = null;
        }
      }
    },
  },
});

export const { loginSuccess, loginFail, logout, initAuth } = authSlice.actions;
export default authSlice.reducer;
