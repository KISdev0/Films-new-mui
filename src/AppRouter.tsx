import { Routes, Route } from "react-router-dom";
import { MovieDetails } from "./ui/MovieDetails/MovieDetails";
import { FavoritePage } from "./ui/FavoritePage/FavoritePage";
import { AuthProvider } from "./Context/AuthContext";
import { FavoriteProvider } from "./Context/FavoriteContext";
import { AppContent } from "./AppContent";

export const AppRouter = () => {
  return (
    <AuthProvider>
      <FavoriteProvider>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/favorite" element={<FavoritePage />} />
        </Routes>
      </FavoriteProvider>
    </AuthProvider>
  );
};
