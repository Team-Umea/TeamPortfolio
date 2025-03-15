import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ENDPOINTS } from "../api/endpoints";

const initialState = {
  profiles: [],
  events: [],
  projects: [],
  loading: false,
  error: null,
};

export const fetchContent = createAsyncThunk("content/fetchContent", async () => {
  const response = await axios.get(ENDPOINTS.CONTENT);
  return response.data;
});

const contentSlice = createSlice({
  name: "content",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        const content = action.payload;

        state.loading = false;
        state.error = null;
        state.profiles = content.profiles;
        state.events = content.events;
        state.projects = content.projects;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Misslyckades med att hämta innehåll";
      });
  },
});

export default contentSlice.reducer;
