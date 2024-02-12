import { useNavigate } from "react-router-dom";
import Topbar from "./template/Topbar";
import Dropdown from "./template/Dropdown";

function Trending() {
  const navigate = useNavigate();
  return (
    <div className="px-[3%] py-[1%] w-screen h-screen">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#F5C518]"
          ></i>{" "}
          Trending
        </h1>

        <div className="flex items-center w-[80%]">
          <Topbar />
          <Dropdown
            title={"Category"}
            options={["movie", "tv", "all"]}
            func=""
          />
          <div className="w-[2%]"></div>
          <Dropdown title={"Duration"} options={["week", "day"]} func="" />
        </div>
      </div>
    </div>
  );
}

export default Trending;
