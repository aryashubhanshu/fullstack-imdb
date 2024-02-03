import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";

function App() {
  return (
    <div className="bg-[#121212] w-screen h-screen flex font-['Amazon']">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
