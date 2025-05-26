import { createContext, ReactNode, useState } from "react";
import { FavoriteContextProps } from "../types";

export const FavoriteContext = createContext<FavoriteContextProps | null>(null);
export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const saved = localStorage.getItem("favorite");
  const [favorite, setFavorite] = useState<number[]>(
    saved ? JSON.parse(saved) : []
  );

  const toggleFavorite = (movieId: number) => {
    setFavorite((prev) => {
      const newFavorite = prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId];

      localStorage.setItem("favorite", JSON.stringify(newFavorite));
      return newFavorite;
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorite, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
