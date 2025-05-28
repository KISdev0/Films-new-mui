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

const savedFavorite = async (favorite: number[]) => {
  try {
    if (Math.random() < 0.3) {
      throw new Error("Рандом ошибка для теста");
    }
    localStorage.setItem("favorite", JSON.stringify(favorite));
    return true;
  } catch (err) {
    console.error("Ошибка:", err);
    return false;
  }
};

export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorite, setFavorite] = useState<number[]>(getSavedFavorite());
  const [justAdded, setJustAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleFavorite = useCallback(
    async (movieId: number) => {
      const isAdding = !favorite.includes(movieId);
      const newFavorite = isAdding
        ? [...favorite, movieId]
        : favorite.filter((id) => id !== movieId);

      setFavorite(newFavorite);
      setError(null);

      try {
        if (!(await savedFavorite(newFavorite))) {
          setFavorite(favorite);
          setError("Рандом ошибка для теста");
          return;
        }

        if (isAdding) {
          setJustAdded(true);
        }
      } catch (err) {
        console.error("Ошибка:", err);
        setFavorite(favorite);
      }
    },
    [favorite]
  );

  useEffect(() => {
    if (justAdded) {
      const timeout = setTimeout(() => {
        setJustAdded(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [justAdded]);

  return (
    <FavoriteContext.Provider
      value={{
        favorite,
        toggleFavorite,
        justAdded,
        error,
        clearError: () => setError(null),
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
