import { configureStore, combineReducers } from "@reduxjs/toolkit";
import verifyAuth from "./middleware/authMiddleware";
import authReducer from "./authSlice";
import profileReducer from "./profileSlice";
import contentReducer from "./contentSlice";
import getContent from "./middleware/contentMiddleware";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  content: contentReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(verifyAuth, getContent),
});

export default store;
