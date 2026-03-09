import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ToolCard from '../components/ToolCard';
import toolsData from '../tools/toolsData';
import '../styles/home.css';

function CategoryPage({ language }) {
  const { categorySlug } = useParams();

  const categoriesMap = {
    generators: {
      name: 'Generators',
      nameAr: 'المولدات',
      description: 'Tools for generating passwords, QR codes, slugs, and more.',
      descriptionAr: 'أدوات لإنشاء كلمات المرور ورموز QR والـ Slugs وغيرها.'
    },
    calculators: {
      name: 'Calculators',
      nameAr: 'الحاسبات',
      description: 'Useful calculation tools like age, BMI, and percentage calculators.',
      descriptionAr: 'أدوات حساب مفيدة مثل العمر وBMI والنسبة المئوية.'
    },
    'text-tools': {
      name: 'Text Tools',
      nameAr: 'أدوات النص',
      description: 'Tools for counting, cleaning, and improving text.',
      descriptionAr: 'أدوات لعدّ النص وتنظيفه وتحسينه.'
    },
    'developer-tools': {
      name: 'Developer Tools',
      nameAr: 'أدوات المطورين',
      description: 'Formatting and developer-focused utilities.',
      descriptionAr: 'أدوات تنسيق وخدمات مفيدة للمطورين.'
    },
    converters: {
      name: 'Converters',
      nameAr: 'أدوات التحويل',
      description: 'Convert text and content into different formats.',
      descriptionAr: 'حوّل النصوص والمحتوى إلى صيغ مختلفة.'
    },
    'random-tools': {
      name: 'Random Tools',
      nameAr: 'أدوات متنوعة',
      description: 'Extra useful tools that do not fit into other categories.',
      descriptionAr: 'أدوات إضافية مفيدة لا تندرج بسهولة تحت تصنيف آخر.'
    }
  };

  const pageContent = {
    en: {
      notFoundTitle: 'Category not found',
      notFoundText: 'This category does not exist.',
      emptyTitle: 'No tools in this category yet',
      emptyText: 'More tools will be added soon.'
    },
    ar: {
      notFoundTitle: 'التصنيف غير موجود',
      notFoundText: 'هذا التصنيف غير موجود.',
      emptyTitle: 'لا توجد أدوات في هذا التصنيف حاليًا',
      emptyText: 'سيتم إضافة أدوات جديدة قريبًا.'
    }
  };

  const t = language === 'ar' ? pageContent.ar : pageContent.en;
  const currentCategory = categoriesMap[categorySlug];

  const filteredTools = useMemo(() => {
    return toolsData.filter((tool) => tool.category === categorySlug);
  }, [categorySlug]);

  if (!currentCategory) {
    return (
      <main className="home-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <section className="hero-section">
          <div className="hero-container hero-surface page-hero-surface">
            <div className="page-hero-content">
              <span className="hero-badge">QuickoTools</span>
              <h1 className="hero-title page-hero-title">{t.notFoundTitle}</h1>
              <p className="hero-text">{t.notFoundText}</p>
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
          </div>
        </div>
      </section>

      <section className="tools-section">
        <div className="tools-container">
          {filteredTools.length > 0 ? (
            <div className="tools-grid">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.path}
                  name={language === 'ar' ? tool.nameAr : tool.name}
                  description={
                    language === 'ar' ? tool.descriptionAr : tool.description
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
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default CategoryPage;