import { useState } from 'react';

function SlugGenerator({ language }) {
  const [text, setText] = useState('');

  const content = {
    en: {
      title: 'Slug Generator',
      description: 'Convert text into a clean URL-friendly slug.',
      placeholder: 'Type or paste your text here...',
      result: 'Slug Result',
      empty: 'Your slug will appear here.'
    },
    ar: {
      title: 'مولد Slug',
      description: 'حوّل النص إلى رابط URL نظيف وسهل القراءة.',
      placeholder: 'اكتب النص هنا أو ألصقه...',
      result: 'النتيجة',
      empty: 'سيظهر الـ slug هنا.'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

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

        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={t.placeholder}
          style={{
            width: '100%',
            minHeight: '220px',
            padding: '16px',
            border: '1px solid #d1d5db',
            borderRadius: '10px',
            resize: 'vertical',
            outline: 'none',
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '24px'
          }}
        />

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)'
          }}
        >
          <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>
            {t.result}
          </h2>

          <p
            style={{
              fontSize: '22px',
              fontWeight: '700',
              wordBreak: 'break-word'
            }}
          >
            {slug || t.empty}
          </p>
        </div>
      </div>
    </main>
  );
}

export default SlugGenerator;