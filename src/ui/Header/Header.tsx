import { useContext, useState } from "react";
import styles from "./Header.module.css";
import { AuthContext } from "../../Context/AuthContext";
import { LoginFormToken } from "../LoginForm/LoginFormToken";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { isAuth, logout, login } = useContext(AuthContext);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <p>Фильмы</p>
      {isAuth && (
        <button
          className={styles.favoriteButton}
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
              onLogin={(token) => login({ email: "user@example.com" }, token)}
              onClose={() => setShowLoginForm(false)}
            />
          )}
        </div>
      ) : (
        <div>
          <button className={styles.headerButton} onClick={logout}>
            Выйти
          </button>
        </div>
      )}
    </header>
  );
};
