import { Link } from 'react-router-dom';
import '../styles/home.css';

function Categories({ language }) {
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
      title: 'Browse Tool Categories',
      description:
        'Explore QuickoTools by category and discover the right tools faster.',
      open: 'Open Category'
    },
    ar: {
      title: 'تصفح تصنيفات الأدوات',
      description:
        'استكشف QuickoTools حسب التصنيف للوصول إلى الأدوات المناسبة بشكل أسرع.',
      open: 'افتح التصنيف'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

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