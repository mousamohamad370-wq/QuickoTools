import usePageMeta from '../hooks/usePageMeta';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import ToolCard from '../components/ToolCard';
import toolsData from '../tools/toolsData';

function Home({ language }) {
  usePageMeta(
  language === 'ar'
    ? 'QuickoTools - أدوات مجانية أونلاين'
    : 'QuickoTools - Free Online Tools',
  language === 'ar'
    ? 'مجموعة أدوات أونلاين مجانية تشمل الحاسبات والمولدات وأدوات النص وأدوات المطورين.'
    : 'Free online tools for everyday tasks including calculators, generators, text tools, and developer tools.'
);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      name: 'Generators',
      nameAr: 'المولدات',
      slug: 'generators',
      description: 'Tools for generating passwords, QR codes, slugs, and more.',
      descriptionAr: 'أدوات لإنشاء كلمات المرور ورموز QR والـ Slugs وغيرها.'
    },
    {
      name: 'Calculators',
      nameAr: 'الحاسبات',
      slug: 'calculators',
      description: 'Useful calculation tools like age, BMI, and percentage calculators.',
      descriptionAr: 'أدوات حساب مفيدة مثل العمر وBMI والنسبة المئوية.'
    },
    {
      name: 'Text Tools',
      nameAr: 'أدوات النص',
      slug: 'text-tools',
      description: 'Tools for counting, cleaning, and improving text.',
      descriptionAr: 'أدوات لعدّ النص وتنظيفه وتحسينه.'
    },
    {
      name: 'Developer Tools',
      nameAr: 'أدوات المطورين',
      slug: 'developer-tools',
      description: 'Formatting and developer-focused utilities.',
      descriptionAr: 'أدوات تنسيق وخدمات مفيدة للمطورين.'
    },
    {
      name: 'Converters',
      nameAr: 'أدوات التحويل',
      slug: 'converters',
      description: 'Convert text and content into different formats.',
      descriptionAr: 'حوّل النصوص والمحتوى إلى صيغ مختلفة.'
    },
    {
      name: 'Random Tools',
      nameAr: 'أدوات متنوعة',
      slug: 'random-tools',
      description: 'Extra useful tools that do not fit into other categories.',
      descriptionAr: 'أدوات إضافية مفيدة لا تندرج بسهولة تحت تصنيف آخر.'
    }
  ];

  const popularToolPaths = [
    '/age-calculator',
    '/bmi-calculator',
    '/word-counter',
    '/json-formatter',
    '/password-generator',
    '/qr-code-generator'
  ];

  const content = {
    en: {
      heroTitle: 'Free Online Tools for Everyday Tasks',
      heroText:
        'QuickoTools brings together fast, simple, and useful online tools for calculators, generators, text utilities, and developer workflows.',
      heroSubText:
        'Designed for daily use on desktop and mobile, with clean pages, quick results, and organized categories.',
      heroCtaPrimary: 'Explore Categories',
      heroCtaSecondary: 'View Popular Tools',
      searchTitle: 'Find the right tool quickly',
      searchText:
        'Search by tool name or description to jump directly to the tool you need.',
      searchPlaceholder: 'Search tools by name or description...',
      searchResultsTitle: 'Search Results',
      categoriesTitle: 'Browse by Category',
      categoriesText:
        'Explore the main sections of QuickoTools and find the right tool faster.',
      popularTitle: 'Popular Tools',
      popularText:
        'Start with some of the most frequently used tools on the site.',
      noToolsTitle: 'No tools found',
      noToolsText: 'Try searching with a different keyword.',
      openCategory: 'Open Category',
      whyTitle: 'Why QuickoTools',
      whyItems: [
        {
          title: 'Free to use',
          description: 'Use tools instantly without unnecessary steps.'
        },
        {
          title: 'Fast and simple',
          description: 'Clean and lightweight pages focused on getting results quickly.'
        },
        {
          title: 'Works everywhere',
          description: 'Built for mobile, tablet, and desktop browsing.'
        },
        {
          title: 'Well organized',
          description: 'Browse tools through clear categories and direct search.'
        }
      ]
    },
    ar: {
      heroTitle: 'أدوات أونلاين مجانية للمهام اليومية',
      heroText:
        'يجمع QuickoTools أدوات سريعة وبسيطة ومفيدة تشمل الحاسبات والمولدات وأدوات النص وأدوات المطورين.',
      heroSubText:
        'مصمم للاستخدام اليومي على الهاتف والكمبيوتر، مع صفحات واضحة ونتائج سريعة وتصنيفات منظمة.',
      heroCtaPrimary: 'استكشف التصنيفات',
      heroCtaSecondary: 'عرض الأدوات الشائعة',
      searchTitle: 'اعثر على الأداة المناسبة بسرعة',
      searchText:
        'ابحث باسم الأداة أو وصفها للوصول مباشرة إلى الأداة التي تحتاجها.',
      searchPlaceholder: 'ابحث عن أداة بالاسم أو الوصف...',
      searchResultsTitle: 'نتائج البحث',
      categoriesTitle: 'تصفح حسب التصنيف',
      categoriesText:
        'استكشف الأقسام الرئيسية في QuickoTools واعثر على الأداة المناسبة بشكل أسرع.',
      popularTitle: 'الأدوات الشائعة',
      popularText:
        'ابدأ ببعض الأدوات الأكثر استخدامًا داخل الموقع.',
      noToolsTitle: 'لم يتم العثور على أدوات',
      noToolsText: 'جرّب كلمة بحث مختلفة.',
      openCategory: 'افتح التصنيف',
      whyTitle: 'لماذا QuickoTools',
      whyItems: [
        {
          title: 'مجاني للاستخدام',
          description: 'استخدم الأدوات مباشرة بدون خطوات غير ضرورية.'
        },
        {
          title: 'سريع وبسيط',
          description: 'صفحات خفيفة وواضحة تركّز على الوصول للنتيجة بسرعة.'
        },
        {
          title: 'يعمل على كل الأجهزة',
          description: 'مصمم للعمل على الهاتف والتابلت والكمبيوتر.'
        },
        {
          title: 'منظم بوضوح',
          description: 'تصفح الأدوات عبر تصنيفات واضحة وبحث مباشر.'
        }
      ]
    }
  };

  const currentContent = content[language];

  const filteredTools = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    if (!value) {
      return [];
    }

    return toolsData.filter((tool) => {
      const toolName =
        language === 'ar' && tool.nameAr
          ? tool.nameAr.toLowerCase()
          : tool.name.toLowerCase();

      const toolDescription =
        language === 'ar' && tool.descriptionAr
          ? tool.descriptionAr.toLowerCase()
          : tool.description.toLowerCase();

      return toolName.includes(value) || toolDescription.includes(value);
    });
  }, [searchTerm, language]);

  const popularTools = useMemo(() => {
    return toolsData.filter((tool) => popularToolPaths.includes(tool.path));
  }, []);

  return (
    <main className="home-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <section className="hero-section">
        <div className="hero-container hero-surface">
          <div className="hero-content">
            <div className="hero-copy">
              <span className="hero-badge">QuickoTools</span>

              <h1 className="hero-title">{currentContent.heroTitle}</h1>

              <p className="hero-text">{currentContent.heroText}</p>
              <p className="hero-subtext">{currentContent.heroSubText}</p>

              <div className="hero-actions">
                <a href="#categories-section" className="tool-card-button">
                  {currentContent.heroCtaPrimary}
                </a>

                <a
                  href="#popular-tools"
                  className="tool-card-button hero-secondary-button"
                >
                  {currentContent.heroCtaSecondary}
                </a>
              </div>
            </div>

            <div className="hero-orbs" aria-hidden="true">
              <span className="hero-orb hero-orb-one"></span>
              <span className="hero-orb hero-orb-two"></span>
              <span className="hero-orb hero-orb-three"></span>
              <span className="hero-orb hero-orb-four"></span>
              <span className="hero-orb hero-orb-five"></span>
            </div>
          </div>
        </div>
      </section>

      <section className="tools-section search-section">
        <div className="tools-container">
          <div className="tools-header">
            <h2 className="tools-section-title">{currentContent.searchTitle}</h2>
            <p className="hero-text">{currentContent.searchText}</p>

            <div className="tools-search-box tools-search-box-large">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={currentContent.searchPlaceholder}
                className="tools-search-input"
              />
            </div>
          </div>

          {searchTerm.trim() !== '' && (
            <>
              {filteredTools.length > 0 ? (
                <>
                  <div className="tools-header tools-header-compact">
                    <h2 className="tools-section-title">
                      {currentContent.searchResultsTitle}
                    </h2>
                  </div>

                  <div className="tools-grid">
                    {filteredTools.map((tool) => (
                      <ToolCard
                        key={tool.path}
                        name={
                          language === 'ar' && tool.nameAr
                            ? tool.nameAr
                            : tool.name
                        }
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
                </>
              ) : (
                <div className="tools-empty-state">
                  <h3>{currentContent.noToolsTitle}</h3>
                  <p>{currentContent.noToolsText}</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="tools-section" id="categories-section">
        <div className="tools-container">
          <div className="tools-header">
            <h2 className="tools-section-title">
              {currentContent.categoriesTitle}
            </h2>
            <p className="hero-text">{currentContent.categoriesText}</p>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <div key={category.slug} className="category-card">
                <div className="category-card-content">
                  <h3 className="category-card-title">
                    {language === 'ar' ? category.nameAr : category.name}
                  </h3>

                  <p className="category-card-description">
                    {language === 'ar'
                      ? category.descriptionAr
                      : category.description}
                  </p>
                </div>

                <Link to={`/${category.slug}`} className="tool-card-button">
                  {currentContent.openCategory}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tools-section" id="popular-tools">
        <div className="tools-container">
          <div className="tools-header">
            <h2 className="tools-section-title">
              {currentContent.popularTitle}
            </h2>
            <p className="hero-text">{currentContent.popularText}</p>
          </div>

          <div className="tools-grid">
            {popularTools.map((tool) => (
              <ToolCard
                key={tool.path}
                name={
                  language === 'ar' && tool.nameAr ? tool.nameAr : tool.name
                }
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
        </div>
      </section>

      <section className="tools-section">
        <div className="tools-container">
          <div className="tools-header">
            <h2 className="tools-section-title">{currentContent.whyTitle}</h2>
          </div>

          <div className="tools-grid">
            {currentContent.whyItems.map((item) => (
              <div key={item.title} className="tool-card">
                <h3 className="tool-card-title">{item.title}</h3>
                <p className="tool-card-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;