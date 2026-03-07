import { useState } from 'react';

function UUIDGenerator({ language }) {
  const [uuid, setUuid] = useState('');

  const content = {
    en: {
      title: 'UUID Generator',
      description: 'Generate a random UUID instantly for development and databases.',
      resultTitle: 'Generated UUID',
      placeholder: 'Your generated UUID will appear here.',
      generate: 'Generate UUID',
      copy: 'Copy UUID',
      clear: 'Clear'
    },
    ar: {
      title: 'مولد UUID',
      description: 'أنشئ UUID عشوائيًا فورًا للاستخدام في البرمجة وقواعد البيانات.',
      resultTitle: 'UUID الناتج',
      placeholder: 'ستظهر قيمة UUID هنا.',
      generate: 'إنشاء UUID',
      copy: 'نسخ UUID',
      clear: 'مسح'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  const generateUUID = () => {
    setUuid(crypto.randomUUID());
  };

  const copyUUID = async () => {
    if (!uuid) return;
    try {
      await navigator.clipboard.writeText(uuid);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const clearUUID = () => {
    setUuid('');
  };

  return (
    <main
      className="tool-page"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      style={{
        padding: '40px 20px',
        backgroundColor: '#f3f4f6',
        minHeight: '100vh'
      }}
    >
      <div style={{ maxWidth: '980px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1
            style={{
              fontSize: '32px',
              marginBottom: '12px',
              fontWeight: '700',
              color: '#111827'
            }}
          >
            {t.title}
          </h1>

          <p
            style={{
              color: '#6b7280',
              lineHeight: '1.7',
              fontSize: '16px',
              margin: 0
            }}
          >
            {t.description}
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
            marginBottom: '28px'
          }}
        >
          <div style={{ marginBottom: '18px' }}>
            <label
              style={{
                display: 'block',
                fontWeight: '700',
                marginBottom: '12px',
                color: '#111827',
                fontSize: '18px'
              }}
            >
              {t.resultTitle}
            </label>

            <input
              type="text"
              value={uuid}
              readOnly
              placeholder={t.placeholder}
              style={{
                width: '100%',
                height: '54px',
                padding: '0 16px',
                border: '1px solid #d1d5db',
                borderRadius: '10px',
                outline: 'none',
                fontSize: '18px',
                backgroundColor: '#ffffff',
                color: '#111827',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: language === 'ar' ? 'flex-start' : 'flex-end',
              flexWrap: 'wrap'
            }}
          >
            <button
              onClick={generateUUID}
              style={{
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '14px 24px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              {t.generate}
            </button>

            <button
              onClick={copyUUID}
              style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '14px 24px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              {t.copy}
            </button>

            <button
              onClick={clearUUID}
              style={{
                backgroundColor: '#e5e7eb',
                color: '#111827',
                border: 'none',
                borderRadius: '10px',
                padding: '14px 24px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              {t.clear}
            </button>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)'
          }}
        >
          <h2
            style={{
              fontSize: '18px',
              marginBottom: '18px',
              color: '#111827',
              fontWeight: '700'
            }}
          >
            {t.resultTitle}
          </h2>

          <div
            style={{
              minHeight: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <p
              style={{
                fontSize: uuid ? '24px' : '20px',
                fontWeight: '700',
                color: uuid ? '#111827' : '#374151',
                lineHeight: '1.8',
                margin: 0,
                wordBreak: 'break-all'
              }}
            >
              {uuid || t.placeholder}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default UUIDGenerator;