import { Link } from "react-router-dom";

function Cards({ data, title }) {
  return (
    <div className="flex flex-wrap justify-center w-full h-full px-[5%] bg-[#121212]">
      {data.map((card, ind) => (
        <Link className="relative w-[25vh] mr-[5%] mb-[5%]" key={ind}>
          <img
            className="h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
            src={`https://image.tmdb.org/t/p/original/${
              card.poster_path || card.backdrop_path || card.profile_path
            }`}
          />
          <h1 className="text-xl mt-3 font-semibold text-zinc-300">
            {card.name ||
              card.title ||
              card.original_name ||
              card.original_title}
          </h1>

          {card.vote_average && (
            <div className="absolute -right-[10%] top-[10%] text-white rounded-full text-sm font-semibold bg-yellow-600 w-[6vh] h-[6vh] flex justify-center items-center">
              {(card.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

export default Cards;
