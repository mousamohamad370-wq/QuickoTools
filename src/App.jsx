import { Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import Navbar from './components/Navbar';
import toolsRegistry from './tools/toolsRegistry';
import Footer from './components/Footer';

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
    <>
      <Navbar language={language} setLanguage={setLanguage} />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/"
            element={<Home language={language} setLanguage={setLanguage} />}
          />

          <Route
            path="/categories"
            element={<Categories language={language} />}
          />

          <Route
            path="/:categorySlug"
            element={<CategoryPage language={language} />}
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
      <Footer language={language} />
    </>
  );
}

export default App;