import usePageMeta from '../hooks/usePageMeta';
import '../styles/home.css';

function Contact({ language }) {
  usePageMeta(
    language === 'ar'
      ? 'اتصل بنا - QuickoTools'
      : 'Contact - QuickoTools',
    language === 'ar'
      ? 'تواصل مع QuickoTools للاستفسارات والاقتراحات أو للإبلاغ عن مشكلة في الأدوات.'
      : 'Contact QuickoTools for questions, feedback, or to report an issue with the tools.'
  );

  const content = {
    en: {
      title: 'Contact QuickoTools',
      description:
        'If you have a question, suggestion, or found an issue with one of the tools, feel free to contact us.',
      intro:
        'We welcome feedback and suggestions that help improve QuickoTools and make the tools more useful for everyone.',
      contactTitle: 'Contact Information',
      emailLabel: 'Email',
      emailValue: 'contact@quickotools.com',
      note:
        'For general questions, feedback, or reporting a problem with a tool, please contact us using the email above.'
    },

    ar: {
      title: 'التواصل مع QuickoTools',
      description:
        'إذا كان لديك سؤال أو اقتراح أو واجهت مشكلة في إحدى الأدوات يمكنك التواصل معنا.',
      intro:
        'نرحب بالملاحظات والاقتراحات التي تساعدنا على تحسين QuickoTools وجعل الأدوات أكثر فائدة للجميع.',
      contactTitle: 'معلومات التواصل',
      emailLabel: 'البريد الإلكتروني',
      emailValue: 'contact@quickotools.com',
      note:
        'للاستفسارات العامة أو الاقتراحات أو للإبلاغ عن مشكلة في إحدى الأدوات يمكنك التواصل معنا عبر البريد أعلاه.'
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
            <h2 className="tool-card-title">{t.contactTitle}</h2>

            <p className="tool-card-description" style={{ marginBottom: '16px' }}>
              {t.intro}
            </p>

            <p className="tool-card-description" style={{ marginBottom: '12px' }}>
              <strong>{t.emailLabel}:</strong>{' '}
              <a href={`mailto:${t.emailValue}`}>
                {t.emailValue}
              </a>
            </p>

            <p className="tool-card-description">
              {t.note}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;