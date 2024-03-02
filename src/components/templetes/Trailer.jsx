import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const mediaType = () => {
    if (pathname.split("/").includes("movie")) return "movie";
    else if (pathname.split("/").includes("tv")) return "tv";
    // else return "person";
  };
  const { trailer } = useSelector((state) => state[mediaType()].info);

  return (
    <div className="absolute z-[99] w-screen h-screen bg-zinc-950/90 flex items-center justify-center ">
      <span
        onClick={() => navigate(-1)}
        className=" absolute top-[5%] right-[5%] text-3xl cursor-pointer w-[1.2em] h-[1.2em] inline-flex items-center justify-center rounded-full hover:bg-zinc-700  hover:text-white active:scale-90"
      >
        <i className="ri-close-fill"></i>
      </span>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${trailer.key}`}
        controls={true}
        width={"70%"}
        height={"70%"}
        onError={(e) => {
          navigate(-1);
          alert("video missing");
          console.log(new Error("something went wrong"));
        }}
      />
    </div>
  );
};

export default Trailer;
