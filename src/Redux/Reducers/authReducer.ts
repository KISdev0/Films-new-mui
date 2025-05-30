import { AUTH_ACTION, INIT_STATE_AUTH_REDUCER } from "../../consts";
import { AuthActionTypes, AuthState } from "../types";

export const authReducer = (
  state = INIT_STATE_AUTH_REDUCER,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case AUTH_ACTION.LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuth: true,
        token: action.payload.token,
        user: action.payload.user,
      };

    case AUTH_ACTION.LOGOUT:
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...state,
        isAuth: false,
        token: null,
        user: null,
      };

    case AUTH_ACTION.INIT_AUTH: {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        try {
          return {
            ...state,
            isAuth: true,
            token: storedToken,
            user: JSON.parse(storedUser),
          };
        } catch (err) {
          console.error("Ошибка parse из localStorage:", err);

          localStorage.removeItem("user");
          localStorage.removeItem("token");
          return {
            ...state,
            isAuth: false,
            token: null,
            user: null,
          };
        }
      }
      return state;
    }

    default:
      return state;
  }
};
