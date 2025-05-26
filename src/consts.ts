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
export const MAX_VISIBLE_PAGES = 5