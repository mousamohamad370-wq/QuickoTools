import usePageMeta from '../hooks/usePageMeta';
import '../styles/home.css';

function Terms({ language }) {
  usePageMeta(
    language === 'ar'
      ? 'شروط الاستخدام - QuickoTools'
      : 'Terms of Service - QuickoTools',
    language === 'ar'
      ? 'تعرف على شروط استخدام موقع QuickoTools والأدوات المتاحة على الموقع.'
      : 'Read the terms of service for using QuickoTools and its online tools.'
  );

  const content = {
    en: {
      title: 'Terms of Service',
      intro:
        'By accessing and using QuickoTools, you agree to the following terms and conditions.',
      section1Title: 'Use of the Website',
      section1Text:
        'QuickoTools provides free online tools intended for general use. You agree to use the website only for lawful purposes.',
      section2Title: 'Tool Accuracy',
      section2Text:
        'While we aim to provide accurate tools and results, QuickoTools does not guarantee the absolute accuracy of all outputs.',
      section3Title: 'Third-Party Services',
      section3Text:
        'The website may use third-party services such as analytics or advertising networks. These services operate under their own terms and policies.',
      section4Title: 'Changes to the Terms',
      section4Text:
        'These terms may be updated occasionally. Continued use of the website indicates acceptance of any updates.',
      closing:
        'If you have questions about these terms, please contact us through the contact page.'
    },
    ar: {
      title: 'شروط الاستخدام',
      intro:
        'باستخدامك لموقع QuickoTools فإنك توافق على شروط الاستخدام التالية.',
      section1Title: 'استخدام الموقع',
      section1Text:
        'يوفر QuickoTools أدوات أونلاين مجانية للاستخدام العام. يوافق المستخدم على استخدام الموقع بشكل قانوني فقط.',
      section2Title: 'دقة الأدوات',
      section2Text:
        'نسعى لتقديم أدوات ونتائج دقيقة، لكن QuickoTools لا يضمن دقة جميع النتائج بشكل كامل.',
      section3Title: 'خدمات الطرف الثالث',
      section3Text:
        'قد يستخدم الموقع خدمات طرف ثالث مثل أدوات التحليل أو شبكات الإعلانات، وتخضع هذه الخدمات لسياساتها الخاصة.',
      section4Title: 'تحديث الشروط',
      section4Text:
        'قد يتم تحديث هذه الشروط من وقت لآخر. استمرار استخدام الموقع يعني الموافقة على التحديثات.',
      closing:
        'إذا كان لديك أي استفسار حول هذه الشروط يمكنك التواصل معنا عبر صفحة الاتصال.'
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
            <p className="hero-text">{t.intro}</p>
          </div>
        </div>
      </section>

      <section className="tools-section">
        <div className="tools-container">

          <div className="tool-card">
            <h3 className="tool-card-title">{t.section1Title}</h3>
            <p className="tool-card-description">{t.section1Text}</p>
          </div>

          <div className="tool-card">
            <h3 className="tool-card-title">{t.section2Title}</h3>
            <p className="tool-card-description">{t.section2Text}</p>
          </div>

          <div className="tool-card">
            <h3 className="tool-card-title">{t.section3Title}</h3>
            <p className="tool-card-description">{t.section3Text}</p>
          </div>

          <div className="tool-card">
            <h3 className="tool-card-title">{t.section4Title}</h3>
            <p className="tool-card-description">{t.section4Text}</p>
          </div>

          <div className="tool-card">
            <p className="tool-card-description">{t.closing}</p>
          </div>

        </div>
      </section>
    </main>
  );
}

export default Terms;