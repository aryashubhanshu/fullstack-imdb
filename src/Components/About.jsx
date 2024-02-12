import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen">
      <div className="px-[5%] h-[10%] flex items-center w-full mb-5">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#F5C518]"
          ></i>{" "}
          About
        </h1>
      </div>
      <div className="px-[10%] text-white flex flex-col justify-between h-[80%]">
        <p className="">
          The app is a clone for IMDb.
          <br /> <br />
          What is IMDb?
          <br /> IMDb is the world&apos;s most popular and authoritative source
          for movie, TV and celebrity content, designed to help fans explore the
          world of movies and shows and decide what to watch. <br />
          <br />
          Our searchable database includes millions of movies, TV and
          entertainment programs and cast and crew members. IMDb can help you:{" "}
          <li>
            Jog your memory about a movie, show, or person on the tip of your
            tongue
          </li>
          <li>Find the best movie or show to watch next</li>
          <li>
            Empower you to share your entertainment knowledge and opinions with
            the world’s largest community of fans
          </li>
          <br />
          <br />
          TMDB API is used to fetch Movies/ Web Series/ TV Shows data.
        </p>
        <p className="text-sm">
          This is a personal project of Shubhanshu |{" "}
          <a href={"https://www.thisisshubh.online/"} className="text-blue-400">
            thisisshubh.online
          </a>
        </p>
      </div>
    </div>
  );
}

export default About;
