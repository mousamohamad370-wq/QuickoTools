import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WordCounter from "./tools/WordCounter";
import CharacterCounter from "./tools/CharacterCounter";
import PasswordGenerator from "./tools/PasswordGenerator";
import QRCodeGenerator from "./tools/QRCodeGenerator";
import TextCaseConverter from "./tools/TextCaseConverter";
import RemoveDuplicateLines from "./tools/RemoveDuplicateLines";
import AgeCalculator from "./tools/AgeCalculator";
import BMICalculator from "./tools/BMICalculator";
import PercentageCalculator from "./tools/PercentageCalculator";
import { useState } from "react";



function App() {
  const [language, setLanguage] = useState('en');
  
  return (
    <Routes>
       <Route path="/"element={ <Home language={language} setLanguage={setLanguage}/> } />
    
      <Route path="/" element={<Home />} />
      <Route path="/word-counter" element={<WordCounter />} />
       <Route path="/character-counter" element={<CharacterCounter />} />
       <Route path="/password-generator" element={<PasswordGenerator />} />
       <Route path="/qr-code-generator" element={<QRCodeGenerator />} />
       <Route path="/text-case-converter" element={<TextCaseConverter />} />
       <Route path="/remove-duplicate-lines" element={<RemoveDuplicateLines />} />
       <Route path="/age-calculator" element={<AgeCalculator />} />
       <Route path="/bmi-calculator" element={<BMICalculator />} />
       <Route path="/percentage-calculator" element={<PercentageCalculator />} />
    </Routes>
  );
}

export default App;