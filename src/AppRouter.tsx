import { Routes, Route } from "react-router-dom";
import { MovieDetails } from "./ui/MovieDetails/MovieDetails";
import { FavoritePage } from "./ui/FavoritePage/FavoritePage";
import { AppContent } from "./AppContent";
import { Provider } from "react-redux";
import { store } from "./Redux/store/store";

export const AppRouter = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Routes>
    </Provider>
  );
};
