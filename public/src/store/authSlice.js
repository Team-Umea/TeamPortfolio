import { createSlice } from "@reduxjs/toolkit";

const IS_AUTHENTICATED_KEY = "IS_AUTHENTICATED_KEY";
const IS_ADMIN_KEY = "IS_ADMIN_KEY";
const USERNAME_KEY = "USERNAME_KEY";
const EMAIL_KEY = "EMAIL_KEY";

const initialState = {
  isAuthenticated: JSON.parse(sessionStorage.getItem(IS_AUTHENTICATED_KEY) || "false"),
  isAdmin: JSON.parse(sessionStorage.getItem(IS_ADMIN_KEY) || "false"),
  username: sessionStorage.getItem(USERNAME_KEY) || "",
  email: sessionStorage.getItem(EMAIL_KEY) || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
      sessionStorage.setItem(IS_AUTHENTICATED_KEY, JSON.stringify(action.payload));
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
      sessionStorage.setItem(IS_ADMIN_KEY, JSON.stringify(action.payload));
    },
    setUsername: (state, action) => {
      state.username = action.payload;
      sessionStorage.setItem(USERNAME_KEY, JSON.stringify(action.payload));
    },
    setEmail: (state, action) => {
      state.email = action.payload;
      sessionStorage.setItem(USERNAME_KEY, JSON.stringify(action.payload));
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.username = "";
      state.email = "";
      sessionStorage.removeItem(IS_AUTHENTICATED_KEY);
      sessionStorage.removeItem(IS_ADMIN_KEY);
      sessionStorage.removeItem(USERNAME_KEY);
      sessionStorage.removeItem(EMAIL_KEY);
    },
  },
});

export const { setIsAuthenticated, setIsAdmin, setUsername, setEmail, clearAuth } =
  authSlice.actions;

export default authSlice.reducer;
