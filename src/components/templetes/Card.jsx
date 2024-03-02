import React from "react";
import noimage from "/noimage.png";
import { Link, useLocation } from "react-router-dom";

const Card = ({ data ,title}) => {
  
  return (
    <Link
      to={`/${data.media_type || title}/details/${data.id}`}
      className="w-[15%] aspect-[9/16] relative"
    >
      <div className="w-full h-[82%] mb-2 rounded-md shadow-[8px_3px_12px_3px_black] overflow-hidden">
        <img
          src={
            data.poster_path || data.backdrop_path || data.profile_path
              ? `https://image.tmdb.org/t/p/original/${
                  data.poster_path || data.backdrop_path || data.profile_path
                }`
              : noimage
          }
          onError={(e) => (e.target.src = noimage)}
          loading="lazy"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-md font-semibold">
        {(data.name || data.title).slice(0, 20)}
      </h1>
      {data.vote_average && (
        <div className="absolute top-[60%] -right-4 w-[25%] aspect-square font-semibold bg-yellow-400 opacity-70 rounded-full flex items-center justify-center">
          <span>
            {(data.vote_average * 10).toFixed()}
            <sup>%</sup>
          </span>
        </div>
      )}
    </Link>
  );
};

export default Card;
