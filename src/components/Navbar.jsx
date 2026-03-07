import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ language, setLanguage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const content = {
    en: {
      brand: 'QuickoTools',
      home: 'Home',
      categories: 'Categories',
      popular: 'Popular Tools',
      menu: 'Menu',
      languageButton: 'AR'
    },
    ar: {
      brand: 'كويكو تولز',
      home: 'الرئيسية',
      categories: 'التصنيفات',
      popular: 'الأدوات الشائعة',
      menu: 'القائمة',
      languageButton: 'EN'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="site-navbar">
      <div className="site-navbar-container">
        <Link to="/" className="site-navbar-brand" onClick={handleCloseMenu}>
          {t.brand}
        </Link>

        <nav className={`site-navbar-links ${isMenuOpen ? 'is-open' : ''}`}>
          <Link to="/" className="site-navbar-link" onClick={handleCloseMenu}>
            {t.home}
          </Link>

          <Link
            to="/categories"
            className="site-navbar-link"
            onClick={handleCloseMenu}
          >
            {t.categories}
          </Link>

          <a
            href="/#popular-tools"
            className="site-navbar-link"
            onClick={handleCloseMenu}
          >
            {t.popular}
          </a>

          <button
            type="button"
            onClick={handleLanguageToggle}
            className="site-navbar-language-button"
          >
            {t.languageButton}
          </button>
        </nav>

        <button
          type="button"
          className="site-navbar-menu-button"
          onClick={handleMenuToggle}
        >
          {t.menu}
        </button>
      </div>
    </header>
  );
}

export default Navbar;