import { getSavedFavorite } from "./Redux/reducers/favoriteReducer";
import { AuthState, FavoriteState } from "./Redux/types";
import { NewFilterProps } from "./types";

export const FILTER_OPTIONS = {
  sortOptions: ["Популярности", "Дате выхода", "Рейтингу"],
  yearOptions: ["2020", "2019", "2018"],
  genres: [{ title: "Комедия" }, { title: "Боевик" }, { title: "Драма" }],
};

export const MOVIES_ON_PAGE = 10;

export const INITIAL_FILTERS_RANGE: NewFilterProps = {
  yearRange: [1950, new Date().getFullYear()],
};

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MAX_VISIBLE_PAGES = 5;

export const INITIAL_FILTERS = {
  sortBy: "",
  yearRange: [1950, new Date().getFullYear()] as [number, number],
  selectedGenres: [] as Array<{ title: string }>,
  search: "",
};

export const INIT_STATE_AUTH_REDUCER: AuthState = {
  user: null,
  token: null,
  isAuth: false,
};

export const AUTH_ACTION = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  LOGOUT: "LOGOUT",
  INIT_AUTH: "INIT_AUTH",
} as const;

export const FAVORITE_ACTION = {
  TOGGLE_FAVORITE_SUCCESS: "TOGGLE_FAVORITE_SUCCESS",
  TOGGLE_FAVORITE_FAIL: "TOGGLE_FAVORITE_FAIL",
  CLEAR_JUST_ADDED: "CLEAR_JUST_ADDED",
  CLEAR_ERROR: "CLEAR_ERROR",
} as const;

export const INITIAL_STATE_FAVORITE_REDUCER: FavoriteState = {
  favoriteId: getSavedFavorite(),
  justAdded: false,
  error: null,
};
