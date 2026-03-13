import { Link } from 'react-router-dom';

function Footer({ language }) {
  const currentYear = new Date().getFullYear();

  const content = {
    en: {
      aboutTitle: 'About QuickoTools',
      aboutText:
        'QuickoTools provides free and simple online tools for everyday tasks including calculators, generators, text tools, converters, and developer utilities.',
      linksTitle: 'Quick Links',
      contactTitle: 'Contact',
      home: 'Home',
      categories: 'Categories',
      popularTools: 'Popular Tools',
      about: 'About',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      emailLabel: 'Email',
      emailValue: 'quickotools@gmail.com',
      copyright: `© ${currentYear} QuickoTools. All rights reserved.`
    },
    ar: {
      aboutTitle: 'حول QuickoTools',
      aboutText:
        'يوفر QuickoTools أدوات أونلاين مجانية وبسيطة للمهام اليومية مثل الحاسبات والمولدات وأدوات النص وأدوات التحويل وأدوات المطورين.',
      linksTitle: 'روابط سريعة',
      contactTitle: 'التواصل',
      home: 'الرئيسية',
      categories: 'التصنيفات',
      popularTools: 'الأدوات الشائعة',
      about: 'حول',
      contact: 'اتصل بنا',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الاستخدام',
      emailLabel: 'البريد الإلكتروني',
      emailValue: 'quickotools@gmail.com',
      copyright: `© ${currentYear} QuickoTools. جميع الحقوق محفوظة.`
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  return (
    <footer className="site-footer" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="site-footer-container">
        <div className="footer-section">
          <h2 className="footer-title">{t.aboutTitle}</h2>
          <p className="footer-text">{t.aboutText}</p>
        </div>

        <div className="footer-section">
          <h2 className="footer-title">{t.linksTitle}</h2>

          <ul className="footer-links">
            <li>
              <Link to="/">{t.home}</Link>
            </li>

            <li>
              <Link to="/categories">{t.categories}</Link>
            </li>

            <li>
              <Link to="/#popular-tools">{t.popularTools}</Link>
            </li>

            <li>
              <Link to="/about">{t.about}</Link>
            </li>

            <li>
              <Link to="/contact">{t.contact}</Link>
            </li>

            <li>
              <Link to="/privacy-policy">{t.privacy}</Link>
            </li>
            <li>
  <Link to="/terms-of-service">{t.terms}</Link>
</li>
          </ul>
        </div>

        <div className="footer-section">
          <h2 className="footer-title">{t.contactTitle}</h2>
          <p className="footer-text">
            <strong>{t.emailLabel}:</strong>{' '}
            <a href={`mailto:${t.emailValue}`}>{t.emailValue}</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t.copyright}</p>
      </div>
    </footer>
  );
}

export default Footer;