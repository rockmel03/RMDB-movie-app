import React, { useEffect, useState } from "react";
import Loading from "./templetes/Loading";
import axios from "../Utils/Axios";
import TopNav from "./templetes/TopNav";
import Dropdown from "./templetes/Dropdown";
import { useNavigate } from "react-router-dom";
import VerticaleCards from "./templetes/VerticaleCards";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "./templetes/Header";

export default function TvShows() {
  const [tvShowsData, setTvShowsData] = useState([]);
  const [category, setCategory] = useState("airing_today");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  document.title = "RMDB || Tv shows " + category.toUpperCase();
  const navigate = useNavigate();

  const gettvShowsData = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        tvShowsData.length === 0
          ? setTvShowsData(data.results)
          : setTvShowsData((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (tvShowsData.length === 0) {
      gettvShowsData();
    } else {
      setPage(1);
      setTvShowsData([]);
      gettvShowsData();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  return tvShowsData.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between gap-2">
        <h2 className="text-3xl text-zinc-400 font-semibold flex items-end gap-2 whitespace-nowrap">
          <span
            onClick={() => navigate(-1)}
            className=" cursor-pointer w-[1.2em] h-[1.2em] inline-flex items-center justify-center rounded-full hover:bg-zinc-700  hover:text-white active:scale-90"
          >
            <i className="ri-arrow-left-line"></i>
          </span>
          Tv-Shows
          <small className="text-sm opacity-50">
            ({category.toUpperCase()})
          </small>
        </h2>
        <TopNav />
        <Dropdown
          title="category"
          option={["airing_today", "on_the_air", "popular", "top_rated"]}
          func={setCategory}
        />
      </div>
      <div className=" my-5 px-[5%]">
        {category !== "person" && (
          <Header
            data={tvShowsData[(Math.random() * tvShowsData.length).toFixed()]}
            title="tv"
          />
        )}
      </div>
      <InfiniteScroll
        dataLength={tvShowsData.length}
        next={gettvShowsData}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        className="bg-[--primary-color]"
      >
        <VerticaleCards data={tvShowsData} title={"tv"} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}
