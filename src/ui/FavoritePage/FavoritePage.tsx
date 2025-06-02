import React from "react";
import { useFavorite } from "../../hooks/useFavorite";
import { useRequestMovies } from "../../hooks/useRequestMovies";
import { MovieCard } from "../MovieCard/MovieCard";
import styles from "./FavoritePage.module.css";
import { useNavigate } from "react-router-dom";

export const FavoritePage: React.FC = () => {
  const navigate = useNavigate();
  const { favoriteIds } = useFavorite();
  const { movies } = useRequestMovies();

  const favoriteMovies = movies.filter((movie) =>
    favoriteIds.includes(movie.id)
  );

  return (
    <div className={styles.page}>
      <h1>Избранное</h1>
      <button onClick={() => navigate(-1)} className={styles.buttonBack}>
        Назад
      </button>
      {favoriteIds.length > 0 ? (
        <div className={styles.moviesContainer}>
          <div className={styles.moviesList}>
            {favoriteMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      ) : (
        <p>В избранном пусто</p>
      )}
    </div>
  );
};
