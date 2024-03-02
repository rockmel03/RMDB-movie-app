import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import People from "./components/People";
import Popular from "./components/Popular";
import TvShows from "./components/TvShows";
import Movie from "./components/Movie";
import MovieDetails from "./components/MovieDetails";
import Trailer from "./components/templetes/Trailer";
import TvShowsDetails from "./components/TvShowsDetails";
import NotFound404 from "./components/templetes/NotFound404";
import PeopleDetails from "./components/PeopleDetails";

const App = () => {
  return (
    <div className="w-screen h-screen bg-[--primary-color] text-zinc-50 flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/tv" element={<TvShows />} />
        <Route path="/tv/details/:id" element={<TvShowsDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<PeopleDetails />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
