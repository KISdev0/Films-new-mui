import { useEffect, useState } from "react";
import { MovieProps } from "../types";

export const useRequetsMovieDetails = (id: string | undefined) => {
  const [movie, setMovie] = useState<MovieProps>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const requetsMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.nomoreparties.co/beatfilm-movies/${id}`
        );
        const data = await response.json();

        setMovie({
          id: data.id,
          title: data.nameRU,
          posterUrl: `https://api.nomoreparties.co${data.image.url}`,
          year: +data.year,
          description: data.description,
          duration: data.duration,
          country: data.country,
        });
      } catch (err) {
        setError((err as Error).message);
        console.error("Ошибка:", err);
      } finally {
        setLoading(false);
      }
    };
    requetsMovieDetails();
  }, [id]);

  return { movie, loading, error };
};
