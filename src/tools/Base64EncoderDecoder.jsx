import { useEffect, useState } from 'react';

function Base64EncoderDecoder({ language }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [detectedBase64, setDetectedBase64] = useState(false);

  const content = {
    en: {
      title: 'Base64 Encoder / Decoder',
      description: 'Encode text to Base64 or decode Base64 back to plain text instantly.',
      inputLabel: 'Input',
      inputPlaceholder: 'Enter text or Base64 value here...',
      outputTitle: 'Result',
      outputPlaceholder: 'The result will appear here.',
      encode: 'Encode',
      decode: 'Decode',
      clear: 'Clear',
      copy: 'Copy',
      copied: 'Copied!',
      swap: 'Swap',
      invalidBase64: 'Invalid Base64 input',
      detectedBase64: 'Detected Base64 text',
      exampleTitle: 'Example',
      tryExample: 'Try Example',
      exampleValue: 'Hello World',
      infoTitle: 'What is Base64?',
      infoText:
        'Base64 is a method used to encode binary data into text format so it can be safely transmitted over the internet.'
    },
    ar: {
      title: 'تشفير وفك Base64',
      description: 'حوّل النص إلى Base64 أو فك Base64 إلى نص عادي فورًا.',
      inputLabel: 'الإدخال',
      inputPlaceholder: 'أدخل النص أو قيمة Base64 هنا...',
      outputTitle: 'النتيجة',
      outputPlaceholder: 'ستظهر النتيجة هنا.',
      encode: 'تشفير',
      decode: 'فك',
      clear: 'مسح',
      copy: 'نسخ',
      copied: 'تم النسخ!',
      swap: 'تبديل',
      invalidBase64: 'نص Base64 غير صالح',
      detectedBase64: 'تم اكتشاف نص Base64',
      exampleTitle: 'مثال',
      tryExample: 'جرّب المثال',
      exampleValue: 'Hello World',
      infoTitle: 'ما هو Base64؟',
      infoText:
        'Base64 هي طريقة تُستخدم لترميز البيانات الثنائية إلى صيغة نصية حتى يمكن نقلها بأمان عبر الإنترنت.'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  const isValidBase64 = (value) => {
    const trimmed = value.trim();

    if (!trimmed || trimmed.length % 4 !== 0) {
      return false;
    }

    const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

    if (!base64Regex.test(trimmed)) {
      return false;
    }

    try {
      return btoa(atob(trimmed)) === trimmed;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    setDetectedBase64(isValidBase64(input));
    setCopied(false);
  }, [input]);

  const encodeText = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
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
      const decoded = decodeURIComponent(escape(atob(input.trim())));
      setOutput(decoded);
      setError('');
      setCopied(false);
    } catch (error) {
      setOutput('');
      setError(t.invalidBase64);
      setCopied(false);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
    setCopied(false);
    setDetectedBase64(false);
  };

  const swapText = () => {
    if (!output) return;

    setInput(output);
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

          {(detectedBase64 || copied) && (
            <div
              style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                marginBottom: '18px'
              }}
            >
              {detectedBase64 && (
                <span
                  style={{
                    backgroundColor: '#e5e7eb',
                    color: '#374151',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  {t.detectedBase64}
                </span>
              )}

              {copied && (
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
              )}
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
              onClick={swapText}
              style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '14px 24px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: output ? 'pointer' : 'not-allowed',
                opacity: output ? 1 : 0.65
              }}
            >
              {t.swap}
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

export default Base64EncoderDecoder;