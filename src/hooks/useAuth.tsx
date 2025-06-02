import { useCallback } from "react";
import { UserData } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AuthState } from "../Redux/types";
import { AppDispatch, RootState } from "../Redux/store/store";
import { initAuthThunk, loginThunk } from "../Redux/thunks/authThunk";
import { logout } from "../Redux/reducers/authSlice";

export const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, token, isAuth } = useSelector<RootState, AuthState>(
    (state) => state.auth
  );

  const initializationAuth = useCallback(() => {
    dispatch(initAuthThunk());
  }, [dispatch]);

  const loginHandler = useCallback(
    (userData: UserData, authToken: string) => {
      dispatch(loginThunk(userData, authToken));
    },
    [dispatch]
  );

  const logoutHandler = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    user,
    token,
    isAuth,
    loginHandler,
    logoutHandler,
    initializationAuth,
  };
};
