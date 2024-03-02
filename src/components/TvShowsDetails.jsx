import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetTvInfo, removeInfo } from "../Store/Actions/TvActions";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import Loading from "./templetes/Loading";
import noimage from "/noimage.png";
import HorizontalScroll from "./templetes/HorizontalScroll";

const TvShowsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncSetTvInfo(id));
    return () => {
      dispatch(removeInfo());
    };
  }, [id]);

  return info ? (
    <section
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.6),rgba(0,0,0,0.8),rgba(0,0,0,1)),url(${
          info.detail.backdrop_path ||
          info.detail.poster_path ||
          info.detail.profile_path
            ? `https://image.tmdb.org/t/p/original/${
                info.detail.backdrop_path ||
                info.detail.poster_path ||
                info.detail.profile_path
              }`
            : noimage
        })`,
        backgroundPosition: "50% 30%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen min-h-screen relative"
    >
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
          {info.detail.homepage && (
            <a target="_blank" href={info.detail.homepage}>
              <i className="ri-external-link-line"></i>
            </a>
          )}
          {info.externalIds && (
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalIds.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>
          )}
          {info.externalIds && (
            <a
              target="_blank"
              href={`https://www.imdb.com/title/${info.externalIds.imdb_id}`}
            >
              imdb
            </a>
          )}
        </nav>
        {/* part-2  img watchproviders & details */}
        <div className="px-3 py-3 flex gap-[5%] justify-center">
          {/* part-2 left*/}

          {/* part-2 left img */}
          <div className="w-[20vw] flex flex-col gap-4">
            <img
              src={
                info.detail.poster_path ||
                info.detail.backdrop_path ||
                info.detail.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      info.detail.poster_path ||
                      info.detail.backdrop_path ||
                      info.detail.profile_path
                    }`
                  : noimage
              }
              onError={(e) => (e.target.src = noimage)}
              loading="lazy"
              alt=""
              className="w-full aspect-[3/4] object-cover"
            />

            {/* part-2 left img watchproviders & details */}
            {info.watchProviders && info.watchProviders.flatrate && (
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-semibold capitalize basis-[25%]">
                  Flat Rate
                </h3>
                {info.watchProviders.flatrate.map((item, i) => (
                  <img
                    key={item.logo_path}
                    src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                    alt=""
                    className="rounded w-[10%] aspect-square object-cover object-center"
                  />
                ))}
              </div>
            )}

            {info.watchProviders && info.watchProviders.buy && (
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-semibold capitalize basis-[25%]">
                  Buying option
                </h3>
                {info.watchProviders.buy.map((item, i) => (
                  <img
                    key={item.logo_path}
                    src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                    alt=""
                    className="rounded w-[10%] aspect-square object-cover object-center"
                  />
                ))}
              </div>
            )}

            {info.watchProviders && info.watchProviders.rent && (
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-semibold capitalize basis-[25%]">
                  Rent Option
                </h3>
                {info.watchProviders.rent.map((item, i) => (
                  <img
                    key={item.logo_path}
                    src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                    alt=""
                    className="rounded w-[10%] aspect-square object-cover object-center"
                  />
                ))}
              </div>
            )}
          </div>

          {/* -----------------------------------------------part-2 right-------------------------------------*/}
          <div className=" basis-3/5">
            <h1 className="text-6xl font-black text-white">
              {info.detail.name || info.detail.original_name}
              <span className="text-[.5em] font-semibold opacity-50">
                ({info.detail.first_air_date.split("-")[0]})
              </span>
            </h1>
            <div className="flex items-center gap-2 my-4">
              {info.detail.vote_average && (
                <div className=" w-[5%] aspect-square font-semibold bg-yellow-600  rounded-full flex items-center justify-center">
                  <span>
                    {(info.detail.vote_average * 10).toFixed()}
                    <sup>%</sup>
                  </span>
                </div>
              )}
              <h5 className="font-medium text-xl leading-tight">Users vote</h5>
              <h5 className="font-medium text-xl leading-tight">
                {info.detail.first_air_date}
              </h5>
              <h5 className="font-medium text-xl leading-tight">
                {info.detail.genres.map((val) => val.name).join(", ")}
              </h5>
              <h5 className="font-medium text-xl leading-tight">
                {info.detail.number_of_seasons} Seasons
              </h5>
            </div>
            {info.detail.tagline && (
              <p className="text-2xl font-medium italic ">
                "{info.detail.tagline}"
              </p>
            )}
            <p className="text-xl my-3  ">{info.detail.overview}</p>
            <p className="text-2xl font-medium ">Translations</p>
            <p className="text-xl my-3 ">
              {info.translations.map((val) => val.name).join(", ")}
            </p>

            {info.trailer && (
              <Link
                to={`trailer`}
                className="px-5 py-3 font-semibold capitalize bg-[--secondary-color] rounded-md inline-block"
              >
                <i className="ri-play-fill"></i> watch trailer
              </Link>
            )}
          </div>
        </div>
        <div className="  flex items-center justify-between"></div>
        {info.detail.seasons && info.detail.seasons.length > 1 && (
          <>
            <hr className="border-zinc-400 mb-3" />
            <h2 className="text-3xl px-4 my-4 text-zinc-500 font-semibold">
              Seasons
            </h2>
            <HorizontalScroll data={info.detail.seasons} />
          </>
        )}
        {info.similar.length !== 0 && (
          <>
            <hr className="border-zinc-400 my-3" />
            <h2 className="text-3xl px-4 my-4 text-zinc-500 font-semibold">
              Similar
            </h2>
            <HorizontalScroll data={info.similar} title={"tv"} />
          </>
        )}
        {info.recommendations.length !== 0 && (
          <>
            <hr className="border-zinc-400 my-3" />
            <h2 className="text-3xl px-4 my-4 text-zinc-500 font-semibold">
              Similar
            </h2>
            <HorizontalScroll data={info.recommendations} title={"tv"} />
          </>
        )}
      </div>
      <Outlet />
    </section>
  ) : (
    <Loading />
  );
};

export default TvShowsDetails;
