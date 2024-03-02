import React, { useEffect, useState } from "react";
import Loading from "./templetes/Loading";
import axios from "../Utils/Axios";
import TopNav from "./templetes/TopNav";
import Dropdown from "./templetes/Dropdown";
import { useNavigate } from "react-router-dom";
import VerticaleCards from "./templetes/VerticaleCards";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "./templetes/Header";

const Popular = () => {
  const [popularData, setPopularData] = useState([]);
  const [category, setCategory] = useState("movie");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  document.title = "RMDB || Popular " + category.toUpperCase();
  const navigate = useNavigate();

  const getpopularData = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);
      if (data.results.length > 0) {
        popularData.length === 0
          ? setPopularData(data.results)
          : setPopularData((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (popularData.length === 0) {
      getpopularData();
    } else {
      setPage(1);
      setPopularData([]);
      getpopularData();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return popularData.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between gap-2">
        <h2 className="text-3xl text-zinc-400 font-semibold flex items-end gap-2">
          <span
            onClick={() => navigate(-1)}
            className=" cursor-pointer w-[1.2em] h-[1.2em] inline-flex items-center justify-center rounded-full hover:bg-zinc-700  hover:text-white active:scale-90"
          >
            <i className="ri-arrow-left-line"></i>
          </span>
          Popular{" "}
          <small className="text-sm opacity-50">
            ({category.toUpperCase()})
          </small>
        </h2>
        <TopNav />
        <Dropdown
          title="category"
          option={["movie", "person", "tv"]}
          func={setCategory}
        />
      </div>
      <div className=" my-5 px-[5%]">
        {category !== "person" && (
          <Header
            data={popularData[(Math.random() * popularData.length).toFixed()]}
          />
        )}
      </div>
      <InfiniteScroll
        dataLength={popularData.length}
        next={getpopularData}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        className="bg-[--primary-color]"
      >
        <VerticaleCards data={popularData} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
