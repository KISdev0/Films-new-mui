import { AuthState } from "./Redux/types";
import { AuthContextType, FavoriteContextProps, NewFilterProps } from "./types";

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

export const DEFAULT_FAVORITE_CONTEXT: FavoriteContextProps = {
  favorite: [],
  toggleFavorite: () => console.warn("this is DEFAULT_FAVORITE_CONTEXT"),
};

export const DEFAULT_AUTH_CONTEXT: AuthContextType = {
  user: null,
  isAuth: false,
  login: async () => false,
  logoutHandler: () => {},
  token: null,
};

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
