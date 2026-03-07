import { Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import toolsRegistry from './tools/toolsRegistry';

function PageLoader() {
  return (
    <div className="page-loader">
      <div className="page-loader-spinner"></div>
      <p className="page-loader-text">Loading...</p>
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('quickotools-language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('quickotools-language', language);
  }, [language]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route
          path="/"
          element={<Home language={language} setLanguage={setLanguage} />}
        />

        {toolsRegistry.map((tool) => {
          const ToolComponent = tool.component;

          return (
            <Route
              key={tool.path}
              path={tool.path}
              element={<ToolComponent language={language} />}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
}

export default App;