import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "./template/Topbar";
import Loading from "./template/Loading";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./template/Cards";
import LoadingSpin from "./template/LoadingSpin";

function People() {
  document.title = "IMDb | People";

  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      console.log(data);

      if (data.results.length > 0) {
        setPerson((prevState) => [...prevState, ...data.results]);
        setPage((page) => page + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const refreshHandler = () => {
    if (person.length === 0) {
      getPerson();
    } else {
      setPage(1);
      setPerson([]);
      getPerson();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return person.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[5%] w-full mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#F5C518]"
          ></i>{" "}
          People
        </h1>

        <div className="flex items-center w-[80%]">
          <Topbar />
        </div>
      </div>

      <InfiniteScroll
        dataLength={person.length}
        loader={<LoadingSpin />}
        next={getPerson}
        hasMore={hasMore}
      >
        <Cards data={person} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default People;
