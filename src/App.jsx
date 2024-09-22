import Home from "./components/Home"
import { Route, Routes } from "react-router-dom";
import Questions from "./components/Questions";
import Info from "./components/Info";
import Review from "./components/Review";
import Scoreboard from "./components/Scoreboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/info" element={<Info />} />
      <Route path="/questions/:id" element={<Questions />} />
      <Route path="/review" element={<Review />} />
      <Route path="/scoreboard" element={<Scoreboard />} />
    </Routes>
  )
}

export default App
