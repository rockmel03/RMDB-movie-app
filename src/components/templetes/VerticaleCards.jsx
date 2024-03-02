import React from "react";
import Card from "./Card";

const VerticaleCards = ({ data, title }) => {
  return (
    data.length > 0 && (
      <div className="w-full flex flex-wrap gap-5 px-[5%] justify-center">
        {data.map((d, i) => (
          <Card data={d} key={i} title={title} />
        ))}
      </div>
    )
  );
};

export default VerticaleCards;
