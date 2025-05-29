import { useCallback, useEffect } from "react";
import { UserData } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, DispatchType, RootState } from "../Redux/types";
import {
  loginSuccess,
  logout,
  initialAuth,
} from "../Redux/Actions/authActions";

export const useAuth = () => {
  const dispatch = useDispatch<DispatchType>();
  const { user, token, isAuth } = useSelector<RootState, AuthState>(
    (state) => state.auth
  );

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

      if (storedUser && storedToken) {
        try {
          const isValid = await verifyToken(storedToken);
          if (isValid) {
            dispatch(loginSuccess(JSON.parse(storedUser), storedToken));
          } else {
            dispatch(logout());
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        dispatch(initialAuth());
      }
    };
    initAuth();
  }, [dispatch, verifyToken]);

  const login = useCallback(
    async (userData: UserData, authToken: string) => {
      try {
        const isValid = await verifyToken(authToken);
        if (!isValid) {
          throw new Error("Invalid token");
        }

        dispatch(loginSuccess(userData, authToken));
        return true;
      } catch (error) {
        console.error("Login failed:", error);
        return false;
      }
    },
    [dispatch, verifyToken]
  );

  const logoutHandler = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return { user, token, isAuth, login, logoutHandler, verifyToken };
};
