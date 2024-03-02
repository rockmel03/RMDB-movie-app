import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound404 = () => {
  const navigate = useNavigate();
  return (
    <div className=" w-screen h-screen bg-[#040205] flex items-center justify-center">
      <img src="/404.gif" alt="" className="w-[20vw]" />
      <span
        onClick={() => navigate("/")}
        className="absolute top-[5%] left-[5%] text-2xl cursor-pointer w-[2em] h-[2em] inline-flex items-center justify-center rounded-full hover:bg-zinc-700  hover:text-white active:scale-90"
      >
        <i className="ri-home-4-line"></i>
      </span>
    </div>
  );
};

export default NotFound404;
