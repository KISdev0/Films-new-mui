import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavoriteState } from "../types";

export const getSavedFavorite = () => {
  try {
    const saved = localStorage.getItem("favorite");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Ошибка:", error);
    return [];
  }
};

const INITIAL_STATE_FAVORITE_REDUCER: FavoriteState = {
  favoriteIds: getSavedFavorite(),
  justAdded: false,
  error: null,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: INITIAL_STATE_FAVORITE_REDUCER,
  reducers: {
    toggleFavoriteSuccess(
      state: FavoriteState,
      action: PayloadAction<{ newFavorite: number[]; isAdding: boolean }>
    ) {
      state.favoriteIds = action.payload.newFavorite;
      state.justAdded = action.payload.isAdding;
      state.error = null;
    },
    toggleFavoriteFail(state: FavoriteState, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearJustAdded(state: FavoriteState) {
      state.justAdded = false;
    },
    clearError(state: FavoriteState) {
      state.error = null;
    },
  },
});

export const {
  toggleFavoriteSuccess,
  toggleFavoriteFail,
  clearJustAdded,
  clearError,
} = favoriteSlice.actions;
export default favoriteSlice.reducer;
