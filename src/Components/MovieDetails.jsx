import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncLoadMovie, removeMovie } from "../store/actions/movieActions";
import Loading from "./template/Loading";

function MovieDetails() {
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncLoadMovie(id));

    return () => {
      dispatch(removeMovie());
    };
  }, []);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-screen px-[5%]"
    >
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
    </div>
  ) : (
    <Loading />
  );
}

export default MovieDetails;
