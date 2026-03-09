import '../styles/home.css';

function About({ language }) {
  const content = {
    en: {
      title: 'About QuickoTools',
      description:
        'QuickoTools is a free online tools website built to help people solve everyday tasks quickly and easily.',
      intro:
        'Our goal is to provide simple, fast, and useful web tools that work smoothly on desktop and mobile. We focus on calculators, generators, text tools, developer tools, and other practical utilities.',
      sectionTitle: 'What we offer',
      points: [
        'Free online tools for daily use',
        'Fast and simple user experience',
        'Multiple categories for easy browsing',
        'Tools designed to work on phone and desktop'
      ],
      closing:
        'QuickoTools is built to stay lightweight, useful, and easy to use for everyone.'
    },
    ar: {
      title: 'حول QuickoTools',
      description:
        'QuickoTools هو موقع أدوات أونلاين مجانية تم إنشاؤه لمساعدة المستخدمين على إنجاز المهام اليومية بسرعة وسهولة.',
      intro:
        'هدفنا هو تقديم أدوات ويب بسيطة وسريعة ومفيدة تعمل بسلاسة على الهاتف والكمبيوتر. نركّز على الحاسبات والمولدات وأدوات النص وأدوات المطورين وغيرها من الأدوات العملية.',
      sectionTitle: 'ماذا نقدم',
      points: [
        'أدوات أونلاين مجانية للاستخدام اليومي',
        'تجربة استخدام سريعة وبسيطة',
        'تصنيفات متعددة لتسهيل التصفح',
        'أدوات مصممة للعمل على الهاتف والكمبيوتر'
      ],
      closing:
        'تم بناء QuickoTools ليبقى خفيفًا ومفيدًا وسهل الاستخدام للجميع.'
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