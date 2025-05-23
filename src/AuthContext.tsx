import { createContext, useCallback, useEffect, useState } from "react";
import { AuthContextType, AuthProviderProps, UserData } from "./types";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const isAuth = !!token;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const verifyToken = useCallback(async (_token: string): Promise<boolean> => {
    try {
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken)
        try {
          const isValid = await verifyToken(storedToken);
          if (isValid) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        } catch (error) {
          console.log(error);
        }
    };
    initAuth();
  }, [verifyToken]);

  const login = useCallback(
    async (userData: UserData, authToken: string) => {
      try {
        const isValid = await verifyToken(authToken);
        if (!isValid) {
          throw new Error("Invalid token");
        }

        setUser(userData);
        setToken(authToken);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", authToken);
        return true;
      } catch (error) {
        console.error("Login failed:", error);
        return false;
      }
    },
    [verifyToken]
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
