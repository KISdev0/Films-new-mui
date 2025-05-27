import { useContext } from "react";
import { useRequestMovies } from "./hooks/useRequestMovies";
import { AuthContext } from "./Context/AuthContext";
import { useChangeFilter } from "./hooks/useChangeFilter";
import { useFilteredMovies } from "./hooks/useFilteredMovies";
import { Header } from "./ui/Header/Header";
import { Filters } from "./ui/Filters/Filters";
import Pagination from "./ui/Pagination/Pagination";
import { MovieCard } from "./ui/MovieCard/MovieCard";
import styles from "./App.module.css";

export function AppContent() {
  const { movies, loading, error } = useRequestMovies();
  const { isAuth } = useContext(AuthContext);
  const { handleChangeFilter, filters } = useChangeFilter();
  const { currentPage, setCurrentPage, totalPages, paginatedMovies } =
    useFilteredMovies(movies, filters);

  return (
    <div className={styles.page}>
      <Header />
      {isAuth && (
        <div className={styles.mainPage}>
          <div>
            <Filters
              initialYearRange={filters.yearRange}
              onFilterChange={handleChangeFilter}
            />
            <Pagination
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
          {loading && <div>Загрузка...</div>}
          {error && <div>Ошибка:{error}</div>}
          <div className={styles.moviesContainer}>
            <div className={styles.moviesList}>
              {paginatedMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
