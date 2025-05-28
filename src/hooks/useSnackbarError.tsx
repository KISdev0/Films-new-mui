import { useCallback, useEffect, useState } from "react";
import { useFavorite } from "./useFavorite";

export const useSnackbarError = () => {
  const { error, clearError } = useFavorite();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (error && clearError) {
      setSnackbarMessage(error);
      setSnackbarOpen(true);
      clearError();
    }
  }, [error, clearError]);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbarOpen(false);
  }, []);
  return { snackbarMessage, handleCloseSnackbar, snackbarOpen };
};
