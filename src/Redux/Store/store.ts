import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../reducers/authReducer";
import { favoriteReducer } from "../reducers/favoriteReducer";
import { AuthActionTypes, FavoriteActionTypes } from "../types";

export const store = configureStore({
  reducer: {
    auth: (state, action) => authReducer(state, action as AuthActionTypes),
    favorite: (state, action) =>
      favoriteReducer(state, action as FavoriteActionTypes),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
