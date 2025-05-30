import { useCallback } from "react";
import { UserData } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AuthActionTypes, AuthState } from "../Redux/types";
import { logout } from "../Redux/actions/authActions";
import { AppDispatch, RootState } from "../Redux/store/store";
import { ThunkDispatch } from "redux-thunk";
import { initAuthThunk, loginThunk } from "../Redux/thunks/authThunk";

export const useAuth = () => {
  const dispatch: ThunkDispatch<RootState, unknown, AuthActionTypes> =
    useDispatch<AppDispatch>();
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
