import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FavoriteContextProps } from "../types";
import { DEFAULT_FAVORITE_CONTEXT } from "../consts";

export const FavoriteContext = createContext<FavoriteContextProps>(
  DEFAULT_FAVORITE_CONTEXT
);
const getSavedFavorite = () => {
  try {
    const saved = localStorage.getItem("favorite");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Ошибка:", error);
    return [];
  }
};
export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorite, setFavorite] = useState<number[]>(getSavedFavorite());
  const [justAdded, setJustAdded] = useState(false);

  const toggleFavorite = useCallback((movieId: number) => {
    setFavorite((prev) => {
      const isAdding = !prev.includes(movieId);
      const newFavorite = isAdding
        ? [...prev, movieId]
        : prev.filter((id) => id !== movieId);

      localStorage.setItem("favorite", JSON.stringify(newFavorite));

      if (isAdding) {
        setJustAdded(true);
      }

      return newFavorite;
    });
  }, []);

  useEffect(() => {
    if (justAdded) {
      const timeout = setTimeout(() => {
        setJustAdded(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [justAdded]);

  return (
    <FavoriteContext.Provider value={{ favorite, toggleFavorite, justAdded }}>
      {children}
    </FavoriteContext.Provider>
  );
};
