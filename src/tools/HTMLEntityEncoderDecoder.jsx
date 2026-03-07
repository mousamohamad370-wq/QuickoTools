import { useState } from 'react';

function HTMLEntityEncoderDecoder({ language }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const content = {
    en: {
      title: 'HTML Entity Encoder / Decoder',
      description: 'Encode special HTML characters into entities or decode them back into normal text instantly.',
      inputLabel: 'Input',
      inputPlaceholder: 'Enter text or HTML entities here...',
      outputTitle: 'Result',
      outputPlaceholder: 'The result will appear here.',
      encode: 'Encode',
      decode: 'Decode',
      clear: 'Clear',
      copy: 'Copy',
      copied: 'Copied!',
      exampleTitle: 'Example',
      tryExample: 'Try Example',
      exampleValue: '<div class="box">Hello & welcome</div>',
      infoTitle: 'What are HTML entities?',
      infoText:
        'HTML entities are special character codes used to safely display reserved symbols like <, >, &, and quotes inside HTML.',
      invalidInput: 'Unable to decode the provided HTML entities'
    },
    ar: {
      title: 'تشفير وفك HTML Entities',
      description: 'حوّل أحرف HTML الخاصة إلى entities أو فكها إلى نص عادي فورًا.',
      inputLabel: 'الإدخال',
      inputPlaceholder: 'أدخل النص أو HTML entities هنا...',
      outputTitle: 'النتيجة',
      outputPlaceholder: 'ستظهر النتيجة هنا.',
      encode: 'تشفير',
      decode: 'فك',
      clear: 'مسح',
      copy: 'نسخ',
      copied: 'تم النسخ!',
      exampleTitle: 'مثال',
      tryExample: 'جرّب المثال',
      exampleValue: '<div class="box">Hello & welcome</div>',
      infoTitle: 'ما هي HTML entities؟',
      infoText:
        'HTML entities هي رموز خاصة تُستخدم لعرض الأحرف المحجوزة مثل < و > و & وعلامات الاقتباس بأمان داخل HTML.',
      invalidInput: 'تعذر فك HTML entities المدخلة'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  const encodeText = () => {
    const textarea = document.createElement('textarea');
    textarea.textContent = input;
    const encoded = textarea.innerHTML;

    setOutput(encoded);
    setCopied(false);
  };

  const decodeText = () => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = input;
    const decoded = textarea.value;

    if (!input.trim()) {
      setOutput('');
      setCopied(false);
      return;
    }

    if (decoded === input && /&[a-zA-Z0-9#]+;/.test(input) === false) {
      setOutput(t.invalidInput);
      setCopied(false);
      return;
    }

    setOutput(decoded);
    setCopied(false);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setCopied(false);
  };

  const copyResult = async () => {
    if (!output || output === t.invalidInput) return;

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
    setCopied(false);
  };

  const isError = output === t.invalidInput;

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
                cursor: output && !isError ? 'pointer' : 'not-allowed',
                opacity: output && !isError ? 1 : 0.65
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
                fontWeight: output && !isError ? '400' : '700',
                color: isError ? '#dc2626' : output ? '#111827' : '#374151',
                lineHeight: '1.9',
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {output || t.outputPlaceholder}
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

export default HTMLEntityEncoderDecoder;