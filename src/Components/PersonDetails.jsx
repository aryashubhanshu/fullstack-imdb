import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncLoadPerson, removePerson } from "../store/actions/personActions";
import Loading from "./template/Loading";
import HorizontalCards from "./template/HorizontalCards";
import Dropdown from "./template/Dropdown";

function PersonDetails() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncLoadPerson(id));

    return () => {
      dispatch(removePerson());
    };
  }, [id]);

  return info ? (
    <div className="px-[5%] w-screen h-[160vh] overflow-y-auto overflow-x-hidden bg-[#12121a]">
      {/* Part 1 Navigation */}
      <nav className="w-full h-[10vh] flex items-center gap-10 text-zinc-100 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#F5C518]"
        ></Link>
      </nav>

      <div className="w-full flex">
        {/* Part 2 Poster and Details */}
        <div className="w-[20%]">
          <img
            className="relative h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] rounded-lg"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
          />

          <hr className="mt-10 mb-5 bordere-none h-[1px] bg-zinc-500" />

          {/* Social Links */}
          <div className="text-2xl text-white flex gap-x-5">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
              rel="noreferrer"
            >
              <i className="ri-earth-fill  hover:text-[#F5C518]"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
              rel="noreferrer"
            >
              <i className="ri-facebook-circle-fill  hover:text-[#F5C518]"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
              rel="noreferrer"
            >
              <i className="ri-instagram-fill  hover:text-[#F5C518]"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
              rel="noreferrer"
            >
              <i className="ri-twitter-x-fill  hover:text-[#F5C518]"></i>
            </a>
          </div>

          {/* Personal Info */}
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Personal Info
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold">Known For</h1>
          <h1 className="text-zinc-400">{info.detail.known_for_department}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender</h1>
          <h1 className="text-zinc-400">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Birthday</h1>
          <h1 className="text-zinc-400">{info.detail.birthday}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Deathday</h1>
          <h1 className="text-zinc-400">
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Place of Birth
          </h1>
          <h1 className="text-zinc-400">{info.detail.place_of_birth}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Also Known As
          </h1>
          <h1 className="text-zinc-400">
            {info.detail.also_known_as.join(", ")}
          </h1>
        </div>

        {/* Part 3 Right Details */}
        <div className="w-[80%] ml-[5%]">
          <h1 className="text-4xl text-white font-black my-5">
            {info.detail.name}
          </h1>

          <h1 className="text-xl text-zinc-400 font-semibold">Biography</h1>
          <p className="text-zinc-400 mt-3">{info.detail.biography}</p>

          <h1 className="text-lg text-zinc-400 font-semibold mt-5">
            Known For
          </h1>
          <HorizontalCards data={info.combinedcredits.cast} />

          <div className="w-full flex justify-between">
            <h1 className="mt-5 text-xl text-zinc-400 font-semibold">Acting</h1>
            <Dropdown
              title={"Category"}
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="list-disc p-5 w-full h-[50vh] my-5 overflow-y-auto overflow-x-hidden text-zinc-400 border-2 border-zinc-700 shadow-xl shadow-[rgba(255, 255, 255, 0.3)]]">
            {info[category + "credits"].cast.map((c, ind) => (
              <li
                key={ind}
                className="hover:text-white p-5 rounded hover:bg-[#12121a] duration-300 cursor-pointer"
              >
                <Link to={`/${category}/details/${c.id}`}>
                  <span>
                    {c.name || c.title || c.original_name || c.original_title}
                  </span>
                  <span className="block ml-5 mt-2">
                    {c.character && `Character Name: ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default PersonDetails;
