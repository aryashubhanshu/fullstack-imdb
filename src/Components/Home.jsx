import { useEffect, useState } from "react";
import Sidebar from "./template/Sidebar";
import Topbar from "./template/Topbar";
import axios from "../utils/axios";
import Header from "./Header";
import Dropdown from "./template/Dropdown";
import HorizontalCards from "./template/HorizontalCards";

function Home() {
  document.title =
    "IMDb: Ratings, Reviews, and Where to Watch the Best Movies & TV Shows";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get("/trending/all/day");
      let randomWallpaper =
        data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomWallpaper);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    !wallpaper && getHeaderWallpaper();
    getTrending();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <Sidebar />
      <div className="w-[80%] h-full overflow-auto overflow-x-auto">
        <Topbar />

        <Header data={wallpaper} />

        <div className="p-5 flex justify-between">
          <h1 className="text-3xl text-zinc-400 font-semibold">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>

        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <div className="w-full h-screen flex items-center justify-center text-5xl text-white">
      Loading...
    </div>
  );
}

export default Home;
