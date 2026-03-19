import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import ToolCard from '../components/ToolCard';
import toolsData from '../tools/data/toolsData';
import categoriesData from '../tools/data/categoriesData';
import '../styles/home.css';

function CategoryPage({ language }) {
  const { categorySlug } = useParams();

  const pageContent = {
    en: {
      notFoundTitle: 'Category not found',
      notFoundText: 'This category does not exist on QuickoTools.',
      emptyTitle: 'No tools in this category yet',
      emptyText: 'More tools will be added soon.',
      browseCategories: 'Browse Categories',
      goHome: 'Go Home',
      toolsCount: 'tools'
    },
    ar: {
      notFoundTitle: 'التصنيف غير موجود',
      notFoundText: 'هذا التصنيف غير موجود على QuickoTools.',
      emptyTitle: 'لا توجد أدوات في هذا التصنيف حاليًا',
      emptyText: 'سيتم إضافة أدوات جديدة قريبًا.',
      browseCategories: 'تصفح التصنيفات',
      goHome: 'العودة للرئيسية',
      toolsCount: 'أدوات'
    }
  };

  const t = language === 'ar' ? pageContent.ar : pageContent.en;

  const currentCategory = useMemo(() => {
    return categoriesData.find((category) => category.slug === categorySlug);
  }, [categorySlug]);

  const publishedTools = useMemo(() => {
    return toolsData.filter((tool) => tool.isPublished);
  }, []);

  const filteredTools = useMemo(() => {
    return publishedTools.filter((tool) => tool.category === categorySlug);
  }, [publishedTools, categorySlug]);

  usePageMeta(
    currentCategory
      ? language === 'ar'
        ? `${currentCategory.nameAr} - QuickoTools`
        : `${currentCategory.name} - QuickoTools`
      : language === 'ar'
      ? 'التصنيف غير موجود - QuickoTools'
      : 'Category Not Found - QuickoTools',
    currentCategory
      ? language === 'ar'
        ? currentCategory.descriptionAr
        : currentCategory.description
      : language === 'ar'
      ? 'التصنيف المطلوب غير موجود في QuickoTools.'
      : 'The requested category does not exist on QuickoTools.'
  );

  if (!currentCategory) {
    return (
      <main className="home-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <section className="hero-section">
          <div className="hero-container hero-surface page-hero-surface">
            <div className="page-hero-content">
              <span className="hero-badge">QuickoTools</span>
              <h1 className="hero-title page-hero-title">{t.notFoundTitle}</h1>
              <p className="hero-text">{t.notFoundText}</p>

              <div className="hero-actions" style={{ justifyContent: 'center' }}>
                <Link to="/categories" className="tool-card-button">
                  {t.browseCategories}
                </Link>

                <Link to="/" className="tool-card-button hero-secondary-button">
                  {t.goHome}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="home-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <section className="hero-section">
        <div className="hero-container hero-surface page-hero-surface">
          <div className="page-hero-content">
            <span className="hero-badge">QuickoTools</span>

            <h1 className="hero-title page-hero-title">
              {language === 'ar' ? currentCategory.nameAr : currentCategory.name}
            </h1>

            <p className="hero-text">
              {language === 'ar'
                ? currentCategory.descriptionAr
                : currentCategory.description}
            </p>

            <p className="hero-text" style={{ marginTop: '12px' }}>
              <strong>{filteredTools.length}</strong> {t.toolsCount}
            </p>
          </div>
        </div>
      </section>

      <section className="tools-section">
        <div className="tools-container">
          {filteredTools.length > 0 ? (
            <div className="tools-grid">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.id || tool.path}
                  name={language === 'ar' && tool.nameAr ? tool.nameAr : tool.name}
                  description={
                    language === 'ar' && tool.descriptionAr
                      ? tool.descriptionAr
                      : tool.description
                  }
                  path={tool.path}
                  language={language}
                />
              ))}
            </div>
          ) : (
            <div className="tools-empty-state">
              <h3>{t.emptyTitle}</h3>
              <p>{t.emptyText}</p>

              <div className="empty-state-actions">
                <Link to="/categories" className="tool-card-button">
                  {t.browseCategories}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default CategoryPage;