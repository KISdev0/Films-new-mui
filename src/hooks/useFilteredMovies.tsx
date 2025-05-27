import { useEffect, useState } from "react";
import { MovieProps, NewFilterProps, useFilteredMoviesProps } from "../types";
import { MOVIES_ON_PAGE } from "../consts";

export const useFilteredMovies = (
  movies: MovieProps[],
  filters: NewFilterProps
): useFilteredMoviesProps => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredMovies, setFilteredMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    const [minYear, maxYear] = filters.yearRange;
    const filtered = movies.filter((movie) => {
      const yearMatch = movie.year >= minYear && movie.year <= maxYear;

      const titleMatch = filters.search
        ? movie.title.toLowerCase().includes(filters.search.toLowerCase())
        : true;

      return yearMatch && titleMatch;
    });
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
