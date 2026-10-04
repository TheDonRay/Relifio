import { BrowserRouter, Routes, Route } from "react-router-dom";
//import the componenets here as such
import Homepage from "./components/Homepage.jsx";
import Learnmore from "./components/Learnmore.jsx";
import Mainpage from "./components/Mainpage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Learnmore" element={<Learnmore />} />
          <Route path="/Mainpage" element={<Mainpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
