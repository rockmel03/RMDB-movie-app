import { configureStore } from "@reduxjs/toolkit";
import MoviesReducer from "./Reducers/MoviesReducer";
import TvReducers from "./Reducers/TvReducers";
const Store = configureStore({
  reducer: {
    movie: MoviesReducer,
    tv: TvReducers,
  },
});

export default Store;
