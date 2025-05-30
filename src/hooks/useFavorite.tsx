import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store/store";
import { FavoriteActionTypes, FavoriteState } from "../Redux/types";
import { useCallback, useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { clearError, clearJustAdded } from "../Redux/actions/favoriteActions";
import { favoriteThunk } from "../Redux/thunks/favoriteThunk";

export const useFavorite = () => {
  const dispatch: ThunkDispatch<RootState, unknown, FavoriteActionTypes> =
    useDispatch();
  const { favoriteId, justAdded, error } = useSelector<
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
    favoriteId,
    error,
    justAdded,
  };
};
