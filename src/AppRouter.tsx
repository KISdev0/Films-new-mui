import { Routes, Route } from "react-router-dom";
import App from "./App";
import { MovieDetails } from "./ui/MovieDetails/MovieDetails";
import { FavoritePage } from "./ui/FavoritePage/FavoritePage";
import { AuthProvider } from "./Context/AuthContext";
import { FavoriteProvider } from "./Context/FavoriteContext";

export const AppRouter = () => {
  return (
    <AuthProvider>
      <FavoriteProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/favorite" element={<FavoritePage />} />
        </Routes>
      </FavoriteProvider>
    </AuthProvider>
  );
};
