import React, { useEffect, useState } from "react";
import Sidenav from "./templetes/Sidenav";
import TopNav from "./templetes/TopNav";
import Header from "./templetes/Header";
import axios from "../Utils/Axios";
import HorizontalScroll from "./templetes/HorizontalScroll";
import Dropdown from "./templetes/Dropdown";
import Loading from "./templetes/Loading";

const Home = () => {
  document.title = "RMDB || Home";
  const [headerData, setheaderData] = useState(null);
  const [horizontalCardsData, setHorizontalCardsData] = useState(null);
  const [category, setCategory] = useState("all");

  const getHeaderData = async () => {
    try {
      const { data } = await axios.get("/trending/all/day");
      const randomNumber = (Math.random() * data.results.length).toFixed();
      setheaderData(data.results[randomNumber]);
    } catch (error) {
      console.log(error);
    }
  };
  const gethorizontalCardData = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/week`);
      setHorizontalCardsData(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    !headerData && getHeaderData();
    gethorizontalCardData();
  }, [category]);

  return headerData && horizontalCardsData ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full  overflow-y-auto">
        <TopNav />
        <Header data={headerData} title={category} />
        <div className="px-4 py-4 flex items-center justify-between">
          <h2 className="text-3xl text-zinc-500 font-semibold">Trending</h2>
          <Dropdown
            title="filter"
            option={["all", "tv", "movie"]}
            func={setCategory}
          />
        </div>
        <HorizontalScroll data={horizontalCardsData} title={category} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
