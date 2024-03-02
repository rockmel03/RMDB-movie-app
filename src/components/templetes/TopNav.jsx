import axios from "../../Utils/Axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.png";

const TopNav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState(null);

  const getquery = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      // console.log(data.results);
      setSearches(data.results);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    getquery();
  }, [query]);

  return (
    <div className="relative w-full h-[10vh] flex items-center justify-center py-3">
      <div className="relative w-1/2 h-full text-2xl flex gap-2 items-center justify-center rounded-full px-4 text-zinc-300 bg-zinc-800">
        <span>
          <i className="ri-search-2-line"></i>
        </span>
        <input
          className="w-full outline-none border-none px-4 text-xl bg-transparent "
          type="text"
          name=""
          id=""
          onInput={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Search for..."
        />
        {query.length > 0 && (
          <span onClick={() => setQuery("")} className="absolute right-4">
            <i className="ri-close-fill"></i>
          </span>
        )}
      </div>

      <div className="absolute top-[100%] w-1/2 max-h-[40vh] text-xl text-zinc-300 bg-zinc-800 overflow-y-auto">
        {searches &&
          searches.map((d, i) => (
            <Link to={`/${d.media_type}/details/${d.id}`}
              key={i}
              className="flex items-center gap-5 px-4 py-4 hover:bg-zinc-700 border-b-[1px] border-zinc-500"
            >
              <div className="w-20 h-20 bg-red-300 rounded overflow-hidden">
                <img
                  src={
                    d.poster_path || d.backdrop_path || d.profile_path
                      ? `https://image.tmdb.org/t/p/original/${
                          d.poster_path || d.backdrop_path || d.profile_path
                        }`
                      : noimage
                  }
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <h5>
                {d.name || d.title || d.original_name || d.original_title}
              </h5>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default TopNav;
