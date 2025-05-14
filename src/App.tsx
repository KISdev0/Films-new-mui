import { Filters } from "./ui/Filters/Filters";
import { Header } from "./ui/Header/Header";
import Pagination from "./ui/Pagination/Pagination";
import styles from "./App.module.css";
import { AuthProvider } from "./AuthContext";
import { MovieCard } from "./ui/MovieCard/MovieCard";
import { terminator } from "./movies";

function App() {
  return (
    <AuthProvider>
      <div className={styles.page}>
        <Header />
        <div className={styles.mainPage}>
          <Filters />
          <Pagination />
          <MovieCard movie={terminator} />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
