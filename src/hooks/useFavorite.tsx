import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store/store";
import { FavoriteState } from "../Redux/types";
import { useCallback, useEffect } from "react";
import { favoriteThunk } from "../Redux/thunks/favoriteThunk";
import { clearError, clearJustAdded } from "../Redux/reducers/favoriteSlice";

export const useFavorite = () => {
  const dispatch: AppDispatch = useDispatch();
  const { favoriteIds, justAdded, error } = useSelector<
    RootState,
    FavoriteState
  >((state) => state.favorite);

  const handleToggleFavorite = useCallback(
    (movieId: number) => {
      dispatch(favoriteThunk(movieId));
    },
    [dispatch]
  );

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (justAdded) {
      const timeout = setTimeout(() => {
        dispatch(clearJustAdded());
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [justAdded, dispatch]);

  return {
    clearError: handleClearError,
    toggleFavorite: handleToggleFavorite,
    favoriteIds,
    error,
    justAdded,
  };
};
