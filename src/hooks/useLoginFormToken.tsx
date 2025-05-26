import { useCallback, useState } from "react";
import { LoginFormTokenProps } from "../types";
import { EMAIL_REGEX } from "../consts";

export const useLoginFormToken = ({
  onClose,
  onLogin,
}: LoginFormTokenProps) => {
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [errors, setErrors] = useState<string>("");
  const [step, setStep] = useState<"request" | "verify">("request");
  const [loading, setLoading] = useState(false);

  const reset = useCallback(() => {
    setEmail("");
    setToken("");
    setErrors("");
    setStep("request");
  }, []);

  const handleRequestToken = useCallback(async () => {
    if (!email.trim() || !EMAIL_REGEX.test(email.trim())) {
      setErrors("Введите корректный email");
      return;
    }
    setLoading(true);
    setErrors("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStep("verify");
    } catch (error) {
      setErrors(`Ошибка:${error}`);
    } finally {
      setLoading(false);
    }
  }, [email]);

  const handleVerifyToken = useCallback(() => {
    if (!token.trim()) {
      setErrors("Введите токен");
      return;
    }
    onLogin(token);
    onClose();
  }, [token, onLogin, onClose]);

  return {
    email,
    setEmail,
    token,
    setToken,
    errors,
    step,
    loading,
    reset,
    handleRequestToken,
    handleVerifyToken,
  };
};
