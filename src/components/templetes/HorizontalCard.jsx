import React from "react";
import noimage from "/noimage.png";
import { Link, useLocation } from "react-router-dom";

const HorizontalCard = ({ data, title }) => {
  return (
    <Link
      to={`/${data.media_type || title}/details/${data.id}`}
      className="w-[13vw] aspect-[5/10] flex-shrink-0  "
    >
      <div className="w-full h-[70%] shadow-[8px_4px_12px_3px_#000]  overflow-hidden">
        <img
          src={
            data.poster_path || data.backdrop_path || data.profile_path
              ? `https://image.tmdb.org/t/p/original/${
                  data.poster_path || data.backdrop_path || data.profile_path
                }`
              : noimage
          }
          alt=""
          onError={(e) => (e.target.src = noimage)}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="w-full py-2">
        <h3 className="text-xl font-bold capitalize text-zinc-300">
          {(data.name || data.title).slice(0, 20)}
        </h3>
        <p className=" leading-[1.2] text-sm my-2 opacity-80 ">
          {data.overview.slice(0, 80) + " ..."}
        </p>
      </div>
    </Link>
  );
};

export default HorizontalCard;
