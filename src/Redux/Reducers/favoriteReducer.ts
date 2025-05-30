import { FAVORITE_ACTION, INITIAL_STATE_FAVORITE_REDUCER } from "../../consts";
import { FavoriteActionTypes, FavoriteState } from "../types";

export const getSavedFavorite = () => {
  try {
    const saved = localStorage.getItem("favorite");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Ошибка:", error);
    return [];
  }
};

export const favoriteReducer = (
  state = INITIAL_STATE_FAVORITE_REDUCER,
  action: FavoriteActionTypes
): FavoriteState => {
  switch (action.type) {
    case FAVORITE_ACTION.TOGGLE_FAVORITE_SUCCESS:
      return {
        ...state,
        favoriteId: action.payload.newFavorite,
        justAdded: action.payload.isAdding,
        error: null,
      };
    case FAVORITE_ACTION.TOGGLE_FAVORITE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case FAVORITE_ACTION.CLEAR_JUST_ADDED:
      return {
        ...state,
        justAdded: false,
      };
    case FAVORITE_ACTION.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
