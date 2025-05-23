import { useState } from "react";
import { LoginFormTokenProps } from "../types";

export const useLoginFormToken = ({
  onClose,
  onLogin,
}: LoginFormTokenProps) => {
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [errors, setErrors] = useState<string>("");
  const [step, setStep] = useState<"request" | "verify">("request");
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setEmail("");
    setToken("");
    setErrors("");
    setStep("request");
  };

  const handleRequestToken = async () => {
    if (!email.trim()) {
      setErrors("Введите email");
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
  };

  const handleVerifyToken = () => {
    if (!token.trim()) {
      setErrors("Введите токен");
      return;
    }
    onLogin(token);
    onClose();
  };

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
