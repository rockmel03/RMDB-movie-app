import React, { useEffect, useState } from "react";
import Loading from "./templetes/Loading";
import axios from "../Utils/Axios";
import TopNav from "./templetes/TopNav";
import { useNavigate } from "react-router-dom";
import VerticaleCards from "./templetes/VerticaleCards";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  const [personData, setPersonData] = useState([]);
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  document.title = "RMDB || PEOPLE " + category.toUpperCase();
  const navigate = useNavigate();

  const getpersonData = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        personData.length === 0
          ? setPersonData(data.results)
          : setPersonData((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (personData.length === 0) {
      getpersonData();
    } else {
      setPage(1);
      setPersonData([]);
      getpersonData();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);
  return personData.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full flex items-center justify-between gap-2">
        <h2 className="text-3xl text-zinc-400 font-semibold flex items-end gap-2 whitespace-nowrap">
          <span
            onClick={() => navigate(-1)}
            className=" cursor-pointer w-[1.2em] h-[1.2em] inline-flex items-center justify-center rounded-full hover:bg-zinc-700  hover:text-white active:scale-90"
          >
            <i className="ri-arrow-left-line"></i>
          </span>
          People
          <small className="text-sm opacity-50">
            ({category.toUpperCase()})
          </small>
        </h2>
        <TopNav />
      </div>

      <InfiniteScroll
        dataLength={personData.length}
        next={getpersonData}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        className="bg-[--primary-color]"
      >
        <VerticaleCards data={personData} title={"person"} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
