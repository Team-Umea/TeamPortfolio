import { configureStore, combineReducers } from "@reduxjs/toolkit";
import verifyAuth from "./middleware/authMiddleware";
import authReducer from "./authSlice";
import profileReducer from "./profileSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(verifyAuth),
});

export default store;
