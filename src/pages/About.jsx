import usePageMeta from '../hooks/usePageMeta';
import '../styles/home.css';

function About({ language }) {
  usePageMeta(
    language === 'ar'
      ? 'حول QuickoTools'
      : 'About QuickoTools',
    language === 'ar'
      ? 'تعرّف على QuickoTools، موقع الأدوات الأونلاين المجانية الذي يساعد المستخدمين على إنجاز المهام اليومية بسرعة وسهولة.'
      : 'Learn about QuickoTools, a free online tools website built to help users solve everyday tasks quickly and easily.'
  );

  const content = {
    en: {
      title: 'About QuickoTools',
      description:
        'QuickoTools is a free online tools website built to help users solve everyday tasks quickly, simply, and efficiently.',
      intro:
        'Our goal is to create a lightweight and practical platform that offers useful online tools for daily needs. We focus on simple experiences, fast performance, and tools that work smoothly across desktop and mobile devices.',
      sectionTitle: 'What QuickoTools offers',
      points: [
        'Free online tools for everyday use',
        'Simple and fast user experience',
        'Multiple categories for easy browsing',
        'Responsive design for desktop and mobile',
        'Useful tools across text, calculators, generators, converters, and developer needs',
        'Growing collection of tools designed to stay easy to use'
      ],
      closing:
        'QuickoTools is built to stay fast, useful, and accessible, with a growing library of tools designed to save time and make common tasks easier.'
    },
    ar: {
      title: 'حول QuickoTools',
      description:
        'QuickoTools هو موقع أدوات أونلاين مجانية تم إنشاؤه لمساعدة المستخدمين على إنجاز المهام اليومية بسرعة وبساطة وكفاءة.',
      intro:
        'هدفنا هو بناء منصة خفيفة وعملية توفر أدوات أونلاين مفيدة للاستخدام اليومي. نركز على سهولة الاستخدام وسرعة الأداء وأدوات تعمل بسلاسة على الهاتف والكمبيوتر.',
      sectionTitle: 'ماذا يقدم QuickoTools',
      points: [
        'أدوات أونلاين مجانية للاستخدام اليومي',
        'تجربة استخدام بسيطة وسريعة',
        'تصنيفات متعددة لتسهيل التصفح',
        'تصميم متجاوب للهاتف والكمبيوتر',
        'أدوات مفيدة ضمن النصوص والحاسبات والمولدات والمحولات وأدوات المطورين',
        'مكتبة أدوات متنامية مصممة لتبقى سهلة الاستخدام'
      ],
      closing:
        'تم بناء QuickoTools ليبقى سريعًا ومفيدًا وسهل الوصول، مع مكتبة أدوات متنامية تهدف إلى توفير الوقت وتسهيل المهام الشائعة.'
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
          <div className="tool-card">
            <h2 className="tool-card-title">{t.sectionTitle}</h2>

            <p className="tool-card-description" style={{ marginBottom: '16px' }}>
              {t.intro}
            </p>

            <ul
              style={{
                paddingInlineStart: '20px',
                color: '#4b5563',
                lineHeight: '1.9',
                marginBottom: '16px'
              }}
            >
              {t.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <p className="tool-card-description">{t.closing}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;