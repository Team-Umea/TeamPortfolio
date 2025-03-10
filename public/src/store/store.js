import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import verifyAuth from "./middleware/authMiddleware";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(verifyAuth),
});

export default store;
