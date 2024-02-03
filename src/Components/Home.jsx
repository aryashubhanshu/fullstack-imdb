import Sidebar from "./template/Sidebar";
import Topbar from "./template/Topbar";

function Home() {
  document.title =
    "IMDb: Ratings, Reviews, and Where to Watch the Best Movies & TV Shows";
  return (
    <>
      <Sidebar />
      <div className="w-[80%] h-full">
        <Topbar />
      </div>
    </>
  );
}

export default Home;
