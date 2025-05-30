import { FAVORITE_ACTION } from "../../consts";
import { FavoriteActionTypes } from "../types";

export const toggleFavoriteSuccess = (
  newFavorite: number[],
  isAdding: boolean
): FavoriteActionTypes => ({
  type: FAVORITE_ACTION.TOGGLE_FAVORITE_SUCCESS,
  payload: { newFavorite, isAdding },
});
export const toggleFavoriteFail = (error: string): FavoriteActionTypes => ({
  type: FAVORITE_ACTION.TOGGLE_FAVORITE_FAIL,
  payload: error,
});
export const clearJustAdded = (): FavoriteActionTypes => ({
  type: FAVORITE_ACTION.CLEAR_JUST_ADDED,
});
export const clearError = (): FavoriteActionTypes => ({
  type: FAVORITE_ACTION.CLEAR_ERROR,
});
