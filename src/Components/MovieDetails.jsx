import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncLoadMovie, removeMovie } from "../store/actions/movieActions";
import Loading from "./template/Loading";
import HorizontalCards from "./template/HorizontalCards";

function MovieDetails() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncLoadMovie(id));

    return () => {
      dispatch(removeMovie());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.9), rgba(0,0,0,1)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center top",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen h-[160vh] px-[5%]"
    >
      {/* Part 1 Navigation */}
      <nav className="w-full h-[10vh] flex items-center gap-10 text-zinc-100 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#F5C518]"
        ></Link>
        <a target="_blank" href={info.detail.homepage} rel="noreferrer">
          <i className="ri-external-link-fill  hover:text-[#F5C518]"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          rel="noreferrer"
        >
          <i className="ri-earth-fill  hover:text-[#F5C518]"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
          rel="noreferrer"
          className=" hover:text-[#F5C518]"
        >
          IMDb
        </a>
      </nav>

      {/* Part 2 Poster */}
      <div className="w-full flex mt-5">
        <img
          className="relative h-[45vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] rounded-lg"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
        />

        <div className="content ml-[5%] text-white">
          <h1 className="text-4xl font-black">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}

            <small className="text-xl font-bold text-zinc-200 mx-2">
              [{info.detail.release_date.split("-")[0]}]
            </small>

            <Link
              className="ml-5 text-base px-10 py-4 bg-[#F5C518] text-white rounded-lg"
              to={`${pathname}/trailer`}
            >
              <i className="ri-play-fill"></i>
              Play Trailer
            </Link>
          </h1>

          <div className="mt-5 mb-5 flex items-center gap-x-5">
            <span className="text-white rounded-full text-sm font-semibold bg-[#F5C518] w-[6vh] h-[6vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h1 className="text-zinc-200 -ml-[1%]">User Score</h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime}mins</h1>
          </div>

          <h1 className="text-xl font-semibold italic text-zinc-200">
            [{info.detail.tagline}]
          </h1>

          <h1 className="mt-5 mb-2 font-semibold">Overview</h1>
          <p className="text-sm">{info.detail.overview}</p>

          <h1 className="mt-5 mb-2 font-semibold">Languages</h1>
          <p className="text-sm">{info.translations.join(", ")}</p>
        </div>
      </div>

      {/* Post 3 Platforms to watch */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10 mb-5">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Platform</h1>
            {info.watchproviders.flatrate.map((w, ind) => (
              <img
                title={w.provider_name}
                key={ind}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Rent</h1>
            {info.watchproviders.rent.map((w, ind) => (
              <img
                title={w.provider_name}
                key={ind}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available to Buy</h1>
            {info.watchproviders.buy.map((w, ind) => (
              <img
                title={w.provider_name}
                key={ind}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4 Recommendations */}
      <hr className="mt-10 mb-5 bordere-none h-[1px] bg-zinc-500" />
      <h1 className="text-2xl font-semibold text-white">
        Recommendations & Similar
      </h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}

export default MovieDetails;
