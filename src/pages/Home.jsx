import usePageMeta from '../hooks/usePageMeta';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import ToolCard from '../components/ToolCard';
import toolsData from '../tools/data/toolsData';
import categoriesData from '../tools/data/categoriesData';

function Home({ language }) {
  const isArabic = language === 'ar';

  usePageMeta(
    isArabic
      ? 'QuickoTools - أدوات مجانية أونلاين للحساب والنصوص والتحويل'
      : 'QuickoTools - Free Online Tools for Calculators, Text, Generators and More',
    isArabic
      ? 'اكتشف أدوات أونلاين مجانية وسريعة تشمل الحاسبات والمولدات وأدوات النص وأدوات المطورين وأدوات التحويل للاستخدام اليومي.'
      : 'Discover fast and free online tools for calculators, generators, text tools, developer utilities, converters, and more.'
  );

  const [searchTerm, setSearchTerm] = useState('');

  const content = {
    en: {
      heroBadge: 'Free • Fast • No Sign-Up',
      heroTitle: 'Free Online Tools for Text, PDF, Calculators and Developers',
      heroText:
        'QuickoTools helps you finish everyday tasks faster with clean and practical online tools for text editing, PDF utilities, generators, calculators, and developer workflows.',
      heroSubText:
        'Built for speed and simplicity on desktop and mobile, with organized categories, quick search, and a growing library of useful tools.',
      heroCtaPrimary: 'Browse Categories',
      heroCtaSecondary: 'Popular Tools',
      heroCtaTertiary: 'Search Tools',

      stats: [
        { value: '100%', label: 'Free Tools' },
        { value: '2', label: 'Languages' },
        { value: 'No Sign-Up', label: 'Instant Access' }
      ],

      heroVisual: {
        toolsCountLabel: 'Published Tools',
        toolsCountSubLabel: 'Updated as new tools launch'
      },

      searchTitle: 'Find the right tool quickly',
      searchText:
        'Search by tool name, description, or keywords to jump directly to the tool you need.',
      searchPlaceholder:
        'Search: PDF Merger, Word Counter, JSON Formatter, Password Generator...',
      searchResultsTitle: 'Search Results',
      searchResultsCount: 'results found',
      clearSearch: 'Clear Search',
      quickSearchTitle: 'Try',
      quickSearches: [
        'Age Calculator',
        'Word Counter',
        'JSON Formatter',
        'Password Generator'
      ],

      categoriesTitle: 'Browse by Category',
      categoriesText:
        'Explore QuickoTools through clear categories to find the right tool faster.',
      categoryToolsCount: 'tools',
      openCategory: 'Open Category',

      popularTitle: 'Popular Tools',
      popularText:
        'Start with some of the most commonly used tools on QuickoTools.',

      noToolsTitle: 'No tools found',
      noToolsText:
        'Try another keyword or browse categories and popular tools below.',
      browseCategories: 'Browse Categories',
      viewPopularTools: 'View Popular Tools',

      whyTitle: 'Why QuickoTools',
      whyText:
        'QuickoTools is built to stay practical, lightweight, and easy to use as the library continues to grow.',
      whyItems: [
        {
          title: 'Free to use',
          description:
            'Use tools instantly without unnecessary steps, accounts, or signups.'
        },
        {
          title: 'Fast and simple',
          description:
            'Clean pages focused on helping you get results quickly with less friction.'
        },
        {
          title: 'Works everywhere',
          description:
            'Designed to work smoothly on mobile, tablet, and desktop devices.'
        },
        {
          title: 'Well organized',
          description:
            'Browse tools through clear categories, direct search, and popular picks.'
        }
      ],

      featuredSectionTitle: 'What you can do here',
      featuredSectionText:
        'QuickoTools covers common daily tasks for students, professionals, creators, and developers.',
      featuredHighlights: [
        'Count words and characters',
        'Merge and inspect PDF files',
        'Generate passwords and QR codes',
        'Format JSON and encode URLs'
      ]
    },

    ar: {
      heroBadge: 'مجاني • سريع • بدون تسجيل',
      heroTitle: 'أدوات أونلاين مجانية للنصوص وPDF والحاسبات والمطورين',
      heroText:
        'يساعدك QuickoTools على إنجاز المهام اليومية بسرعة من خلال أدوات عملية ونظيفة للنصوص وملفات PDF والحاسبات والمولدات وأدوات المطورين.',
      heroSubText:
        'تم تصميمه ليكون سريعًا وبسيطًا على الهاتف والكمبيوتر، مع تصنيفات واضحة، وبحث سريع، ومكتبة أدوات متنامية.',
      heroCtaPrimary: 'تصفح التصنيفات',
      heroCtaSecondary: 'الأدوات الشائعة',
      heroCtaTertiary: 'ابحث عن أداة',

      stats: [
        { value: '100%', label: 'أدوات مجانية' },
        { value: '2', label: 'لغات' },
        { value: 'بدون تسجيل', label: 'استخدام مباشر' }
      ],

      heroVisual: {
        toolsCountLabel: 'أداة منشورة',
        toolsCountSubLabel: 'يتم التحديث مع إضافة أدوات جديدة'
      },

      searchTitle: 'اعثر على الأداة المناسبة بسرعة',
      searchText:
        'ابحث باسم الأداة أو وصفها أو الكلمات المفتاحية للوصول مباشرة إلى الأداة التي تحتاجها.',
      searchPlaceholder:
        'ابحث: دمج PDF، عداد الكلمات، منسق JSON، مولد كلمات المرور...',
      searchResultsTitle: 'نتائج البحث',
      searchResultsCount: 'نتيجة',
      clearSearch: 'مسح البحث',
      quickSearchTitle: 'جرّب',
      quickSearches: [
        'حاسبة العمر',
        'عداد الكلمات',
        'منسق JSON',
        'مولد كلمات المرور'
      ],

      categoriesTitle: 'تصفح حسب التصنيف',
      categoriesText:
        'استكشف أقسام QuickoTools بسهولة واعثر على الأداة المناسبة بشكل أسرع.',
      categoryToolsCount: 'أدوات',
      openCategory: 'افتح التصنيف',

      popularTitle: 'الأدوات الشائعة',
      popularText:
        'ابدأ ببعض الأدوات الأكثر استخدامًا داخل QuickoTools.',

      noToolsTitle: 'لم يتم العثور على أدوات',
      noToolsText:
        'جرّب كلمة مختلفة أو تصفح التصنيفات والأدوات الشائعة بالأسفل.',
      browseCategories: 'تصفح التصنيفات',
      viewPopularTools: 'عرض الأدوات الشائعة',

      whyTitle: 'لماذا QuickoTools',
      whyText:
        'تم تصميم QuickoTools ليبقى عمليًا وخفيفًا وسهل الاستخدام مع استمرار نمو مكتبة الأدوات.',
      whyItems: [
        {
          title: 'مجاني للاستخدام',
          description:
            'استخدم الأدوات مباشرة بدون خطوات غير ضرورية أو إنشاء حساب.'
        },
        {
          title: 'سريع وبسيط',
          description:
            'صفحات خفيفة وواضحة تركّز على الوصول إلى النتيجة بسرعة.'
        },
        {
          title: 'يعمل على كل الأجهزة',
          description:
            'مصمم ليعمل بسلاسة على الهاتف والتابلت والكمبيوتر.'
        },
        {
          title: 'منظّم بوضوح',
          description:
            'تصفح الأدوات عبر تصنيفات واضحة وبحث مباشر وأدوات شائعة.'
        }
      ],

      featuredSectionTitle: 'ماذا يمكنك أن تفعل هنا',
      featuredSectionText:
        'يوفر QuickoTools أدوات يومية مفيدة للطلاب والمحترفين وصنّاع المحتوى والمطورين.',
      featuredHighlights: [
        'حساب الكلمات والأحرف',
        'دمج ملفات PDF وقراءة معلوماتها',
        'إنشاء كلمات مرور ورموز QR',
        'تنسيق JSON وترميز الروابط'
      ]
    }
  };

  const currentContent = content[language] || content.en;

  const publishedTools = useMemo(() => {
    return toolsData.filter((tool) => tool.isPublished);
  }, []);

  const popularTools = useMemo(() => {
    return publishedTools.filter((tool) => tool.isPopular);
  }, [publishedTools]);

  const filteredTools = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    if (!value) {
      return [];
    }

    return publishedTools.filter((tool) => {
      const toolName =
        isArabic && tool.nameAr ? tool.nameAr.toLowerCase() : tool.name.toLowerCase();

      const toolDescription =
        isArabic && tool.descriptionAr
          ? tool.descriptionAr.toLowerCase()
          : tool.description.toLowerCase();

      const toolKeywords = (
        isArabic && Array.isArray(tool.keywordsAr)
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
  }, [searchTerm, isArabic, publishedTools]);

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
    <main className="home-page" dir={isArabic ? 'rtl' : 'ltr'}>
      <section className="hero-section">
        <div className="hero-container hero-surface">
          <div className="hero-content">
            <div className="hero-copy">
              <span className="hero-badge">{currentContent.heroBadge}</span>

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
                {currentContent.stats.map((item) => (
                  <div key={item.label} className="home-stat-card">
                    <span className="home-stat-value">{item.value}</span>
                    <span className="home-stat-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-tools-visual" aria-hidden="true">
              <div className="hero-search-mock">
                <span className="hero-search-text">
                  {publishedTools.length} {isArabic ? 'أداة' : 'Tools'}
                </span>
                <span className="hero-search-icon">🧰</span>
              </div>

              <div className="hero-tools-grid">
                <div className="hero-tool-card hero-tool-card-count">
                  <span className="hero-tool-count-number">
                    {publishedTools.length}
                  </span>
                  <span>{currentContent.heroVisual.toolsCountLabel}</span>
                  <small>{currentContent.heroVisual.toolsCountSubLabel}</small>
                </div>

                <div className="hero-tool-card">
                  <span className="hero-tool-icon">📝</span>
                  <span>{isArabic ? 'نصوص' : 'Text'}</span>
                </div>

                <div className="hero-tool-card">
                  <span className="hero-tool-icon">📄</span>
                  <span>PDF</span>
                </div>

                <div className="hero-tool-card">
                  <span className="hero-tool-icon">⚡</span>
                  <span>{isArabic ? 'سريع' : 'Fast'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tools-section">
        <div className="tools-container">
          <div className="tools-header">
            <h2 className="tools-section-title">
              {currentContent.featuredSectionTitle}
            </h2>
            <p className="hero-text">{currentContent.featuredSectionText}</p>
          </div>

          <div className="tools-grid">
            {currentContent.featuredHighlights.map((item) => (
              <div key={item} className="tool-card why-card">
                <h3 className="tool-card-title">{item}</h3>
              </div>
            ))}
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
                        name={isArabic && tool.nameAr ? tool.nameAr : tool.name}
                        description={
                          isArabic && tool.descriptionAr
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
                      {isArabic ? category.nameAr : category.name}
                    </h3>

                    <span className="category-tools-count">
                      {category.toolsCount} {currentContent.categoryToolsCount}
                    </span>
                  </div>

                  <p className="category-card-description">
                    {isArabic ? category.descriptionAr : category.description}
                  </p>
                </div>

                <Link
                  to={`/categories/${category.slug}`}
                  className="tool-card-button"
                >
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
            <span className="section-kicker">
              {isArabic ? 'الأكثر استخدامًا' : 'Most Used'}
            </span>
            <h2 className="tools-section-title">
              {currentContent.popularTitle}
            </h2>
            <p className="hero-text">{currentContent.popularText}</p>
          </div>

          <div className="tools-grid">
            {popularTools.map((tool) => (
              <ToolCard
                key={tool.id || tool.path}
                name={isArabic && tool.nameAr ? tool.nameAr : tool.name}
                description={
                  isArabic && tool.descriptionAr
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