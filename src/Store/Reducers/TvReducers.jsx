import { createSlice } from "@reduxjs/toolkit";

const TvSlice = createSlice({
  name: "tv",
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

export const { setInfo, removeInfo } = TvSlice.actions;

export default TvSlice.reducer;
