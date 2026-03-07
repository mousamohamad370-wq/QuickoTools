import { Link } from 'react-router-dom';

function Footer({ language }) {
  const content = {
    en: {
      aboutTitle: 'About QuickoTools',
      aboutText:
        'QuickoTools provides free and simple online tools for everyday tasks including calculators, generators, text tools, and developer utilities.',
      linksTitle: 'Quick Links',
      categories: 'Categories',
      popularTools: 'Popular Tools',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      copyright: '© 2026 QuickoTools. All rights reserved.'
    },
    ar: {
      aboutTitle: 'حول QuickoTools',
      aboutText:
        'يوفر QuickoTools أدوات أونلاين مجانية وبسيطة للمهام اليومية مثل الحاسبات والمولدات وأدوات النص وأدوات المطورين.',
      linksTitle: 'روابط سريعة',
      categories: 'التصنيفات',
      popularTools: 'الأدوات الشائعة',
      contact: 'اتصل بنا',
      privacy: 'سياسة الخصوصية',
      copyright: '© 2026 QuickoTools. جميع الحقوق محفوظة.'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        <div className="footer-section">
          <h3 className="footer-title">{t.aboutTitle}</h3>
          <p className="footer-text">{t.aboutText}</p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">{t.linksTitle}</h3>

          <ul className="footer-links">
            <li>
              <Link to="/categories">{t.categories}</Link>
            </li>

            <li>
              <a href="/#popular-tools">{t.popularTools}</a>
            </li>

            <li>
              <a href="#">{t.contact}</a>
            </li>

            <li>
              <a href="#">{t.privacy}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t.copyright}</p>
      </div>
    </footer>
  );
}

export default Footer;