import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import ToolCard from '../components/ToolCard';
import toolsData from '../tools/toolsData';

function Home({ language, setLanguage }) {
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

  const content = {
    en: {
      heroTitle: 'QuickoTools',
      heroText:
        'Fast, simple, and free online tools for everyday tasks. Built for speed, usability, and clean results on desktop and mobile.',
      categoriesTitle: 'Browse by Category',
      sectionTitle: 'Popular Free Tools',
      searchPlaceholder: 'Search tools...',
      noToolsTitle: 'No tools found',
      noToolsText: 'Try searching with a different keyword.',
      languageButton: 'AR',
      openCategory: 'Open Category'
    },
    ar: {
      heroTitle: 'كويكو تولز',
      heroText:
        'أدوات مجانية سريعة وبسيطة للمهام اليومية، مصممة لتكون سهلة الاستخدام وسريعة على الهاتف والكمبيوتر.',
      categoriesTitle: 'تصفح حسب التصنيف',
      sectionTitle: 'أشهر الأدوات المجانية',
      searchPlaceholder: 'ابحث عن أداة...',
      noToolsTitle: 'لم يتم العثور على أدوات',
      noToolsText: 'جرّب كلمة بحث مختلفة.',
      languageButton: 'EN',
      openCategory: 'افتح التصنيف'
    }
  };

  const currentContent = content[language];

  const filteredTools = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    if (!value) {
      return toolsData;
    }

    return toolsData.filter((tool) => {
      const toolName =
        language === 'ar' && tool.nameAr ? tool.nameAr.toLowerCase() : tool.name.toLowerCase();

      const toolDescription =
        language === 'ar' && tool.descriptionAr
          ? tool.descriptionAr.toLowerCase()
          : tool.description.toLowerCase();

      return toolName.includes(value) || toolDescription.includes(value);
    });
  }, [searchTerm, language]);

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <main className="home-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <section className="hero-section">
        <div className="hero-container">
          <button
            type="button"
            onClick={handleLanguageToggle}
            className="language-toggle-button"
          >
            {currentContent.languageButton}
          </button>

          <h1 className="hero-title">{currentContent.heroTitle}</h1>

          <p className="hero-text">{currentContent.heroText}</p>
        </div>
      </section>

      <section className="tools-section">
        <div className="tools-container">
          <div className="tools-header">
            <h2 className="tools-section-title">{currentContent.categoriesTitle}</h2>
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

      <section className="tools-section">
        <div className="tools-container">
          <div className="tools-header">
            <h2 className="tools-section-title">{currentContent.sectionTitle}</h2>

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

          {filteredTools.length > 0 ? (
            <div className="tools-grid">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.path}
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
              <h3>{currentContent.noToolsTitle}</h3>
              <p>{currentContent.noToolsText}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;