import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "./template/Topbar";
import Dropdown from "./template/Dropdown";
import Loading from "./template/Loading";
import LoadingSpin from "./template/LoadingSpin";
import Cards from "./template/Cards";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";

function Popular() {
  document.title = "IMDb | Popular";

  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      console.log(data);

      if (data.results.length > 0) {
        setPopular((prevState) => [...prevState, ...data.results]);
        setPage((page) => page + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      getPopular();
    } else {
      setPage(1);
      setPopular([]);
      getPopular();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#F5C518]"
          ></i>{" "}
          Popular
        </h1>

        <div className="flex items-center w-[80%]">
          <Topbar />
          <Dropdown
            title={"Category"}
            options={["movie", "tv"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        loader={<LoadingSpin />}
        next={getPopular}
        hasMore={hasMore}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Popular;
