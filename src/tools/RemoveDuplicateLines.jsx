import { useState } from 'react';

function RemoveDuplicateLines({ language }) {
  const [text, setText] = useState('');

  const lines = text.split('\n');
  const cleanedLines = [...new Set(lines)];
  const cleanedText = cleanedLines.join('\n');

  const content = {
    en: {
      title: 'Remove Duplicate Lines',
      description: 'Remove duplicate lines from your text instantly.',
      placeholder: 'Paste your lines here...',
      remove: 'Remove Duplicates',
      clear: 'Clear',
      totalLines: 'Total Lines',
      uniqueLines: 'Unique Lines'
    },
    ar: {
      title: 'إزالة الأسطر المكررة',
      description: 'أزل الأسطر المكررة من النص فورًا.',
      placeholder: 'ألصق الأسطر هنا...',
      remove: 'إزالة التكرار',
      clear: 'مسح',
      totalLines: 'إجمالي الأسطر',
      uniqueLines: 'الأسطر الفريدة'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  const handleRemoveDuplicates = () => {
    setText(cleanedText);
  };

  const handleClear = () => {
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
            minHeight: '240px',
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
            onClick={handleRemoveDuplicates}
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              padding: '12px 18px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            {t.remove}
          </button>

          <button
            onClick={handleClear}
            style={{
              backgroundColor: '#111827',
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
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px'
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)'
            }}
          >
            <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>
              {t.totalLines}
            </h2>
            <p style={{ fontSize: '28px', fontWeight: '700' }}>
              {text ? lines.length : 0}
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)'
            }}
          >
            <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>
              {t.uniqueLines}
            </h2>
            <p style={{ fontSize: '28px', fontWeight: '700' }}>
              {text ? cleanedLines.length : 0}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default RemoveDuplicateLines;