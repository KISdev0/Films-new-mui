import { useContext, useState } from "react";
import styles from "./Header.module.css";
import { AuthContext } from "../../AuthContext";
import { LoginForm } from "../LoginForm/LoginForm";

export const Header = () => {
  const { isAuth, logout } = useContext(AuthContext);
  const [showLoginForm, setShowLoginForm] = useState(false);
  return (
    <header className={styles.header}>
      <p>Фильмы</p>
      {!isAuth ? (
        <div>
          <button
            className={styles.headerButton}
            onClick={() => setShowLoginForm(true)}
          >
            Войти
          </button>
          {showLoginForm && (
            <LoginForm onClose={() => setShowLoginForm(false)} />
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
