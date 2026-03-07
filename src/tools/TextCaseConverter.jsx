import { useState } from 'react';

function TextCaseConverter({ language }) {
  const [text, setText] = useState('');

  const content = {
    en: {
      title: 'Text Case Converter',
      description: 'Convert text to uppercase, lowercase, or capitalize format instantly.',
      placeholder: 'Type or paste your text here...',
      uppercase: 'UPPERCASE',
      lowercase: 'lowercase',
      capitalize: 'Capitalize',
      clear: 'Clear',
      preview: 'Preview',
      empty: 'Converted text will appear here.'
    },
    ar: {
      title: 'تحويل حالة النص',
      description: 'حوّل النص إلى أحرف كبيرة أو صغيرة أو بصيغة العنوان فورًا.',
      placeholder: 'اكتب النص هنا أو ألصقه...',
      uppercase: 'أحرف كبيرة',
      lowercase: 'أحرف صغيرة',
      capitalize: 'أول حرف كبير',
      clear: 'مسح',
      preview: 'المعاينة',
      empty: 'سيظهر النص المعدّل هنا.'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  const convertToUppercase = () => {
    setText(text.toUpperCase());
  };

  const convertToLowercase = () => {
    setText(text.toLowerCase());
  };

  const convertToCapitalize = () => {
    const capitalizedText = text
      .toLowerCase()
      .split(' ')
      .map((word) => {
        if (!word) return '';
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');

    setText(capitalizedText);
  };

  const clearText = () => {
    setText('');
  };

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
            marginBottom: '20px'
          }}
        />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '24px'
          }}
        >
          <button
            onClick={convertToUppercase}
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              padding: '12px 18px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            {t.uppercase}
          </button>

          <button
            onClick={convertToLowercase}
            style={{
              backgroundColor: '#111827',
              color: '#ffffff',
              border: 'none',
              padding: '12px 18px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            {t.lowercase}
          </button>

          <button
            onClick={convertToCapitalize}
            style={{
              backgroundColor: '#059669',
              color: '#ffffff',
              border: 'none',
              padding: '12px 18px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            {t.capitalize}
          </button>

          <button
            onClick={clearText}
            style={{
              backgroundColor: '#dc2626',
              color: '#ffffff',
              border: 'none',
              padding: '12px 18px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            {t.clear}
          </button>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)'
          }}
        >
          <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>
            {t.preview}
          </h2>

          <div
            style={{
              minHeight: '120px',
              padding: '16px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              lineHeight: '1.7',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}
          >
            {text || t.empty}
          </div>
        </div>
      </div>
    </main>
  );
}

export default TextCaseConverter;