import { useMemo, useState } from 'react';
import '../styles/home.css';
import ToolCard from '../components/ToolCard';
import toolsRegistry from '../tools/toolsRegistry';

function Home({ language, setLanguage }) {
  const [searchTerm, setSearchTerm] = useState('');

  const content = {
    en: {
      heroTitle: 'QuickoTools',
      heroText:
        'Fast, simple, and free online tools for everyday tasks. Built for speed, usability, and clean results on desktop and mobile.',
      sectionTitle: 'Popular Free Tools',
      searchPlaceholder: 'Search tools...',
      noToolsTitle: 'No tools found',
      noToolsText: 'Try searching with a different keyword.',
      languageButton: 'AR'
    },
    ar: {
      heroTitle: 'كويكو تولز',
      heroText:
        'أدوات مجانية سريعة وبسيطة للمهام اليومية، مصممة لتكون سهلة الاستخدام وسريعة على الهاتف والكمبيوتر.',
      sectionTitle: 'أشهر الأدوات المجانية',
      searchPlaceholder: 'ابحث عن أداة...',
      noToolsTitle: 'لم يتم العثور على أدوات',
      noToolsText: 'جرّب كلمة بحث مختلفة.',
      languageButton: 'EN'
    }
  };

  const currentContent = content[language];

  const filteredTools = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    if (!value) {
      return toolsRegistry;
    }

    return toolsRegistry.filter((tool) => {
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