import { useContext } from "react";
import { FavoriteContext } from "../Context/FavoriteContext";

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("empty context");
  }
  return context;
};
