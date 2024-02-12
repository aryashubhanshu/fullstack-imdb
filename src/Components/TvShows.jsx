import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "./template/Topbar";
import Dropdown from "./template/Dropdown";
import Loading from "./template/Loading";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./template/Cards";
import LoadingSpin from "./template/LoadingSpin";

function TvShows() {
  document.title = "IMDb | TV Shows";

  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [tv, setTv] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      console.log(data);

      if (data.results.length > 0) {
        setTv((prevState) => [...prevState, ...data.results]);
        setPage((page) => page + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const refreshHandler = () => {
    if (tv.length === 0) {
      getTv();
    } else {
      setPage(1);
      setTv([]);
      getTv();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return tv.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#F5C518]"
          ></i>{" "}
          TV Shows
          <small className="ml-2 text-sm text-zinc-600">
            ({category.charAt(0).toUpperCase() + category.slice(1)})
          </small>
        </h1>

        <div className="flex items-center w-[80%]">
          <Topbar />
          <Dropdown
            title={"Category"}
            options={["on_the_air", "popular", "top_rated", "airing_today"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        loader={<LoadingSpin />}
        next={getTv}
        hasMore={hasMore}
      >
        <Cards data={tv} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default TvShows;
