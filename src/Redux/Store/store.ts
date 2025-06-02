import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import favoriteReducer from "../reducers/favoriteSlice";
import authReducer from "../reducers/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorite: favoriteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
