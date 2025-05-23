import { useEffect, useState } from "react";
import { MovieProps, NewFilterProps } from "../types";
import { MOVIES_ON_PAGE } from "../consts";

export const useFilteredMovies = (
  movies: MovieProps[],
  filters: NewFilterProps
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredMovies, setFilteredMovies] = useState<MovieProps[]>([]);

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
  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedMovies,
  };
};
