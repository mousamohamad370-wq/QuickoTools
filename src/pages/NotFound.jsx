import { Link } from 'react-router-dom';
import '../styles/home.css';

function NotFound({ language }) {
  const content = {
    en: {
      title: 'Page Not Found',
      description:
        'The page you are looking for does not exist or may have been moved.',
      buttonHome: 'Go to Home',
      buttonCategories: 'Browse Categories'
    },
    ar: {
      title: 'الصفحة غير موجودة',
      description:
        'الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها.',
      buttonHome: 'العودة إلى الرئيسية',
      buttonCategories: 'تصفح التصنيفات'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  return (
    <main className="home-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <section className="hero-section">
        <div className="hero-container hero-surface page-hero-surface">
          <div className="page-hero-content">
            <span className="hero-badge">404</span>
            <h1 className="hero-title page-hero-title">{t.title}</h1>
            <p className="hero-text">{t.description}</p>

            <div className="hero-actions">
              <Link to="/" className="tool-card-button">
                {t.buttonHome}
              </Link>

              <Link
                to="/categories"
                className="tool-card-button hero-secondary-button"
              >
                {t.buttonCategories}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default NotFound;