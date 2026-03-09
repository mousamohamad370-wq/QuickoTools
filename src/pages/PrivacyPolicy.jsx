import '../styles/home.css';

function PrivacyPolicy({ language }) {
  const content = {
    en: {
      title: 'Privacy Policy',
      intro:
        'Your privacy is important to us. This privacy policy explains how QuickoTools collects, uses, and protects information when you use our website.',
      section1Title: 'Information We Collect',
      section1Text:
        'QuickoTools does not require users to create accounts or provide personal information to use the tools. However, basic technical information such as browser type or device information may be collected automatically by analytics tools.',
      section2Title: 'How We Use Information',
      section2Text:
        'The information collected is used only to improve website performance, understand user behavior, and enhance the overall experience.',
      section3Title: 'Cookies',
      section3Text:
        'QuickoTools may use cookies or similar technologies to improve functionality and analyze traffic. You can disable cookies through your browser settings.',
      section4Title: 'Third-Party Services',
      section4Text:
        'Some third-party services such as analytics or advertising networks may collect information according to their own privacy policies.',
      section5Title: 'Changes to This Policy',
      section5Text:
        'This privacy policy may be updated from time to time. Any updates will be published on this page.',
      closing:
        'If you have any questions regarding this policy, please contact us through the contact page.'
    },
    ar: {
      title: 'سياسة الخصوصية',
      intro:
        'خصوصيتك مهمة بالنسبة لنا. تشرح سياسة الخصوصية هذه كيفية جمع QuickoTools للمعلومات واستخدامها وحمايتها عند استخدامك للموقع.',
      section1Title: 'المعلومات التي نجمعها',
      section1Text:
        'لا يطلب QuickoTools من المستخدمين إنشاء حسابات أو إدخال معلومات شخصية لاستخدام الأدوات. ومع ذلك قد يتم جمع بعض المعلومات التقنية تلقائيًا مثل نوع المتصفح أو معلومات الجهاز عبر أدوات التحليل.',
      section2Title: 'كيف نستخدم المعلومات',
      section2Text:
        'تُستخدم المعلومات المجمعة فقط لتحسين أداء الموقع وفهم سلوك المستخدمين وتحسين تجربة الاستخدام.',
      section3Title: 'ملفات تعريف الارتباط (Cookies)',
      section3Text:
        'قد يستخدم QuickoTools ملفات تعريف الارتباط أو تقنيات مشابهة لتحسين وظائف الموقع وتحليل الزيارات. يمكنك تعطيل ملفات تعريف الارتباط من إعدادات المتصفح.',
      section4Title: 'خدمات الطرف الثالث',
      section4Text:
        'قد تقوم بعض خدمات الطرف الثالث مثل أدوات التحليل أو شبكات الإعلانات بجمع معلومات وفقًا لسياسات الخصوصية الخاصة بها.',
      section5Title: 'تحديثات السياسة',
      section5Text:
        'قد يتم تحديث سياسة الخصوصية هذه من وقت لآخر. سيتم نشر أي تحديثات على هذه الصفحة.',
      closing:
        'إذا كان لديك أي أسئلة بخصوص هذه السياسة يمكنك التواصل معنا عبر صفحة الاتصال.'
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
            <h3 className="tool-card-title">{t.section5Title}</h3>
            <p className="tool-card-description">{t.section5Text}</p>
          </div>

          <div className="tool-card">
            <p className="tool-card-description">{t.closing}</p>
          </div>

        </div>
      </section>
    </main>
  );
}

export default PrivacyPolicy;