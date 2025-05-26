import { Routes, Route } from "react-router-dom";
import App from "./App";
import { MovieDetails } from "./ui/MovieDetails/MovieDetails";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
    </Routes>
  );
};
