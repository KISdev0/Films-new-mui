import { useEffect, useState } from "react";
import { MovieProps } from "../types";
import { useParams } from "react-router-dom";

export const useRequetsMovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieProps>();
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error("Ошибка:", error);
      } finally {
        setLoading(false);
      }
    };
    requetsMovieDetails();
  }, [id]);

  return { movie, loading };
};
