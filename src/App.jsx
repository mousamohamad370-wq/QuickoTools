import { Suspense, useEffect, useState, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import toolsRegistry from './tools/registry/toolsRegistry.jsx';
import './styles/layout.css';

const Home = lazy(() => import('./pages/Home'));
const Categories = lazy(() => import('./pages/Categories'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms.jsx'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div className="page-loader">
      <div className="page-loader-spinner"></div>
      <p className="page-loader-text">Loading...</p>
    </div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
      }

      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
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
      <ScrollToTop />
      <Navbar language={language} setLanguage={setLanguage} />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home language={language} />} />

          <Route
            path="/categories"
            element={<Categories language={language} />}
          />
          <Route
            path="/categories/:categorySlug"
            element={<CategoryPage language={language} />}
          />

          <Route path="/about" element={<About language={language} />} />
          <Route path="/contact" element={<Contact language={language} />} />
          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy language={language} />}
          />
          <Route
            path="/terms-of-service"
            element={<Terms language={language} />}
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

          <Route path="*" element={<NotFound language={language} />} />
        </Routes>
      </Suspense>

      <Footer language={language} />
    </>
  );
}

export default App;