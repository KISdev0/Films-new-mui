import { UserData } from "../types";
import { LOGIN_SUCCESS, LOGOUT, INIT_AUTH } from "./Actions/authActions";
import { rootReducer, store } from "./Store/store";

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: {
    user: UserData;
    token: string;
  };
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export interface InitAuthAction {
  type: typeof INIT_AUTH;
}

export type AuthActionTypes =
  | LoginSuccessAction
  | LogoutAction
  | InitAuthAction;

export type RootState = ReturnType<typeof rootReducer>;

export interface AuthState {
  user: UserData | null;
  token: string | null;
  isAuth: boolean;
}

export type DispatchType = typeof store.dispatch;
