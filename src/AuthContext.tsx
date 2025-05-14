import { createContext, useEffect, useState } from "react";
import { AuthContextType, AuthProviderProps, UserData } from "./types";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const isAuth = !!token && !!user;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken)
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (error) {
        console.log(error);
      }
  }, []);

  const login = (userData: UserData, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", authToken);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setUser(null);

    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
