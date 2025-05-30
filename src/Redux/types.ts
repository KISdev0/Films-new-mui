import { AUTH_ACTION, FAVORITE_ACTION } from "../consts";
import { UserData } from "../types";

export interface LoginRequestAction {
  type: typeof AUTH_ACTION.LOGIN_REQUEST;
}

export interface LoginSuccessAction {
  type: typeof AUTH_ACTION.LOGIN_SUCCESS;
  payload: {
    user: UserData;
    token: string;
  };
}

export interface LoginFailAction {
  type: typeof AUTH_ACTION.LOGIN_FAIL;
  payload: string;
}

export interface LogoutAction {
  type: typeof AUTH_ACTION.LOGOUT;
}

export interface InitAuthAction {
  type: typeof AUTH_ACTION.INIT_AUTH;
}

export type AuthActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutAction
  | InitAuthAction;

export interface AuthState {
  user: UserData | null;
  token: string | null;
  isAuth: boolean;
}

export interface FavoriteState {
  favoriteId: number[];
  justAdded: boolean;
  error: string | null;
}

export interface toggleFavoriteSuccessAction {
  type: typeof FAVORITE_ACTION.TOGGLE_FAVORITE_SUCCESS;
  payload: { newFavorite: number[]; isAdding: boolean };
}
export interface toggleFavoriteFailAction {
  type: typeof FAVORITE_ACTION.TOGGLE_FAVORITE_FAIL;
  payload: string;
}
export interface clearFustAddedAction {
  type: typeof FAVORITE_ACTION.CLEAR_JUST_ADDED;
}
export interface clearErrorAction {
  type: typeof FAVORITE_ACTION.CLEAR_ERROR;
}

export type FavoriteActionTypes =
  | toggleFavoriteSuccessAction
  | toggleFavoriteFailAction
  | clearFustAddedAction
  | clearErrorAction;
