import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WordCounter from "./tools/WordCounter";
import CharacterCounter from "./tools/CharacterCounter";
import PasswordGenerator from "./tools/PasswordGenerator";
import QRCodeGenerator from "./tools/QRCodeGenerator";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/word-counter" element={<WordCounter />} />
       <Route path="/character-counter" element={<CharacterCounter />} />
       <Route path="/password-generator" element={<PasswordGenerator />} />
       <Route path="/qr-code-generator" element={<QRCodeGenerator />} />
    </Routes>
  );
}

export default App;