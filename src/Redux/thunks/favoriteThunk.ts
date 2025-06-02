import {
  toggleFavoriteFail,
  toggleFavoriteSuccess,
} from "../reducers/favoriteSlice";
import { AppThunk } from "../store/store";

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

export const favoriteThunk =
  (movieId: number): AppThunk =>
  async (dispatch, getState) => {
    const { favoriteIds } = getState().favorite;
    const isAdding = !favoriteIds.includes(movieId);
    const newFavorite = isAdding
      ? [...favoriteIds, movieId]
      : favoriteIds.filter((id) => id !== movieId);

    try {
      const success = await savedFavorite(newFavorite);
      if (success) {
        dispatch(toggleFavoriteSuccess({ newFavorite, isAdding }));
      } else {
        dispatch(toggleFavoriteFail("Рандом ошибка для теста"));
      }
    } catch (err) {
      dispatch(toggleFavoriteFail(`Ошибка при сохранении:${err}`));
    }
  };
