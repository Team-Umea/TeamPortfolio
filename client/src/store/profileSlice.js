import { createSlice } from "@reduxjs/toolkit";

export const PROFILE_KEY = "PROFILE_KEY";

const initialState = {
  profile: JSON.parse(sessionStorage.getItem(PROFILE_KEY) || "null"),
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setPorfile: (state, action) => {
      state.profile = action.payload;
      sessionStorage.setItem(PROFILE_KEY, JSON.stringify(action.payload));
    },
  },
});

export const { setPorfile } = profileSlice.actions;
export default profileSlice.reducer;
