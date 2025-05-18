import { Filters } from "./ui/Filters/Filters";
import { Header } from "./ui/Header/Header";
import Pagination from "./ui/Pagination/Pagination";
import styles from "./App.module.css";
import { AuthProvider } from "./AuthContext";
import { MovieCard } from "./ui/MovieCard/MovieCard";
import { useCallback, useEffect, useState } from "react";
import { ApiMovie, MovieProps, NewFilterProps } from "./types";
import { MOVIES_ON_PAGE } from "./consts";

function App() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [filteredMovies, setFilteredMovies] = useState<MovieProps[]>([]);
  const [filters, setFilters] = useState({
    yearRange: [1950, new Date().getFullYear()] as [number, number],
  });
  const [currentPage, setCurrentPage] = useState(1);

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
        setFilteredMovies(transformedData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    requestMovies();
  }, []);

  useEffect(() => {
    const [minYear, maxYear] = filters.yearRange;
    const filtered = movies.filter(
      (movie) => movie.year >= minYear && movie.year <= maxYear
    );
    setFilteredMovies(filtered);
    setCurrentPage(1);
  }, [filters, movies]);

  const totalPages = Math.ceil(filteredMovies.length / MOVIES_ON_PAGE);
  const startIndex = (currentPage - 1) * MOVIES_ON_PAGE;
  const paginatedMovies = filteredMovies.slice(
    startIndex,
    startIndex + MOVIES_ON_PAGE
  );

  const handleChangeFilter = useCallback(
    (newFilters: NewFilterProps) =>
      setFilters((prev) =>
        prev.yearRange[0] === newFilters.yearRange[0] &&
        prev.yearRange[1] === newFilters.yearRange[1]
          ? prev
          : newFilters
      ),
    []
  );

  return (
    <AuthProvider>
      <div className={styles.page}>
        <Header />
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
      </div>
    </AuthProvider>
  );
}

export default App;
