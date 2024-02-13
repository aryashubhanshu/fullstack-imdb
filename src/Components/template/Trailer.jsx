import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

function Trailer() {
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const youtube_video = useSelector((state) => state[category].info.videos);
  const navigate = useNavigate();

  return (
    <div className="absolute top-0 left-0 z-[99] w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.9)]">
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:text-[#F5C518] ri-close-fill text-3xl text-white right-[15%] top-[5%]"
      ></Link>
      {youtube_video ? (
        <ReactPlayer
          height={500}
          width={940}
          url={`https://www.youtube.com/watch?v=${youtube_video.key}`}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default Trailer;
