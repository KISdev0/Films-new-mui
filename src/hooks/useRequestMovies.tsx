import { useEffect, useState } from "react";
import { ApiMovie, MovieProps } from "../types";

export const useRequestMovies = () => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const requestMovies = async () => {
      try {
        const response = await fetch(
          "https://api.nomoreparties.co/beatfilm-movies"
        );
        if (!response.ok) {
          throw new Error("Ошибка загрузки фильмов");
        }

        const data: ApiMovie[] = await response.json();

        const transformedData = data.map((movie) => ({
          id: movie.id,
          title: movie.nameRU,
          posterUrl: `https://api.nomoreparties.co/${movie.image.url}`,
          year: +movie.year,
        }));

        setMovies(transformedData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    requestMovies();
  }, []);
  return { movies, loading, error };
};
