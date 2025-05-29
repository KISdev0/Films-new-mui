import { createStore, combineReducers } from "redux";
import { authReducer } from "../Reducers/authReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = createStore(rootReducer);
