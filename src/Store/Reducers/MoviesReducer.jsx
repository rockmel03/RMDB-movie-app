import { createSlice } from "@reduxjs/toolkit";

const MovieSlice = createSlice({
  name: "movie",
  initialState: {
    info: null,
  },
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    removeInfo: (state) => {
      state.info = null;
    },
  },
});

export const { setInfo, removeInfo } = MovieSlice.actions;

export default MovieSlice.reducer;
