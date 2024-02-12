function HorizontalCards({ data }) {
  return (
    <div className="w-full h-[60vh] flex overflow-y-hidden mb-5 p-5">
      {data.map((d, ind) => (
        <div key={ind} className="min-w-[20%] mr-5 mb-5 bg-zinc-900">
          <img
            className="w-full h-[55%] object-center object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              d.backdrop_path || d.poster_path
            }`}
          />

          <div className="text-white p-3 h-[45%]">
            <h1 className="text-xl font-semibold">
              {d.name || d.title || d.original_name || d.original_title}
            </h1>
            <p className="text-sm">
              {d.overview.slice(0, 50)}...{" "}
              <span className="text-blue-400">Read more</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HorizontalCards;
