import { Routes, Route } from "react-router-dom";
import { MovieDetails } from "./ui/MovieDetails/MovieDetails";
import { FavoritePage } from "./ui/FavoritePage/FavoritePage";
import { FavoriteProvider } from "./Context/FavoriteContext";
import { AppContent } from "./AppContent";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/store";

export const AppRouter = () => {
  return (
    <Provider store={store}>
      <FavoriteProvider>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/favorite" element={<FavoritePage />} />
        </Routes>
      </FavoriteProvider>
    </Provider>
  );
};
