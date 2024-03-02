import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "../Utils/Axios";
import React, { useEffect, useState } from "react";
import Loading from "./templetes/Loading";
import HorizontalScroll from "./templetes/HorizontalScroll";
import Dropdown from "./templetes/Dropdown";
import noimage from "/noimage.png";

const PeopleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const [category, setCategory] = useState("movie");

  const getData = async () => {
    const detail = await axios.get(`/person/${id}`);
    const external_ids = await axios.get(`/person/${id}/external_ids`);
    const combined_credits = await axios.get(`/person/${id}/combined_credits`);
    const movie_credits = await axios.get(`/person/${id}/movie_credits`);
    const tv_credits = await axios.get(`/person/${id}/tv_credits`);

    const universalData = {
      detail: detail.data,
      externalIds: external_ids.data,
      combined_credits: combined_credits.data,
      movie_credits: movie_credits.data.cast,
      tv_credits: tv_credits.data.cast,
    };
    setInfo(universalData);
  };

  useEffect(() => {
    getData();
  }, []);
  return info?.detail ? (
    <section className="w-screen min-h-screen relative">
      {/* working area wrapper */}
      <div className="absolute w-full h-full top-0 left-1/2 -translate-x-1/2 overflow-y-auto  px-[5%]">
        {/* part-1 navbar */}
        <nav className="min-h-[10vh] mb-5 flex items-center gap-5 text-xl">
          <span
            onClick={() => navigate(-1)}
            className=" cursor-pointer w-[1.2em] h-[1.2em] inline-flex items-center justify-center rounded-full hover:bg-zinc-700  hover:text-white active:scale-90"
          >
            <i className="ri-arrow-left-line"></i>
          </span>
        </nav>

        {/* part-2  img  & details */}
        <div className="px-3 py-3 flex gap-[5%] justify-center">
          {/* -----------------------------------------------part-2 left--------------------------------------*/}
          <div className="w-[15vw] basis-1/5 flex flex-col gap-4">
            <img
              src={
                info.detail.profile_path
                  ? `https://image.tmdb.org/t/p/original/${info.detail.profile_path}`
                  : noimage
              }
              onError={(e) => (e.target.src = noimage)}
              loading="lazy"
              alt=""
              className="w-full aspect-[3/4] object-cover object-top"
            />

            {info.externalIds && (
              <div className="flex items-center gap-5 text-2xl">
                {info.externalIds.wikidata_id && (
                  <a
                    target="_blank"
                    href={`https://www.wikidata.org/wiki/${info.externalIds.wikidata_id}`}
                  >
                    <i className="ri-earth-fill"></i>
                  </a>
                )}
                {info.externalIds.facebook_id && (
                  <a
                    target="_blank"
                    href={`https://www.facebook.com/${info.externalIds.facebook_id}`}
                  >
                    <i className="ri-facebook-fill"></i>
                  </a>
                )}
                {info.externalIds.instagram_id && (
                  <a
                    target="_blank"
                    href={`https://www.instagram.com/${info.externalIds.instagram_id}`}
                  >
                    <i className="ri-instagram-fill"></i>
                  </a>
                )}
                {info.externalIds.twitter_id && (
                  <a
                    target="_blank"
                    href={`https://twitter.com/${info.externalIds.twitter_id}`}
                  >
                    <i className="ri-twitter-x-fill"></i>
                  </a>
                )}
              </div>
            )}
            <div>
              <h2 className="text-lg font-semibold opacity-50">Person Info</h2>
              <h3 className="flex justify-between items-start font-medium opacity-80">
                known for:{" "}
                <span className="text-right basis-2/3 capitalize">
                  {info.detail.known_for_department}
                </span>
              </h3>
              <h3 className="flex justify-between items-start font-medium opacity-80">
                Gender:{" "}
                <span className="text-right basis-2/3 capitalize">
                  {info.detail.gender == 2 ? "male" : "female"}
                </span>
              </h3>
              <h3 className="flex justify-between items-start font-medium opacity-80">
                Birthday :{" "}
                <span className="text-right basis-2/3 capitalize">
                  {info.detail.birthday}
                </span>
              </h3>
              <h3 className="flex justify-between items-start font-medium opacity-80">
                Place :{" "}
                <span className="text-right basis-2/3 capitalize">
                  {info.detail.place_of_birth}
                </span>
              </h3>
              <h3 className="flex justify-between items-start font-medium opacity-80">
                Deathday :{" "}
                <span className="text-right basis-2/3 capitalize">
                  {info.detail.deathday ? info.detail.deathday : "Still Alive"}
                </span>
              </h3>
            </div>
          </div>

          {/* -----------------------------------------------part-2 right-------------------------------------*/}
          <div className=" basis-3/5">
            <h1 className="text-6xl font-black text-white mb-3">
              {info.detail.name || info.detail.original_name}
            </h1>
            {info.detail.known_for_department && (
              <p className="text-2xl font-medium italic ">
                Known for: "{info.detail.known_for_department}"
              </p>
            )}
            <p className="text-md font-semibold opacity-80 my-3  ">
              {info.detail.biography}
            </p>

            <div className="w-full">
              <div className="flex items-center justify-between py-4">
                <h1 className="text-2xl opacity-50">Acting </h1>
                <Dropdown option={["movie", "tv"]} func={setCategory} />
              </div>
              <ul className="w-full h-[50vh] px-[2vw] py-4 list-disc flex flex-col gap-4 shadow shadow-black overflow-y-auto">
                {info[category + "_credits"].map((item, i) => (
                  <li
                    key={i}
                    className="hover:bg-white/10 p-2 rounded border-b"
                  >
                    <Link to={`/${category}/details/${item.id}`}>
                      <h1 className="text-xl font-semibold capitalize opacity-80">
                        {item.title || item.original_name}{" "}
                        <span className="text-[.8em] opacity-80">
                          (
                          {item.release_date
                            ? item.release_date?.split("-")[0]
                            : item.first_air_date?.split("-")[0]}
                          )
                        </span>
                      </h1>
                      <h2 className="text-md font-semibold capitalize opacity-70">
                        character : {item.character}
                      </h2>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {info.combined_credits && info.combined_credits.length !== 0 && (
          <div>
            <hr className="border-zinc-400 mb-3" />
            <h2 className="text-3xl px-4 my-4 text-zinc-500 font-semibold"></h2>
            <HorizontalScroll data={info.combined_credits.cast} />
          </div>
        )}
      </div>
      <Outlet />
    </section>
  ) : (
    <Loading />
  );
};

export default PeopleDetails;
