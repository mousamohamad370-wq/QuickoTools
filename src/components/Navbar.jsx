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
      about: 'About',
      contact: 'Contact',
      menu: 'Menu',
      close: 'Close',
      languageButton: 'AR'
    },
    ar: {
      brand: 'كويكو تولز',
      home: 'الرئيسية',
      categories: 'التصنيفات',
      popular: 'الأدوات الشائعة',
      about: 'حول',
      contact: 'اتصل بنا',
      menu: 'القائمة',
      close: 'إغلاق',
      languageButton: 'EN'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
    setIsMenuOpen(false);
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
          <a href="/#top" className="site-navbar-link" onClick={handleCloseMenu}>
            {t.home}
          </a>

          <a
            href="/#categories-section"
            className="site-navbar-link"
            onClick={handleCloseMenu}
          >
            {t.categories}
          </a>

          <a
            href="/#popular-tools"
            className="site-navbar-link"
            onClick={handleCloseMenu}
          >
            {t.popular}
          </a>

          <Link
            to="/about"
            className="site-navbar-link"
            onClick={handleCloseMenu}
          >
            {t.about}
          </Link>

          <Link
            to="/contact"
            className="site-navbar-link"
            onClick={handleCloseMenu}
          >
            {t.contact}
          </Link>

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
          aria-label={isMenuOpen ? t.close : t.menu}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}

export default Navbar;