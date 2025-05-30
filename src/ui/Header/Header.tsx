import { useState } from "react";
import styles from "./Header.module.css";
import { LoginFormToken } from "../LoginForm/LoginFormToken";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useFavorite } from "../../hooks/useFavorite";

export const Header = () => {
  const { justAdded } = useFavorite();
  const { isAuth, logoutHandler, loginHandler } = useAuth();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <p>Фильмы</p>
      {isAuth && (
        <button
          className={`${styles.favoriteButton} ${
            justAdded ? styles.favoriteBlink : ""
          }`}
          onClick={() => navigate("/favorite")}
        >
          Избранное
        </button>
      )}
      {!isAuth ? (
        <div>
          <button
            className={styles.headerButton}
            onClick={() => setShowLoginForm(true)}
          >
            Войти
          </button>
          {showLoginForm && (
            <LoginFormToken
              onLogin={(token) =>
                loginHandler({ email: "user@example.com" }, token)
              }
              onClose={() => setShowLoginForm(false)}
            />
          )}
        </div>
      ) : (
        <div>
          <button className={styles.headerButton} onClick={logoutHandler}>
            Выйти
          </button>
        </div>
      )}
    </header>
  );
};
