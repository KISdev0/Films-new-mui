import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../AuthContext";
import styles from "./LoginForm.module.css";
import { LoginFormProps } from "../../types";

export const LoginForm = ({ onClose }: LoginFormProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { username?: string; password?: string } = {};
    if (!username.trim()) {
      newErrors.username = "Введите имя пользователя";
    }
    if (!password.trim()) {
      newErrors.password = "Введите пароль";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setUsername("");
      setPassword("");
      return;
    }

    try {
      setSuccessMessage("Вы авторизировались");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      login({ username }, "token");

      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      setErrors({ password: ` Ошибка авторизации, ${error}` });
      setSuccessMessage(null);
    }
  };

  return (
    <div className={styles.authForm}>
      <h2>
        Вход{" "}
        <button onClick={onClose} className={styles.btnClose}>
          X
        </button>
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Имя пользователя:</label>
          <input
            id="username"
            type="text"
            value={username}
            className={errors.username ? styles.errors_username : ""}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={errors.username ? errors.username : ""}
          />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            id="password"
            type="password"
            value={password}
            className={errors.password ? styles.errors_password : ""}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={errors.password ? errors.password : ""}
          />
        </div>
        <button className={styles.btnLogin} type="submit">
          Войти
        </button>
      </form>
      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}
    </div>
  );
};
