import { Filters } from "./ui/Filters/Filters";
import { Header } from "./ui/Header/Header";
import Pagination from "./ui/Pagination/Pagination";
import styles from "./App.module.css";
import { AuthContext, AuthProvider } from "./Context/AuthContext";
import { MovieCard } from "./ui/MovieCard/MovieCard";
import { useContext } from "react";
import { useRequestMovies } from "./hooks/useRequestMovies";
import { useFilteredMovies } from "./hooks/useFilteredMovies";
import { useChangeFilter } from "./hooks/useChangeFilter";
import { FavoriteProvider } from "./Context/FavoriteContext";

function AppContent() {
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

function App() {
  return (
    <AuthProvider>
      <FavoriteProvider>
        <AppContent />
      </FavoriteProvider>
    </AuthProvider>
  );
}

export default App;
