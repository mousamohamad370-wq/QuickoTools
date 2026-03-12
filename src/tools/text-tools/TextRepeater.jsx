import { useState } from 'react';

function TextRepeater({ language }) {
  const [text, setText] = useState('');
  const [count, setCount] = useState(5);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const content = {
    en: {
      title: 'Text Repeater',
      description: 'Repeat any text multiple times instantly for testing, formatting, and content tasks.',
      textLabel: 'Text',
      textPlaceholder: 'Enter your text here...',
      countLabel: 'Repeat Count',
      countPlaceholder: 'Enter repeat count',
      generate: 'Repeat Text',
      clear: 'Clear',
      copy: 'Copy',
      copied: 'Copied!',
      resultTitle: 'Repeated Text',
      resultPlaceholder: 'Your repeated text will appear here.',
      infoTitle: 'What is a Text Repeater?',
      infoText:
        'A text repeater duplicates the same text multiple times, which is useful for testing, formatting, and quick content generation.',
      exampleTitle: 'Example',
      tryExample: 'Try Example',
      exampleText: 'Hello',
      invalidCount: 'Please enter a valid repeat count'
    },
    ar: {
      title: 'مكرر النص',
      description: 'كرر أي نص عدة مرات فورًا لأغراض الاختبار والتنسيق وإنشاء المحتوى.',
      textLabel: 'النص',
      textPlaceholder: 'أدخل النص هنا...',
      countLabel: 'عدد التكرار',
      countPlaceholder: 'أدخل عدد مرات التكرار',
      generate: 'تكرار النص',
      clear: 'مسح',
      copy: 'نسخ',
      copied: 'تم النسخ!',
      resultTitle: 'النص المكرر',
      resultPlaceholder: 'سيظهر النص المكرر هنا.',
      infoTitle: 'ما هو مكرر النص؟',
      infoText:
        'مكرر النص هو أداة تقوم بتكرار نفس النص عدة مرات، وهو مفيد للاختبار والتنسيق وإنشاء محتوى سريع.',
      exampleTitle: 'مثال',
      tryExample: 'جرّب المثال',
      exampleText: 'مرحبا',
      invalidCount: 'يرجى إدخال عدد تكرار صالح'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  const generateRepeatedText = () => {
    const safeCount = Number(count);

    if (!text.trim() || !safeCount || safeCount < 1 || safeCount > 1000) {
      setOutput(t.invalidCount);
      setCopied(false);
      return;
    }

    const repeated = Array.from({ length: safeCount }, () => text).join('\n');
    setOutput(repeated);
    setCopied(false);
  };

  const clearAll = () => {
    setText('');
    setCount(5);
    setOutput('');
    setCopied(false);
  };

  const copyResult = async () => {
    if (!output || output === t.invalidCount) return;

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
    setText(t.exampleText);
    setCount(5);
    setOutput('');
    setCopied(false);
  };

  const isError = output === t.invalidCount;

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
              {t.textLabel}
            </label>

            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={t.textPlaceholder}
              style={{
                width: '100%',
                minHeight: '160px',
                padding: '16px',
                border: '1px solid #d1d5db',
                borderRadius: '10px',
                resize: 'vertical',
                outline: 'none',
                fontSize: '16px',
                lineHeight: '1.6',
                boxSizing: 'border-box',
                marginBottom: '18px'
              }}
            />

            <label
              style={{
                display: 'block',
                fontWeight: '700',
                marginBottom: '12px',
                color: '#111827',
                fontSize: '18px'
              }}
            >
              {t.countLabel}
            </label>

            <input
              type="number"
              min="1"
              max="1000"
              value={count}
              onChange={(event) => setCount(event.target.value)}
              placeholder={t.countPlaceholder}
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
              onClick={generateRepeatedText}
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

export default TextRepeater;