import React from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "./Loading";
import noimage from "/noimage.png";

const Header = ({ data, title }) => {
  return (
    data && (
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.6),rgba(0,0,0,0.8),rgba(0,0,0,1)),url(${
            data.backdrop_path || data.poster_path || data.profile_path
              ? `https://image.tmdb.org/t/p/original/${
                  data.backdrop_path || data.poster_path || data.profile_path
                }`
              : noimage
          })`,
          backgroundPosition: "50% 30%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="w-full h-[50vh] flex flex-col justify-end items-start pl-[10vw] pb-[5vw]"
      >
        <h1 className="w-[70%] text-6xl font-black capitalize">
          {(data.name || data.title).slice(0, 50)}
        </h1>
        <p className="w-[70%] my-3 text-lg leading-tight ">
          {data.overview && data.overview.slice(0, 200) + " ..."}
          <Link
            to={`/${data.media_type || title}/details/${data.id}`}
            className="opacity-50 hover:text-blue-500 cursor-pointer"
          >
            more
          </Link>
        </p>
        <div className="flex items-center gap-4">
          <h5 className="font-semibold">
            <span className="mr-2 text-yellow-500">
              <i className="ri-megaphone-fill"></i>
            </span>
            {data.release_date || "Release Date"}
          </h5>
          {data.media_type && (
            <h5 className="font-semibold capitalize">
              <span className="mr-2 text-yellow-500">
                <i className="ri-album-fill"></i>
              </span>
              {data.media_type}
            </h5>
          )}
        </div>
        {data.media_type === "movie" && (
          <Link
            to={`/${data.media_type || title}/details/${data.id}/trailer`}
            className="text-md font-semibold px-4 py-2 bg-[--secondary-color] rounded mt-3 active:scale-95"
          >
            Watch Trailer
          </Link>
        )}
      </div>
    )
  );
};

export default Header;
