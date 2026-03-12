import usePageMeta from '../hooks/usePageMeta';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import ToolCard from '../components/ToolCard';
import toolsData from '../tools/data/toolsData';
import categoriesData from '../tools/data/categoriesData';

function Home({ language }) {
  usePageMeta(
    language === 'ar'
      ? 'QuickoTools - أدوات مجانية أونلاين للحساب والنصوص والتحويل'
      : 'QuickoTools - Free Online Tools for Calculators, Text, Generators and More',
    language === 'ar'
      ? 'اكتشف أدوات أونلاين مجانية وسريعة تشمل الحاسبات والمولدات وأدوات النص وأدوات المطورين وأدوات التحويل للاستخدام اليومي.'
      : 'Discover fast and free online tools for calculators, generators, text tools, developer utilities, converters, and more.'
  );

  const [searchTerm, setSearchTerm] = useState('');

  const content = {
    en: {
      heroTitle: 'Free Online Tools for Everyday Tasks',
      heroText:
        'QuickoTools helps you solve everyday tasks with free online tools for calculators, generators, text utilities, converters, and developer workflows.',
      heroSubText:
        'Built for speed, simplicity, and clean results on desktop and mobile, with organized categories and a growing library of useful tools.',
      heroCtaPrimary: 'Explore Categories',
      heroCtaSecondary: 'View Popular Tools',
      heroCtaTertiary: 'Search Tools',

      stats: [
        { value: '100%', label: 'Free Tools' },
        { value: '2', label: 'Languages' },
        { value: 'Fast', label: 'Simple Experience' }
      ],
      statsAr: [
        { value: '100%', label: 'أدوات مجانية' },
        { value: '2', label: 'لغات' },
        { value: 'سريع', label: 'تجربة بسيطة' }
      ],

      searchTitle: 'Find the right tool quickly',
      searchText:
        'Search by tool name, description, or keywords to jump directly to the tool you need.',
      searchPlaceholder: 'Search tools by name, description, or keyword...',
      searchResultsTitle: 'Search Results',
      searchResultsCount: 'results found',
      clearSearch: 'Clear Search',
      quickSearchTitle: 'Try',
      quickSearches: ['Age Calculator', 'Word Counter', 'JSON Formatter', 'Password Generator'],

      categoriesTitle: 'Browse by Category',
      categoriesText:
        'Explore the main sections of QuickoTools and find useful tools faster through clear categories.',
      categoryToolsCount: 'tools',

      popularTitle: 'Popular Tools',
      popularText:
        'Start with some of the most commonly used tools currently featured on the site.',

      noToolsTitle: 'No tools found',
      noToolsText: 'Try searching with a different keyword or explore the categories below.',
      browseCategories: 'Browse Categories',
      viewPopularTools: 'View Popular Tools',

      openCategory: 'Open Category',

      whyTitle: 'Why QuickoTools',
      whyText:
        'QuickoTools is designed to stay practical, lightweight, and easy to use as the tool library continues to grow.',
      whyItems: [
        {
          title: 'Free to use',
          description: 'Use tools instantly without unnecessary steps or signups.'
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
        'يساعدك QuickoTools على إنجاز المهام اليومية من خلال أدوات أونلاين مجانية تشمل الحاسبات والمولدات وأدوات النص وأدوات التحويل وأدوات المطورين.',
      heroSubText:
        'تم تصميمه ليكون سريعًا وبسيطًا ويعطي نتائج واضحة على الهاتف والكمبيوتر، مع تصنيفات منظمة ومكتبة أدوات متنامية.',
      heroCtaPrimary: 'استكشف التصنيفات',
      heroCtaSecondary: 'عرض الأدوات الشائعة',
      heroCtaTertiary: 'ابحث عن أداة',

      stats: [
        { value: '100%', label: 'أدوات مجانية' },
        { value: '2', label: 'لغات' },
        { value: 'سريع', label: 'تجربة بسيطة' }
      ],
      statsAr: [
        { value: '100%', label: 'أدوات مجانية' },
        { value: '2', label: 'لغات' },
        { value: 'سريع', label: 'تجربة بسيطة' }
      ],

      searchTitle: 'اعثر على الأداة المناسبة بسرعة',
      searchText:
        'ابحث باسم الأداة أو وصفها أو الكلمات المفتاحية للوصول مباشرة إلى الأداة التي تحتاجها.',
      searchPlaceholder: 'ابحث عن أداة بالاسم أو الوصف أو كلمة مفتاحية...',
      searchResultsTitle: 'نتائج البحث',
      searchResultsCount: 'نتيجة',
      clearSearch: 'مسح البحث',
      quickSearchTitle: 'جرّب',
      quickSearches: ['حاسبة العمر', 'عداد الكلمات', 'منسق JSON', 'مولد كلمات المرور'],

      categoriesTitle: 'تصفح حسب التصنيف',
      categoriesText:
        'استكشف الأقسام الرئيسية في QuickoTools واعثر على الأدوات المفيدة بشكل أسرع من خلال تصنيفات واضحة.',
      categoryToolsCount: 'أدوات',

      popularTitle: 'الأدوات الشائعة',
      popularText:
        'ابدأ ببعض الأدوات الأكثر استخدامًا والمعروضة حاليًا داخل الموقع.',

      noToolsTitle: 'لم يتم العثور على أدوات',
      noToolsText: 'جرّب كلمة بحث مختلفة أو تصفح التصنيفات بالأسفل.',
      browseCategories: 'تصفح التصنيفات',
      viewPopularTools: 'عرض الأدوات الشائعة',

      openCategory: 'افتح التصنيف',

      whyTitle: 'لماذا QuickoTools',
      whyText:
        'تم تصميم QuickoTools ليبقى عمليًا وخفيفًا وسهل الاستخدام مع استمرار نمو مكتبة الأدوات.',
      whyItems: [
        {
          title: 'مجاني للاستخدام',
          description: 'استخدم الأدوات مباشرة بدون خطوات غير ضرورية أو تسجيل.'
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

  const currentContent = content[language] || content.en;
  const currentStats =
    language === 'ar' ? currentContent.statsAr : currentContent.stats;

  const publishedTools = useMemo(() => {
    return toolsData.filter((tool) => tool.isPublished);
  }, []);

  const filteredTools = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    if (!value) {
      return [];
    }

    return publishedTools.filter((tool) => {
      const toolName =
        language === 'ar' && tool.nameAr
          ? tool.nameAr.toLowerCase()
          : tool.name.toLowerCase();

      const toolDescription =
        language === 'ar' && tool.descriptionAr
          ? tool.descriptionAr.toLowerCase()
          : tool.description.toLowerCase();

      const toolKeywords = (
        language === 'ar' && Array.isArray(tool.keywordsAr)
          ? tool.keywordsAr
          : Array.isArray(tool.keywords)
          ? tool.keywords
          : []
      )
        .join(' ')
        .toLowerCase();

      const toolLanguages = Array.isArray(tool.languages)
        ? tool.languages.join(' ').toLowerCase()
        : '';

      return (
        toolName.includes(value) ||
        toolDescription.includes(value) ||
        toolKeywords.includes(value) ||
        toolLanguages.includes(value)
      );
    });
  }, [searchTerm, language, publishedTools]);

  const popularTools = useMemo(() => {
    return publishedTools.filter((tool) => tool.isPopular);
  }, [publishedTools]);

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

  const hasSearch = searchTerm.trim() !== '';

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

                <a
                  href="#search-tools"
                  className="tool-card-button hero-secondary-button"
                >
                  {currentContent.heroCtaTertiary}
                </a>
              </div>

              <div className="home-stats-grid">
                {currentStats.map((item) => (
                  <div key={item.label} className="home-stat-card">
                    <span className="home-stat-value">{item.value}</span>
                    <span className="home-stat-label">{item.label}</span>
                  </div>
                ))}
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

      <section className="tools-section search-section" id="search-tools">
        <div className="tools-container">
          <div className="tools-header">
            <h2 className="tools-section-title">{currentContent.searchTitle}</h2>
            <p className="hero-text">{currentContent.searchText}</p>

            <div className="tools-search-box tools-search-box-large">
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={currentContent.searchPlaceholder}
                className="tools-search-input"
                aria-label={currentContent.searchPlaceholder}
              />
            </div>

            <div className="quick-search-row">
              <span className="quick-search-label">
                {currentContent.quickSearchTitle}:
              </span>

              <div className="quick-search-tags">
                {currentContent.quickSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    className="quick-search-tag"
                    onClick={() => setSearchTerm(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {hasSearch && (
              <div className="hero-actions search-clear-actions">
                <button
                  type="button"
                  className="tool-card-button hero-secondary-button"
                  onClick={() => setSearchTerm('')}
                >
                  {currentContent.clearSearch}
                </button>
              </div>
            )}
          </div>

          {hasSearch && (
            <>
              {filteredTools.length > 0 ? (
                <>
                  <div className="tools-header tools-header-compact">
                    <h2 className="tools-section-title">
                      {currentContent.searchResultsTitle}
                    </h2>
                    <p className="hero-text">
                      {filteredTools.length} {currentContent.searchResultsCount}
                    </p>
                  </div>

                  <div className="tools-grid">
                    {filteredTools.map((tool) => (
                      <ToolCard
                        key={tool.id || tool.path}
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

                  <div className="empty-state-actions">
                    <a href="#categories-section" className="tool-card-button">
                      {currentContent.browseCategories}
                    </a>
                    <a
                      href="#popular-tools"
                      className="tool-card-button hero-secondary-button"
                    >
                      {currentContent.viewPopularTools}
                    </a>
                  </div>
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
            {categoriesWithCounts.map((category) => (
              <div key={category.slug} className="category-card">
                <div className="category-card-content">
                  <div className="category-card-top">
                    <h3 className="category-card-title">
                      {language === 'ar' ? category.nameAr : category.name}
                    </h3>

                    <span className="category-tools-count">
                      {category.toolsCount} {currentContent.categoryToolsCount}
                    </span>
                  </div>

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
            <span className="section-kicker">Most Used</span>
            <h2 className="tools-section-title">
              {currentContent.popularTitle}
            </h2>
            <p className="hero-text">{currentContent.popularText}</p>
          </div>

          <div className="tools-grid">
            {popularTools.map((tool) => (
              <ToolCard
                key={tool.id || tool.path}
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
            <p className="hero-text">{currentContent.whyText}</p>
          </div>

          <div className="tools-grid">
            {currentContent.whyItems.map((item) => (
              <div key={item.title} className="tool-card why-card">
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