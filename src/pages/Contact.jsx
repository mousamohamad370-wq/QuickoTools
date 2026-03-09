import usePageMeta from '../hooks/usePageMeta';
import '../styles/home.css';

function Contact({ language }) {
    usePageMeta(
  language === 'ar'
    ? 'اتصل بنا - QuickoTools'
    : 'Contact - QuickoTools',
  language === 'ar'
    ? 'تواصل مع QuickoTools للاستفسارات العامة والملاحظات والاقتراحات.'
    : 'Contact QuickoTools for general questions, feedback, and suggestions.'
);
  const content = {
    en: {
      title: 'Contact',
      description:
        'Need to get in touch with QuickoTools? Use the information below for general questions and feedback.',
      intro:
        'We welcome feedback, suggestions, and general inquiries related to QuickoTools.',
      emailLabel: 'Email',
      emailValue: 'contact@quickotools.com',
      noteTitle: 'Contact Note',
      noteText:
        'This page is currently a simple contact page for informational purposes. You can later replace the email address with your official contact email or add a contact form.'
    },
    ar: {
      title: 'اتصل بنا',
      description:
        'هل تريد التواصل مع QuickoTools؟ استخدم المعلومات التالية للاستفسارات العامة والملاحظات.',
      intro:
        'نرحب بالملاحظات والاقتراحات والاستفسارات العامة المتعلقة بـ QuickoTools.',
      emailLabel: 'البريد الإلكتروني',
      emailValue: 'contact@quickotools.com',
      noteTitle: 'ملاحظة',
      noteText:
        'هذه الصفحة حاليًا عبارة عن صفحة تواصل بسيطة لأغراض تعريفية. يمكنك لاحقًا استبدال البريد الإلكتروني بالبريد الرسمي أو إضافة نموذج تواصل.'
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
            <h2 className="tool-card-title">{t.noteTitle}</h2>
            <p className="tool-card-description" style={{ marginBottom: '16px' }}>
              {t.intro}
            </p>

            <p className="tool-card-description" style={{ marginBottom: '10px' }}>
              <strong>{t.emailLabel}:</strong>{' '}
              <a href={`mailto:${t.emailValue}`}>{t.emailValue}</a>
            </p>

            <p className="tool-card-description">{t.noteText}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;