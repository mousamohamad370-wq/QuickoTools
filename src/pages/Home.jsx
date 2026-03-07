import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import ToolCard from '../components/ToolCard';
import toolsData from '../tools/toolsData';

function Home({ language }) {
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
      heroTitle: 'QuickoTools',
      heroText:
        'Free online tools for everyday tasks. Fast, simple, and designed to work smoothly on desktop and mobile.',
      heroCtaPrimary: 'Browse Categories',
      heroCtaSecondary: 'View Popular Tools',
      introTitle: 'Simple tools for daily use',
      introText:
        'QuickoTools helps you solve everyday tasks with free online tools for calculators, generators, text tools, developer tools, and more.',
      searchTitle: 'Find a tool quickly',
      searchText:
        'Search by tool name or description to jump directly to the right tool.',
      categoriesTitle: 'Browse by Category',
      categoriesText:
        'Find the right tool faster by exploring our main tool categories.',
      popularTitle: 'Popular Tools',
      popularText:
        'Start with some of the most useful tools used by visitors every day.',
      searchPlaceholder: 'Search by tool name or description...',
      searchResultsTitle: 'Search Results',
      noToolsTitle: 'No tools found',
      noToolsText: 'Try searching with a different keyword.',
      openCategory: 'Open Category',
      whyTitle: 'Why QuickoTools',
      whyItems: [
        {
          title: 'Free to use',
          description: 'Use all tools online without complicated steps.'
        },
        {
          title: 'Fast and simple',
          description: 'Clean and lightweight tools designed for quick results.'
        },
        {
          title: 'Works on mobile and desktop',
          description: 'Built to work smoothly across phones, tablets, and computers.'
        },
        {
          title: 'Multiple tool categories',
          description: 'Browse calculators, generators, text tools, developer tools, and more.'
        }
      ]
    },
    ar: {
      heroTitle: 'كويكو تولز',
      heroText:
        'أدوات أونلاين مجانية للمهام اليومية. سريعة وبسيطة ومصممة لتعمل بسلاسة على الهاتف والكمبيوتر.',
      heroCtaPrimary: 'تصفح التصنيفات',
      heroCtaSecondary: 'عرض الأدوات الشائعة',
      introTitle: 'أدوات بسيطة للاستخدام اليومي',
      introText:
        'يساعدك QuickoTools في إنجاز المهام اليومية عبر أدوات مجانية أونلاين تشمل الحاسبات والمولدات وأدوات النص وأدوات المطورين وغيرها.',
      searchTitle: 'اعثر على الأداة بسرعة',
      searchText:
        'ابحث باسم الأداة أو وصفها للوصول مباشرة إلى الأداة المناسبة.',
      categoriesTitle: 'تصفح حسب التصنيف',
      categoriesText:
        'اعثر على الأداة المناسبة بسرعة عبر استكشاف التصنيفات الرئيسية.',
      popularTitle: 'الأدوات الشائعة',
      popularText:
        'ابدأ ببعض الأدوات الأكثر استخدامًا بين الزوار يوميًا.',
      searchPlaceholder: 'ابحث باسم الأداة أو وصفها...',
      searchResultsTitle: 'نتائج البحث',
      noToolsTitle: 'لم يتم العثور على أدوات',
      noToolsText: 'جرّب كلمة بحث مختلفة.',
      openCategory: 'افتح التصنيف',
      whyTitle: 'لماذا QuickoTools',
      whyItems: [
        {
          title: 'مجاني للاستخدام',
          description: 'استخدم جميع الأدوات أونلاين بدون خطوات معقدة.'
        },
        {
          title: 'سريع وبسيط',
          description: 'أدوات خفيفة ونظيفة مصممة لإعطاء نتائج سريعة.'
        },
        {
          title: 'يعمل على الهاتف والكمبيوتر',
          description: 'مصمم ليعمل بسلاسة على الجوال والتابلت والكمبيوتر.'
        },
        {
          title: 'تصنيفات أدوات متعددة',
          description: 'تصفح الحاسبات والمولدات وأدوات النص وأدوات المطورين وغيرها.'
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
        <div className="hero-container">
          <h1 className="hero-title">{currentContent.heroTitle}</h1>

          <p className="hero-text">{currentContent.heroText}</p>

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
      </section>

      <section className="tools-section">
        <div className="tools-container">
          <div className="tools-header">
            <h2 className="tools-section-title">
              {currentContent.introTitle}
            </h2>
            <p className="hero-text">{currentContent.introText}</p>
          </div>
        </div>
      </section>

      <section className="tools-section">
        <div className="tools-container">
          <div className="tools-header">
            <h2 className="tools-section-title">
              {currentContent.searchTitle}
            </h2>
            <p className="hero-text">{currentContent.searchText}</p>

            <div className="tools-search-box">
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
                  <div className="tools-header">
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

          <div className="tools-grid">
            {categories.map((category) => (
              <div key={category.slug} className="tool-card">
                <h3 className="tool-card-title">
                  {language === 'ar' ? category.nameAr : category.name}
                </h3>

                <p className="tool-card-description">
                  {language === 'ar'
                    ? category.descriptionAr
                    : category.description}
                </p>

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