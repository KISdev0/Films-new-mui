import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("empty Auth context");
  }
  return context;
};
