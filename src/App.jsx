import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WordCounter from './tools/WordCounter';
import CharacterCounter from './tools/CharacterCounter';
import PasswordGenerator from './tools/PasswordGenerator';
import QRCodeGenerator from './tools/QRCodeGenerator';
import TextCaseConverter from './tools/TextCaseConverter';
import RemoveDuplicateLines from './tools/RemoveDuplicateLines';
import AgeCalculator from './tools/AgeCalculator';
import BMICalculator from './tools/BMICalculator';
import PercentageCalculator from './tools/PercentageCalculator';
import JSONFormatter from './tools/JSONFormatter';

function App() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('quickotools-language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('quickotools-language', language);
  }, [language]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            language={language}
            setLanguage={setLanguage}
          />
        }
      />

      <Route
        path="/word-counter"
        element={<WordCounter language={language} />}
      />

      <Route
        path="/character-counter"
        element={<CharacterCounter language={language} />}
      />

      <Route
        path="/password-generator"
        element={<PasswordGenerator language={language} />}
      />

      <Route
        path="/qr-code-generator"
        element={<QRCodeGenerator language={language} />}
      />

      <Route
        path="/text-case-converter"
        element={<TextCaseConverter language={language} />}
      />

      <Route
        path="/remove-duplicate-lines"
        element={<RemoveDuplicateLines language={language} />}
      />

      <Route
        path="/age-calculator"
        element={<AgeCalculator language={language} />}
      />

      <Route
        path="/bmi-calculator"
        element={<BMICalculator language={language} />}
      />

      <Route
        path="/percentage-calculator"
        element={<PercentageCalculator language={language} />}
      />
      <Route
        path="/json-formatter"
        element={<JSONFormatter language={language} />}
      />
    </Routes>

  );
}

export default App;