import { useState } from 'react';
import QRCode from 'react-qr-code';

function QRCodeGenerator({ language }) {
  const [text, setText] = useState('');

  const content = {
    en: {
      title: 'QR Code Generator',
      description: 'Convert text or links into a QR code instantly.',
      label: 'Text or URL',
      placeholder: 'Enter text or paste a URL here...',
      preview: 'QR Preview',
      empty: 'Your QR code will appear here after you enter text or a link.'
    },
    ar: {
      title: 'مولد QR Code',
      description: 'حوّل النص أو الروابط إلى رمز QR فورًا.',
      label: 'النص أو الرابط',
      placeholder: 'أدخل النص أو ألصق الرابط هنا...',
      preview: 'معاينة QR',
      empty: 'سيظهر رمز QR هنا بعد إدخال نص أو رابط.'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  return (
    <main
      className="tool-page"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      style={{ padding: '40px 20px' }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '12px' }}>
          {t.title}
        </h1>

        <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
          {t.description}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '24px',
            alignItems: 'start'
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)'
            }}
          >
            <label
              style={{
                display: 'block',
                fontWeight: '600',
                marginBottom: '12px'
              }}
            >
              {t.label}
            </label>

            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={t.placeholder}
              style={{
                width: '100%',
                minHeight: '180px',
                padding: '16px',
                border: '1px solid #d1d5db',
                borderRadius: '10px',
                resize: 'vertical',
                outline: 'none',
                fontSize: '16px',
                lineHeight: '1.6'
              }}
            />
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
              textAlign: 'center'
            }}
          >
            <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>
              {t.preview}
            </h2>

            <div
              style={{
                minHeight: '256px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f9fafb',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                padding: '20px'
              }}
            >
              {text.trim() ? (
                <QRCode value={text} size={220} />
              ) : (
                <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  {t.empty}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default QRCodeGenerator;