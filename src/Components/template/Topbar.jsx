import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";

function Topnav() {
  const [query, setQuery] = useState("");
  const getSearches = async () => {
    try {
      const d = await axios.get(`/search/multi?query=${query}`);
      console.log(d);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    <div className="w-full h-[10vh] relative flex justify-start items-center ml-[15%]">
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
          className="ri-close-fill text-zinc-400 text-3xl hover:text-zinc-500"
        ></i>
      )}

      <div className="absolute top-[90%] w-[50%] max-h-[50vh] bg-zinc-200 overflow-auto">
        {/* <Link className="p-8 w-full flex justify-start items-center border-b-2 border-zinc-100 text-zinc-600 font-semibold hover:text-black hover:bg-zinc-300 duration-300">
          <img src="" alt="" />
          <span>Hello Everyone</span>
        </Link> */}
      </div>
    </div>
  );
}

export default Topnav;
