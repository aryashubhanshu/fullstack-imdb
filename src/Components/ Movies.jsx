import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "./template/Topbar";
import Dropdown from "./template/Dropdown";
import Loading from "./template/Loading";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./template/Cards";
import LoadingSpin from "./template/LoadingSpin";

function Movies() {
  document.title = "IMDb | Movies";

  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      console.log(data);

      if (data.results.length > 0) {
        setMovie((prevState) => [...prevState, ...data.results]);
        setPage((page) => page + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const refreshHandler = () => {
    if (movie.length === 0) {
      getMovie();
    } else {
      setPage(1);
      setMovie([]);
      getMovie();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return movie.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#F5C518]"
          ></i>{" "}
          Movies
          <small className="ml-2 text-sm text-zinc-600">
            ({category.charAt(0).toUpperCase() + category.slice(1)})
          </small>
        </h1>

        <div className="flex items-center w-[80%]">
          <Topbar />
          <Dropdown
            title={"Category"}
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={movie.length}
        loader={<LoadingSpin />}
        next={getMovie}
        hasMore={hasMore}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Movies;
