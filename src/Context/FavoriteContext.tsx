import { createContext, ReactNode, useCallback, useState } from "react";
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

  const toggleFavorite = useCallback((movieId: number) => {
    setFavorite((prev) => {
      const newFavorite = prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId];

      localStorage.setItem("favorite", JSON.stringify(newFavorite));
      return newFavorite;
    });
  }, []);

  return (
    <FavoriteContext.Provider value={{ favorite, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
