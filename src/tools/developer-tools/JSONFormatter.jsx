import { useState } from 'react';

function JSONFormatter({ language }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const content = {
    en: {
      title: 'JSON Formatter',
      description: 'Format and beautify JSON code for easier reading.',
      inputLabel: 'JSON Input',
      outputLabel: 'Formatted JSON',
      placeholder: 'Paste your JSON here...',
      format: 'Format JSON',
      clear: 'Clear',
      copy: 'Copy',
      emptyOutput: 'Formatted JSON will appear here.',
      errorInvalid: 'Invalid JSON. Please check your input.',
      copied: 'Formatted JSON copied to clipboard.',
      copyError: 'Copy failed. Please copy manually.'
    },
    ar: {
      title: 'منسق JSON',
      description: 'نسّق JSON واجعله أوضح وأسهل للقراءة.',
      inputLabel: 'إدخال JSON',
      outputLabel: 'JSON بعد التنسيق',
      placeholder: 'ألصق JSON هنا...',
      format: 'تنسيق JSON',
      clear: 'مسح',
      copy: 'نسخ',
      emptyOutput: 'سيظهر JSON المنسق هنا.',
      errorInvalid: 'JSON غير صالح. يرجى التحقق من الإدخال.',
      copied: 'تم نسخ JSON المنسق.',
      copyError: 'فشل النسخ. انسخه يدويًا.'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  const handleFormatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch {
      setOutput('');
      setError(t.errorInvalid);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const handleCopy = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      alert(t.copied);
    } catch {
      alert(t.copyError);
    }
  };

  return (
    <main className="tool-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="tool-container">
        <h1 className="tool-page-title">{t.title}</h1>

        <p className="tool-page-description">{t.description}</p>

        <div className="tool-box">
          <label className="tool-label">{t.inputLabel}</label>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={t.placeholder}
            className="tool-input"
            style={{
              minHeight: '220px',
              resize: 'vertical',
              marginBottom: '20px',
              lineHeight: '1.6'
            }}
          />

          <div className="tool-actions">
            <button
              type="button"
              onClick={handleFormatJSON}
              className="tool-primary-button"
            >
              {t.format}
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="tool-secondary-button"
            >
              {t.clear}
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="tool-secondary-button"
            >
              {t.copy}
            </button>
          </div>
        </div>

        {error && <div className="tool-error-message">{error}</div>}

        <div className="tool-box tool-section">
          <h2 className="tool-section-title">{t.outputLabel}</h2>

          <pre
            style={{
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '16px',
              minHeight: '220px',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              lineHeight: '1.6',
              margin: 0,
              direction: 'ltr',
              textAlign: 'left'
            }}
          >
            {output || t.emptyOutput}
          </pre>
        </div>
      </div>
    </main>
  );
}

export default JSONFormatter;