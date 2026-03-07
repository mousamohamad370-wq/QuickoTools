import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WordCounter from "./tools/WordCounter";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/word-counter" element={<WordCounter />} />
    </Routes>
  );
}

export default App;