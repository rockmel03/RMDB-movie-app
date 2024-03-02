import React from "react";
import HorizontalCard from "./HorizontalCard";
import Loading from "./Loading";

const HorizontalScroll = ({ data, title }) => {
  return (
    <div className="w-full min-h-[40vh] p-4 flex gap-4 overflow-hidden overflow-x-auto">
      {data.length > 0 ? (
        data.map((d, i) => <HorizontalCard data={d} key={i} title={title} />)
      ) : (
        <h1 className="text-semibold text-lg opacity-80">Not available...</h1>
      )}
    </div>
  );
};

export default HorizontalScroll;
