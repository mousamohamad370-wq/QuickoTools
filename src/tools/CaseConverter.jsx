import { useState } from 'react';

function CaseConverter({ language }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const content = {
    en: {
      title: 'Case Converter',
      description: 'Convert text to uppercase, lowercase, title case, or sentence case instantly.',
      inputLabel: 'Input Text',
      inputPlaceholder: 'Enter your text here...',
      outputTitle: 'Converted Text',
      outputPlaceholder: 'Your converted text will appear here.',
      uppercase: 'UPPERCASE',
      lowercase: 'lowercase',
      titleCase: 'Title Case',
      sentenceCase: 'Sentence case',
      clear: 'Clear',
      copy: 'Copy',
      copied: 'Copied!',
      exampleTitle: 'Example',
      tryExample: 'Try Example',
      exampleValue: 'hello world from quickotools',
      infoTitle: 'What is a Case Converter?',
      infoText:
        'A case converter helps you quickly change the letter format of text for writing, formatting, coding, and content editing.'
    },
    ar: {
      title: 'محول حالة النص',
      description: 'حوّل النص إلى أحرف كبيرة أو صغيرة أو Title Case أو Sentence case فورًا.',
      inputLabel: 'النص المدخل',
      inputPlaceholder: 'أدخل النص هنا...',
      outputTitle: 'النص الناتج',
      outputPlaceholder: 'سيظهر النص الناتج هنا.',
      uppercase: 'أحرف كبيرة',
      lowercase: 'أحرف صغيرة',
      titleCase: 'بداية كل كلمة كبيرة',
      sentenceCase: 'بداية الجملة كبيرة',
      clear: 'مسح',
      copy: 'نسخ',
      copied: 'تم النسخ!',
      exampleTitle: 'مثال',
      tryExample: 'جرّب المثال',
      exampleValue: 'hello world from quickotools',
      infoTitle: 'ما هو محول حالة النص؟',
      infoText:
        'محول حالة النص يساعدك على تغيير شكل الأحرف بسرعة لاستخدامه في الكتابة والتنسيق والبرمجة وتحرير المحتوى.'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  const toTitleCase = (text) => {
    return text
      .toLowerCase()
      .split(' ')
      .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ''))
      .join(' ');
  };

  const toSentenceCase = (text) => {
    const trimmed = text.trim().toLowerCase();
    if (!trimmed) return '';
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  };

  const convertToUppercase = () => {
    setOutput(input.toUpperCase());
    setCopied(false);
  };

  const convertToLowercase = () => {
    setOutput(input.toLowerCase());
    setCopied(false);
  };

  const convertToTitleCase = () => {
    setOutput(toTitleCase(input));
    setCopied(false);
  };

  const convertToSentenceCase = () => {
    setOutput(toSentenceCase(input));
    setCopied(false);
  };

  const clearAll = () => {
    setInput('');
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

  const tryExample = () => {
    setInput(t.exampleValue);
    setOutput('');
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
              onClick={convertToUppercase}
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
              {t.uppercase}
            </button>

            <button
              onClick={convertToLowercase}
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
              {t.lowercase}
            </button>

            <button
              onClick={convertToTitleCase}
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
              {t.titleCase}
            </button>

            <button
              onClick={convertToSentenceCase}
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
              {t.sentenceCase}
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

export default CaseConverter;