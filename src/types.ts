import { ReactNode } from "react";

export interface StateType {
  sortBy: string;
  year: number[];
  selectedGenres: Array<{ title: string }>;
}

export type ActionType =
  | { type: "SET_SORT_BY"; payload: string }
  | { type: "SET_YEAR"; payload: number[] }
  | { type: "SET_GENRE"; payload: Array<{ title: string }> }
  | { type: "RESET-FILTERS" };

export interface LoginFormProps {
  onClose: () => void;
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
  username: string;
  email?: string;
}

export type AuthProviderProps = {
  children: ReactNode;
};

export interface AuthContextType {
  user: UserData | null;
  isAuth: boolean;
  login: (userData: UserData, token: string) => void;
  logout: () => void;
  token: string | null;
}

export interface MovieCardProps {
  movie: MovieProps;
}

export interface MovieProps {
  id: string;
  title: string;
  posterUrl: string;
  rating: number;
}
