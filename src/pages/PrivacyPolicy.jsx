import usePageMeta from '../hooks/usePageMeta';
import '../styles/home.css';

function PrivacyPolicy({ language }) {
  usePageMeta(
    language === 'ar'
      ? 'سياسة الخصوصية - QuickoTools'
      : 'Privacy Policy - QuickoTools',
    language === 'ar'
      ? 'اقرأ سياسة الخصوصية الخاصة بـ QuickoTools وتعرّف على كيفية التعامل مع المعلومات وملفات تعريف الارتباط وخدمات الطرف الثالث.'
      : 'Read the QuickoTools privacy policy to learn how information, cookies, and third-party services may be handled on the website.'
  );

  const content = {
    en: {
      title: 'Privacy Policy',
      intro:
        'Your privacy matters to us. This Privacy Policy explains how QuickoTools may collect, use, and protect limited information when you use the website.',
      lastUpdatedLabel: 'Last updated',
      lastUpdatedValue: 'March 12, 2026',

      section1Title: 'Information We Collect',
      section1Text:
        'QuickoTools does not require users to create an account in order to use the website tools. In general, we do not ask for personal information to access most tools. Limited technical data such as browser type, device type, language preference, referring pages, and general usage data may be collected automatically for performance, analytics, and security purposes.',

      section2Title: 'How We Use Information',
      section2Text:
        'Any limited information collected is used to improve website performance, understand usage patterns, maintain security, fix issues, and improve the overall user experience. We do not sell personal information to third parties.',

      section3Title: 'Cookies and Similar Technologies',
      section3Text:
        'QuickoTools may use cookies or similar technologies to remember preferences, measure traffic, improve functionality, and support analytics or advertising services. You can control or disable cookies through your browser settings.',

      section4Title: 'Third-Party Services',
      section4Text:
        'We may use third-party services such as analytics providers, advertising partners, hosting platforms, or embedded services. These third parties may process limited technical information according to their own privacy policies and terms.',

      section5Title: 'Advertising',
      section5Text:
        'QuickoTools may display advertisements through third-party advertising networks such as Google. These services may use cookies or similar technologies to deliver and measure ads, subject to their own policies.',

      section6Title: 'Tool Input and User Content',
      section6Text:
        'Many QuickoTools tools are designed to work directly in your browser. When a tool works locally, the text, values, or files you enter may remain on your device unless the tool clearly states otherwise. If a future tool requires server-side processing, that behavior should be explained on the relevant tool page.',

      section7Title: 'Contact Information',
      section7Text:
        'If you contact us by email or through a contact form in the future, we may receive the information you choose to provide, such as your name, email address, and message content, in order to respond to your inquiry.',

      section8Title: 'Policy Updates',
      section8Text:
        'This Privacy Policy may be updated from time to time to reflect changes to the website, tools, legal requirements, or third-party services. Any updates will be posted on this page with the latest revision date.',

      closing:
        'If you have any privacy-related questions, please contact us through the contact page or the official contact email listed on the website.'
    },

    ar: {
      title: 'سياسة الخصوصية',
      intro:
        'خصوصيتك مهمة بالنسبة لنا. توضح سياسة الخصوصية هذه كيف يمكن لـ QuickoTools جمع واستخدام وحماية قدر محدود من المعلومات عند استخدامك للموقع.',
      lastUpdatedLabel: 'آخر تحديث',
      lastUpdatedValue: '12 مارس 2026',

      section1Title: 'المعلومات التي نجمعها',
      section1Text:
        'لا يطلب QuickoTools من المستخدمين إنشاء حساب لاستخدام أدوات الموقع. وبشكل عام نحن لا نطلب معلومات شخصية لاستخدام معظم الأدوات. قد يتم جمع بعض البيانات التقنية المحدودة تلقائيًا مثل نوع المتصفح ونوع الجهاز وتفضيل اللغة والصفحات المحيلة وبيانات الاستخدام العامة لأغراض الأداء والتحليلات والأمان.',

      section2Title: 'كيف نستخدم المعلومات',
      section2Text:
        'تُستخدم أي معلومات محدودة يتم جمعها لتحسين أداء الموقع وفهم أنماط الاستخدام والحفاظ على الأمان وإصلاح المشاكل وتحسين تجربة المستخدم بشكل عام. نحن لا نبيع المعلومات الشخصية إلى أطراف ثالثة.',

      section3Title: 'ملفات تعريف الارتباط والتقنيات المشابهة',
      section3Text:
        'قد يستخدم QuickoTools ملفات تعريف الارتباط أو تقنيات مشابهة لتذكر التفضيلات وقياس الزيارات وتحسين الوظائف ودعم خدمات التحليل أو الإعلانات. يمكنك التحكم في ملفات تعريف الارتباط أو تعطيلها من خلال إعدادات المتصفح.',

      section4Title: 'خدمات الطرف الثالث',
      section4Text:
        'قد نستخدم خدمات طرف ثالث مثل مزودي التحليلات أو شركاء الإعلانات أو منصات الاستضافة أو الخدمات المدمجة. وقد تعالج هذه الجهات بعض المعلومات التقنية المحدودة وفقًا لسياسات الخصوصية والشروط الخاصة بها.',

      section5Title: 'الإعلانات',
      section5Text:
        'قد يعرض QuickoTools إعلانات من خلال شبكات إعلانية خارجية مثل Google. وقد تستخدم هذه الخدمات ملفات تعريف الارتباط أو تقنيات مشابهة لعرض الإعلانات وقياسها، وذلك وفقًا لسياساتها الخاصة.',

      section6Title: 'مدخلات الأدوات ومحتوى المستخدم',
      section6Text:
        'تم تصميم العديد من أدوات QuickoTools لتعمل مباشرة داخل المتصفح. وعندما تعمل الأداة محليًا، فقد تبقى النصوص أو القيم أو الملفات التي تدخلها على جهازك ما لم يتم توضيح خلاف ذلك بشكل صريح. وإذا احتاجت أداة مستقبلية إلى معالجة عبر الخادم، فيجب توضيح ذلك في صفحة الأداة نفسها.',

      section7Title: 'معلومات التواصل',
      section7Text:
        'إذا تواصلت معنا عبر البريد الإلكتروني أو من خلال نموذج تواصل مستقبلًا، فقد نستلم المعلومات التي تختار تقديمها مثل الاسم والبريد الإلكتروني ومحتوى الرسالة بهدف الرد على استفسارك.',

      section8Title: 'تحديثات السياسة',
      section8Text:
        'قد يتم تحديث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات في الموقع أو الأدوات أو المتطلبات القانونية أو خدمات الطرف الثالث. وسيتم نشر أي تحديثات على هذه الصفحة مع تاريخ آخر مراجعة.',

      closing:
        'إذا كان لديك أي سؤال متعلق بالخصوصية، يمكنك التواصل معنا عبر صفحة الاتصال أو البريد الرسمي المعروض على الموقع.'
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
            <p className="hero-text" style={{ marginTop: '12px' }}>
              <strong>{t.lastUpdatedLabel}:</strong> {t.lastUpdatedValue}
            </p>
          </div>
        </div>
      </section>

      <section className="tools-section">
        <div className="tools-container">
          <div className="tool-card">
            <h2 className="tool-card-title">{t.section1Title}</h2>
            <p className="tool-card-description">{t.section1Text}</p>
          </div>

          <div className="tool-card">
            <h2 className="tool-card-title">{t.section2Title}</h2>
            <p className="tool-card-description">{t.section2Text}</p>
          </div>

          <div className="tool-card">
            <h2 className="tool-card-title">{t.section3Title}</h2>
            <p className="tool-card-description">{t.section3Text}</p>
          </div>

          <div className="tool-card">
            <h2 className="tool-card-title">{t.section4Title}</h2>
            <p className="tool-card-description">{t.section4Text}</p>
          </div>

          <div className="tool-card">
            <h2 className="tool-card-title">{t.section5Title}</h2>
            <p className="tool-card-description">{t.section5Text}</p>
          </div>

          <div className="tool-card">
            <h2 className="tool-card-title">{t.section6Title}</h2>
            <p className="tool-card-description">{t.section6Text}</p>
          </div>

          <div className="tool-card">
            <h2 className="tool-card-title">{t.section7Title}</h2>
            <p className="tool-card-description">{t.section7Text}</p>
          </div>

          <div className="tool-card">
            <h2 className="tool-card-title">{t.section8Title}</h2>
            <p className="tool-card-description">{t.section8Text}</p>
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