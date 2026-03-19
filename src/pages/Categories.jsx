import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import '../styles/home.css';
import categoriesData from '../tools/data/categoriesData';
import toolsData from '../tools/data/toolsData';

function Categories({ language }) {
  usePageMeta(
    language === 'ar'
      ? 'تصنيفات الأدوات - QuickoTools'
      : 'Tool Categories - QuickoTools',
    language === 'ar'
      ? 'استكشف تصنيفات أدوات QuickoTools للوصول السريع إلى الحاسبات والمولدات وأدوات النص وأدوات المطورين وأدوات التحويل.'
      : 'Explore QuickoTools categories to quickly find calculators, generators, text tools, developer tools, and converters.'
  );

  const content = {
    en: {
      title: 'Browse Tool Categories',
      description:
        'Explore QuickoTools by category and discover the right tools faster.',
      open: 'Open Category',
      toolsCount: 'tools'
    },
    ar: {
      title: 'تصفح تصنيفات الأدوات',
      description:
        'استكشف QuickoTools حسب التصنيف للوصول إلى الأدوات المناسبة بشكل أسرع.',
      open: 'افتح التصنيف',
      toolsCount: 'أدوات'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  const publishedTools = useMemo(() => {
    return toolsData.filter((tool) => tool.isPublished);
  }, []);

  const categoriesWithCounts = useMemo(() => {
    return categoriesData.map((category) => {
      const toolsCount = publishedTools.filter(
        (tool) => tool.category === category.slug
      ).length;

      return {
        ...category,
        toolsCount
      };
    });
  }, [publishedTools]);

  return (
    <main className="home-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <section className="hero-section">
        <div className="hero-container hero-surface page-hero-surface">
          <div className="page-hero-content">
            <span className="hero-badge">QuickoTools</span>
            <h1 className="hero-title page-hero-title">{t.title}</h1>
            <p className="hero-text">{t.description}</p>
          </div>
        </div>
      </section>

      <section className="tools-section">
        <div className="tools-container">
          <div className="category-grid">
            {categoriesWithCounts.map((category) => (
              <div key={category.slug} className="category-card">
                <div className="category-card-content">
                  <div className="category-card-top">
                    <h2 className="category-card-title">
                      {language === 'ar' ? category.nameAr : category.name}
                    </h2>

                    <span className="category-tools-count">
                      {category.toolsCount} {t.toolsCount}
                    </span>
                  </div>

                  <p className="category-card-description">
                    {language === 'ar'
                      ? category.descriptionAr
                      : category.description}
                  </p>
                </div>

                <Link
                  to={`/categories/${category.slug}`}
                  className="tool-card-button"
                >
                  {t.open}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Categories;