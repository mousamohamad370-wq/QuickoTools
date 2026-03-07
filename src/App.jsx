import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WordCounter from "./tools/WordCounter";
import CharacterCounter from "./tools/CharacterCounter";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/word-counter" element={<WordCounter />} />
       <Route path="/character-counter" element={<CharacterCounter />} />
    </Routes>
  );
}

export default App;