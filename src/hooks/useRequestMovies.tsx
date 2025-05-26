import { useEffect, useState } from "react";
import { ApiMovie, MovieProps } from "../types";

export const useRequestMovies = () => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const requestMovies = async () => {
      try {
        const response = await fetch(
          "https://api.nomoreparties.co/beatfilm-movies",
          { signal }
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
        if (!signal.aborted) {
          setError((err as Error).message);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };
    requestMovies();
    return () => {
      abortController.abort();
    };
  }, []);
  return { movies, loading, error };
};
