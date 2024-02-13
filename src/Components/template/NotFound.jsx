import notfound from "/notfound.jpg";

function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <img className="h-[50%] object-cover" src={notfound} />
    </div>
  );
}

export default NotFound;
