import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null, // Initial state is null
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload; // Assign payload to nowPlayingMovies
    },
  },
});

// Exporting actions to be used in your components
export const { addNowPlayingMovies } = moviesSlice.actions;

// Export the reducer to be used in store
export default moviesSlice.reducer;
