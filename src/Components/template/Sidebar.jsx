import { Link } from "react-router-dom";
import Logo from "./Logo";

function Sidebar() {
  return (
    <div className="w-[20%] h-full border-r border-zinc-400 p-10 overflow-y-auto">
      <div className="mr-2">
        <Logo />
      </div>
      <nav className="flex flex-col gap-3 text-zinc-400 text-xl">
        <h1 className="text-white font-semibold text-xl mt-10 mb-2">
          New Feeds
        </h1>
        <Link
          to={"/trending"}
          className="hover:bg-[#F5C518] hover:text-black duration-300 p-2 rounded-lg"
        >
          <i className="ri-fire-fill mr-2"></i>Trending
        </Link>
        <Link className="hover:bg-[#F5C518] hover:text-black duration-300 p-2 rounded-lg">
          <i className="ri-magic-fill mr-2"></i>Popular
        </Link>
        <Link className="hover:bg-[#F5C518] hover:text-black duration-300 p-2 rounded-lg">
          <i className="ri-movie-2-fill mr-2"></i>Movies
        </Link>
        <Link className="hover:bg-[#F5C518] hover:text-black duration-300 p-2 rounded-lg">
          <i className="ri-tv-2-fill mr-2"></i>TV Shows
        </Link>
        <Link className="hover:bg-[#F5C518] hover:text-black duration-300 p-2 rounded-lg">
          <i className="ri-team-fill mr-2"></i>People
        </Link>
      </nav>

      <hr className="border-none h-[1px] bg-zinc-400 my-5" />

      <nav className="flex flex-col gap-3 text-zinc-400 text-xl">
        <h1 className="text-white font-semibold text-xl mb-2">
          Website Information
        </h1>
        <Link className="hover:bg-[#F5C518] hover:text-black duration-300 p-2 rounded-lg">
          <i className="ri-information-fill mr-2"></i>About
        </Link>
        <Link className="hover:bg-[#F5C518] hover:text-black duration-300 p-2 rounded-lg">
          <i className="ri-phone-fill mr-2"></i>Contact
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
