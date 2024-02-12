import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/noimage.jpeg";

function Topnav() {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    <div className="w-[80%] h-[10vh] relative flex mx-auto items-center">
      <i className="ri-search-line text-zinc-400 text-3xl"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[50%] mx-10 p-5 text-xl outline-none border-none bg-transparent text-white"
        type="text"
        placeholder="Search anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="ri-close-fill right-0 text-zinc-400 text-3xl hover:text-zinc-500"
        ></i>
      )}

      <div className="z-[99] absolute ml-[10%] top-[100%] w-[50%] max-h-[50vh] bg-zinc-200 overflow-auto">
        {searches.map((s, ind) => (
          <Link
            key={ind}
            className="p-8 w-full flex justify-start items-center border-b-2 border-zinc-100 text-zinc-600 font-semibold hover:text-black hover:bg-zinc-300 duration-300"
          >
            <img
              src={
                s.profile_path || s.backdrop_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.profile_path
                    }`
                  : noimage
              }
              className="w=[10vh] h-[10vh] object-cover rounded-md mr-5 shadow-lg"
              alt=""
            />
            <span>
              {s.name || s.title || s.original_name || s.original_title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Topnav;
