import React, { useEffect, useState } from "react";
import Loading from "./templetes/Loading";
import axios from "../Utils/Axios";
import TopNav from "./templetes/TopNav";
import Dropdown from "./templetes/Dropdown";
import { useNavigate } from "react-router-dom";
import VerticaleCards from "./templetes/VerticaleCards";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "./templetes/Header";

const Trending = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  document.title = "RMDB || TRENDING " + category.toUpperCase();
  const navigate = useNavigate();

  const getTrendingData = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      if (data.results.length > 0) {
        trendingData.length === 0
          ? setTrendingData(data.results)
          : setTrendingData((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (trendingData.length === 0) {
      getTrendingData();
    } else {
      setPage(1);
      setTrendingData([]);
      getTrendingData();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trendingData.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between gap-2">
        <h2 className="text-3xl text-zinc-400 font-semibold flex items-end gap-2">
          <span
            onClick={() => navigate(-1)}
            className=" cursor-pointer w-[1.2em] h-[1.2em] inline-flex items-center justify-center rounded-full hover:bg-zinc-700  hover:text-white active:scale-90"
          >
            <i className="ri-arrow-left-line"></i>
          </span>
          Trending{" "}
          <small className="text-sm opacity-50">
            ({category.toUpperCase()})
          </small>
        </h2>
        <TopNav />
        <Dropdown
          title="category"
          option={["all", "movie", "tv"]}
          func={setCategory}
        />
        <Dropdown
          title="duration"
          option={["day", "week"]}
          func={setDuration}
        />
      </div>
      <div className=" my-5 px-[5%]">
        <Header
          data={trendingData[(Math.random() * trendingData.length).toFixed()]}
        />
      </div>
      <InfiniteScroll
        dataLength={trendingData.length}
        next={getTrendingData}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        className="bg-[--primary-color]"
      >
        <VerticaleCards data={trendingData} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
