import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="w-[20%] h-full border-r-[1px] border-zinc-500 p-10">
      <h1 className="text-2xl flex items-center gap-2 font-bold mb-10">
        <span className="text-[--secondary-color]">
          <i className="ri-tv-fill"></i>
        </span>
        RMDB.
      </h1>
      <nav className="w-full flex flex-col gap-3 text-zinc-400">
        <h2 className="text-xl font-medium">New Feeds</h2>
        <Link
          to="/trending"
          className=" text-xl px-4 py-3 rounded hover:text-white hover:bg-[--secondary-color] duration-200 flex items-center gap-2"
        >
          <i className="ri-fire-fill"></i>
          Trending
        </Link>
        <Link
          to="/popular"
          className=" text-xl px-4 py-3 rounded hover:text-white hover:bg-[--secondary-color] duration-200 flex items-center gap-2"
        >
          <i className="ri-sparkling-fill"></i>
          Popular
        </Link>
        <Link
          to="/movie"
          className=" text-xl px-4 py-3 rounded hover:text-white hover:bg-[--secondary-color] duration-200 flex items-center gap-2"
        >
          <i className="ri-movie-2-fill"></i>
          Movies
        </Link>
        <Link
          to="/tv"
          className=" text-xl px-4 py-3 rounded hover:text-white hover:bg-[--secondary-color] duration-200 flex items-center gap-2"
        >
          <i className="ri-tv-2-fill"></i>
          TV-Shows
        </Link>
        <Link
          to="/person"
          className=" text-xl px-4 py-3 rounded hover:text-white hover:bg-[--secondary-color] duration-200 flex items-center gap-2"
        >
          <i className="ri-team-fill"></i>
          People
        </Link>
      </nav>
      <hr className="my-5 border-zinc-500" />
      <nav className="w-full flex flex-col gap-3 text-zinc-400">
        <h2 className="text-xl font-medium text-zinc-300">Website info</h2>
        <Link className=" text-xl px-4 py-3 rounded hover:text-white hover:bg-[--secondary-color] duration-200 flex items-center gap-2">
          <i className="ri-information-fill"></i>
          About us
        </Link>
        <Link className=" text-xl px-4 py-3 rounded hover:text-white hover:bg-[--secondary-color] duration-200 flex items-center gap-2">
          <i className="ri-phone-fill"></i>
          Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
