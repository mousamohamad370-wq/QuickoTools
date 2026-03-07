import { useState } from 'react';

function URLEncoderDecoder({ language }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const content = {
    en: {
      title: 'URL Encoder / Decoder',
      description: 'Encode URLs and text for safe web usage or decode them back instantly.',
      inputLabel: 'Input',
      inputPlaceholder: 'Enter text or URL here...',
      outputTitle: 'Result',
      outputPlaceholder: 'The result will appear here.',
      encode: 'Encode',
      decode: 'Decode',
      clear: 'Clear',
      copy: 'Copy',
      copied: 'Copied!',
      invalidInput: 'Invalid encoded URL input',
      infoTitle: 'What is URL encoding?',
      infoText:
        'URL encoding converts special characters into a format that can be safely used inside web addresses.',
      exampleTitle: 'Example',
      tryExample: 'Try Example',
      exampleValue: 'https://example.com/search?q=hello world&lang=en'
    },
    ar: {
      title: 'تشفير وفك URL',
      description: 'قم بترميز الروابط والنصوص لاستخدامها بأمان في الويب أو فكها فورًا.',
      inputLabel: 'الإدخال',
      inputPlaceholder: 'أدخل النص أو الرابط هنا...',
      outputTitle: 'النتيجة',
      outputPlaceholder: 'ستظهر النتيجة هنا.',
      encode: 'تشفير',
      decode: 'فك',
      clear: 'مسح',
      copy: 'نسخ',
      copied: 'تم النسخ!',
      invalidInput: 'الرابط أو النص المشفر غير صالح',
      infoTitle: 'ما هو URL encoding؟',
      infoText:
        'ترميز URL يحول الأحرف الخاصة إلى صيغة يمكن استخدامها بأمان داخل عناوين وروابط الويب.',
      exampleTitle: 'مثال',
      tryExample: 'جرّب المثال',
      exampleValue: 'https://example.com/search?q=hello world&lang=en'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  const encodeText = () => {
    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
      setError('');
      setCopied(false);
    } catch (error) {
      setOutput('');
      setError('');
      setCopied(false);
    }
  };

  const decodeText = () => {
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
      setError('');
      setCopied(false);
    } catch (error) {
      setOutput('');
      setError(t.invalidInput);
      setCopied(false);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
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

  const tryExample = () => {
    setInput(t.exampleValue);
    setOutput('');
    setError('');
    setCopied(false);
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
              {t.inputLabel}
            </label>

            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t.inputPlaceholder}
              style={{
                width: '100%',
                minHeight: '180px',
                padding: '16px',
                border: '1px solid #d1d5db',
                borderRadius: '10px',
                resize: 'vertical',
                outline: 'none',
                fontSize: '16px',
                lineHeight: '1.6',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {copied && (
            <div
              style={{
                marginBottom: '18px'
              }}
            >
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
              onClick={encodeText}
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
              {t.encode}
            </button>

            <button
              onClick={decodeText}
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
              {t.decode}
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
              {t.outputTitle}
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
              minHeight: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <p
              style={{
                fontSize: output || error ? '22px' : '20px',
                fontWeight: '700',
                color: error ? '#dc2626' : output ? '#111827' : '#374151',
                lineHeight: '1.8',
                margin: 0,
                wordBreak: 'break-word'
              }}
            >
              {error || output || t.outputPlaceholder}
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
              marginBottom: '16px',
              color: '#111827',
              fontWeight: '700'
            }}
          >
            {t.exampleTitle}
          </h2>

          <button
            onClick={tryExample}
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
            {t.tryExample}
          </button>
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
      </div>
    </main>
  );
}

export default URLEncoderDecoder;