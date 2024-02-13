import { Link } from "react-router-dom";

function HorizontalCards({ data }) {
  return (
    <div className="w-full flex overflow-y-hidden mb-5 p-5">
      {data.length > 0 ? (
        data.map((d, ind) => (
          <Link
            to={`/${d.media_type}/details/${d.id}}`}
            key={ind}
            className="min-w-[18%] h-[40vh] mr-5 mb-5 bg-zinc-900"
          >
            <img
              className="w-full h-[55%] object-center object-cover"
              src={`https://image.tmdb.org/t/p/original/${
                d.backdrop_path || d.poster_path
              }`}
            />

            <div className="text-white p-3 h-[45%] overflow-y-auto">
              <h1 className="text-xl font-semibold">
                {d.name || d.title || d.original_name || d.original_title}
              </h1>
              <p className="text-sm">
                {d.overview.slice(0, 50)}...{" "}
                <span className="text-zinc-400">more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl text-white font-black text-center">
          Nothing to show
        </h1>
      )}
    </div>
  );
}

export default HorizontalCards;
