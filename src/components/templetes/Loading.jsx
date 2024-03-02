import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-full min-h-[10vh] bg-[--primary-color] flex items-center justify-center p-4">
      <div className="w-[3em] h-[3em] border-2 border-zinc-100 border-t-[--primary-color] duration-200 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
