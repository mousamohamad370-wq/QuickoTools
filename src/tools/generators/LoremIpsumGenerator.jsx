import { useState } from 'react';

function LoremIpsumGenerator({ language }) {
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const content = {
    en: {
      title: 'Lorem Ipsum Generator',
      description: 'Generate placeholder text instantly for design, UI, and development projects.',
      label: 'Number of paragraphs',
      placeholder: 'Enter number of paragraphs',
      generate: 'Generate',
      clear: 'Clear',
      copy: 'Copy',
      copied: 'Copied!',
      resultTitle: 'Generated Text',
      resultPlaceholder: 'Your generated Lorem Ipsum text will appear here.',
      infoTitle: 'What is Lorem Ipsum?',
      infoText:
        'Lorem Ipsum is placeholder text commonly used in design and publishing to preview layouts before real content is added.',
      exampleTitle: 'Quick Tip',
      exampleText: 'Generate 3 to 5 paragraphs for a realistic content preview.'
    },
    ar: {
      title: 'مولد Lorem Ipsum',
      description: 'أنشئ نصًا تجريبيًا فورًا لمشاريع التصميم والواجهات والتطوير.',
      label: 'عدد الفقرات',
      placeholder: 'أدخل عدد الفقرات',
      generate: 'إنشاء',
      clear: 'مسح',
      copy: 'نسخ',
      copied: 'تم النسخ!',
      resultTitle: 'النص الناتج',
      resultPlaceholder: 'سيظهر نص Lorem Ipsum الذي تم إنشاؤه هنا.',
      infoTitle: 'ما هو Lorem Ipsum؟',
      infoText:
        'Lorem Ipsum هو نص تجريبي يُستخدم عادة في التصميم والنشر لمعاينة شكل المحتوى قبل إضافة النص الحقيقي.',
      exampleTitle: 'نصيحة سريعة',
      exampleText: 'أنشئ من 3 إلى 5 فقرات للحصول على معاينة واقعية للمحتوى.'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  const paragraphs = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.',
    'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.',
    'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.',
    'Donec sollicitudin molestie malesuada. Vivamus suscipit tortor eget felis porttitor volutpat.'
  ];

  const generateLorem = () => {
    const safeCount = Math.max(1, Math.min(20, Number(count) || 1));
    const result = Array.from({ length: safeCount }, (_, index) => paragraphs[index % paragraphs.length]).join('\n\n');
    setOutput(result);
    setCopied(false);
  };

  const clearAll = () => {
    setCount(3);
    setOutput('');
    setCopied(false);
  };

  const copyResult = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      setCopied(false);
    }
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
              {t.label}
            </label>

            <input
              type="number"
              min="1"
              max="20"
              value={count}
              onChange={(event) => setCount(event.target.value)}
              placeholder={t.placeholder}
              style={{
                width: '100%',
                height: '54px',
                padding: '0 16px',
                border: '1px solid #d1d5db',
                borderRadius: '10px',
                outline: 'none',
                fontSize: '16px',
                backgroundColor: '#ffffff',
                color: '#111827',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {copied && (
            <div style={{ marginBottom: '18px' }}>
              <span
                style={{
                  backgroundColor: '#dbeafe',
                  color: '#1d4ed8',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                {t.copied}
              </span>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: language === 'ar' ? 'flex-start' : 'flex-end',
              flexWrap: 'wrap'
            }}
          >
            <button
              onClick={generateLorem}
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
              onClick={clearAll}
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
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
            marginBottom: '28px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '18px'
            }}
          >
            <h2
              style={{
                fontSize: '18px',
                margin: 0,
                color: '#111827',
                fontWeight: '700'
              }}
            >
              {t.resultTitle}
            </h2>

            <button
              onClick={copyResult}
              style={{
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 20px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: output ? 'pointer' : 'not-allowed',
                opacity: output ? 1 : 0.65
              }}
            >
              {t.copy}
            </button>
          </div>

          <div
            style={{
              minHeight: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'start'
            }}
          >
            <p
              style={{
                width: '100%',
                fontSize: output ? '16px' : '20px',
                fontWeight: output ? '400' : '700',
                color: output ? '#111827' : '#374151',
                lineHeight: '1.9',
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {output || t.resultPlaceholder}
            </p>
          </div>
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
          <h2
            style={{
              fontSize: '18px',
              marginBottom: '12px',
              color: '#111827',
              fontWeight: '700'
            }}
          >
            {t.infoTitle}
          </h2>

          <p
            style={{
              color: '#6b7280',
              lineHeight: '1.8',
              margin: 0,
              fontSize: '16px'
            }}
          >
            {t.infoText}
          </p>
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
              marginBottom: '12px',
              color: '#111827',
              fontWeight: '700'
            }}
          >
            {t.exampleTitle}
          </h2>

          <p
            style={{
              color: '#6b7280',
              lineHeight: '1.8',
              margin: 0,
              fontSize: '16px'
            }}
          >
            {t.exampleText}
          </p>
        </div>
      </div>
    </main>
  );
}

export default LoremIpsumGenerator;