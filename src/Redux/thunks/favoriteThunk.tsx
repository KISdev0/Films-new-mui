import { ThunkDispatch } from "redux-thunk";
import {
  toggleFavoriteFail,
  toggleFavoriteSuccess,
} from "../actions/favoriteActions";
import { RootState } from "../store/store";
import { FavoriteActionTypes } from "../types";

const savedFavorite = async (favorite: number[]) => {
  try {
    if (Math.random() < 0.3) {
      throw new Error("Рандом ошибка для теста");
    }
    localStorage.setItem("favorite", JSON.stringify(favorite));
    return true;
  } catch (err) {
    console.error("Ошибка:", err);
    return false;
  }
};

export const favoriteThunk = (movieId: number) => {
  return async (
    dispatch: ThunkDispatch<RootState, unknown, FavoriteActionTypes>,
    getState: () => RootState
  ) => {
    const { favoriteId } = getState().favorite;
    const isAdding = !favoriteId.includes(movieId);
    const newFavorite = isAdding
      ? [...favoriteId, movieId]
      : favoriteId.filter((id) => id !== movieId);

    try {
      const success = await savedFavorite(newFavorite);
      if (success) {
        dispatch(toggleFavoriteSuccess(newFavorite, isAdding));
      } else {
        dispatch(toggleFavoriteFail("Рандом ошибка для теста"));
      }
    } catch (err) {
      dispatch(toggleFavoriteFail(`Ошибка при сохранении:${err}`));
    }
  };
};
