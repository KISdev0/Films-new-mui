import { ReactNode } from "react";

export interface StateType {
  sortBy: string;
  yearRange: number[];
  selectedGenres: Array<{ title: string }>;
  search: string;
}

export type ActionType =
  | { type: "SET_SORT_BY"; payload: string }
  | { type: "SET_YEAR"; payload: number[] }
  | { type: "SET_GENRE"; payload: Array<{ title: string }> }
  | { type: "RESET-FILTERS" }
  | { type: "SET_SEARCH"; payload: string };

export interface LoginFormProps {
  onClose: () => void;
}

export interface LoginFormTokenProps {
  onClose: () => void;
  onLogin: (token: string) => void;
}

export interface SelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
  placeholder?: string;
}

export interface UserData {
  id?: number;
  username?: string;
  email?: string;
}

export type AuthProviderProps = {
  children: ReactNode;
};

export interface AuthContextType {
  user: UserData | null;
  isAuth: boolean;
  login: (userData: UserData, token: string) => Promise<boolean>;
  logoutHandler: () => void;
  token: string | null;
}

export interface MovieCardProps {
  movie: MovieProps;
}

export interface MovieProps {
  id: number;
  title: string;
  posterUrl: string;
  year: number;
  description?: string;
  duration?: number;
  country?: string;
}

export interface ApiMovie {
  id: number;
  nameRU: string;
  year: string;
  image: {
    url: string;
  };
}

export interface FiltersProps {
  initialYearRange: [number, number];
  onFilterChange: (filters: NewFilterProps) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface NewFilterProps {
  yearRange: [number, number];
  search?: string;
}

export interface useFilteredMoviesProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  paginatedMovies: MovieProps[];
}

export interface FavoriteContextProps {
  favorite: number[];
  toggleFavorite: (movieId: number) => void;
  justAdded?: boolean;
  error?: string | null;
  clearError?: () => void;
}
