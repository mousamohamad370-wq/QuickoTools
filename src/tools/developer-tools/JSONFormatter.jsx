import { useCallback, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'JSON Formatter - QuickoTools',
    metaDescription:
      'Format and beautify JSON instantly with the free JSON Formatter tool from QuickoTools.',
    title: 'JSON Formatter',
    description:
      'Format and beautify JSON code instantly for easier reading, debugging, and development.',
    inputTitle: 'JSON Input',
    inputLabel: 'JSON Input',
    outputTitle: 'Formatted JSON',
    placeholder: 'Paste your JSON here...',
    format: 'Format JSON',
    clear: 'Clear',
    copy: 'Copy Result',
    copied: 'Copied!',
    loadExample: 'Load Example',
    exampleValue:
      '{"name":"QuickoTools","type":"utility","features":["format","validate","beautify"]}',
    emptyOutput: 'Formatted JSON will appear here.',
    errorInvalid: 'Invalid JSON. Please check your input.',
    emptyState: 'Paste your JSON, then click format to beautify it.',
    infoTitle: 'What is a JSON Formatter?',
    infoText:
      'A JSON formatter helps you organize raw JSON into a readable structure with proper indentation, making it easier to debug, edit, and inspect.'
  },
  ar: {
    metaTitle: 'منسق JSON - QuickoTools',
    metaDescription:
      'نسّق JSON واجعله أوضح وأسهل للقراءة فورًا باستخدام أداة منسق JSON المجانية من QuickoTools.',
    title: 'منسق JSON',
    description:
      'نسّق JSON واجعله أوضح وأسهل للقراءة فورًا لتسهيل المراجعة والتطوير.',
    inputTitle: 'إدخال JSON',
    inputLabel: 'إدخال JSON',
    outputTitle: 'JSON بعد التنسيق',
    placeholder: 'ألصق JSON هنا...',
    format: 'تنسيق JSON',
    clear: 'مسح',
    copy: 'نسخ النتيجة',
    copied: 'تم النسخ!',
    loadExample: 'تجربة مثال',
    exampleValue:
      '{"name":"QuickoTools","type":"utility","features":["format","validate","beautify"]}',
    emptyOutput: 'سيظهر JSON المنسق هنا.',
    errorInvalid: 'JSON غير صالح. يرجى التحقق من الإدخال.',
    emptyState: 'ألصق JSON ثم اضغط على التنسيق لتحسين عرضه.',
    infoTitle: 'ما هو منسق JSON؟',
    infoText:
      'يساعدك منسق JSON على تنظيم JSON الخام داخل بنية واضحة مع مسافات بادئة مناسبة، مما يسهل قراءته وتعديله وفحصه.'
  }
};

function JSONFormatter({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const handleChange = useCallback((event) => {
    setInputText(event.target.value);
    setOutputText('');
    setError('');
    setCopied(false);
  }, []);

  const handleFormat = useCallback(() => {
    try {
      const parsed = JSON.parse(inputText);
      const formatted = JSON.stringify(parsed, null, 2);

      setOutputText(formatted);
      setError('');
      setCopied(false);
    } catch {
      setOutputText('');
      setError(currentContent.errorInvalid);
      setCopied(false);
    }
  }, [inputText, currentContent.errorInvalid]);

  const handleClear = useCallback(() => {
    setInputText('');
    setOutputText('');
    setError('');
    setCopied(false);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!outputText || error) return;

    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }, [outputText, error]);

  const handleLoadExample = useCallback(() => {
    setInputText(currentContent.exampleValue);
    setOutputText('');
    setError('');
    setCopied(false);
  }, [currentContent.exampleValue]);

  return (
    <main className="tool-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <section className="tool-shell">
        <div className="tool-shell-header">
          <span className="tool-shell-badge">QuickoTools</span>
          <h1 className="tool-shell-title">{currentContent.title}</h1>
          <p className="tool-shell-description">{currentContent.description}</p>
        </div>

        <section className="tool-panel">
          <div className="tool-panel-top">
            <div className="tool-panel-heading">
              <h2 className="tool-panel-title">{currentContent.inputTitle}</h2>
            </div>

            <div className="tool-panel-actions">
              <button
                type="button"
                className="tool-action-button tool-action-button-primary"
                onClick={handleLoadExample}
              >
                {currentContent.loadExample}
              </button>

              <button
                type="button"
                className="tool-action-button tool-action-button-secondary"
                onClick={handleClear}
                disabled={!inputText && !outputText}
              >
                {currentContent.clear}
              </button>
            </div>
          </div>

          <div className="tool-field">
            <label className="tool-label" htmlFor="json-formatter-input">
              {currentContent.inputLabel}
            </label>

            <textarea
              id="json-formatter-input"
              value={inputText}
              onChange={handleChange}
              placeholder={currentContent.placeholder}
              className="tool-textarea"
              aria-label={currentContent.inputLabel}
            />
          </div>

          <div className="tool-panel-actions tool-actions-row">
            <button
              type="button"
              className="tool-action-button tool-action-button-primary"
              onClick={handleFormat}
              disabled={!inputText}
            >
              {currentContent.format}
            </button>
          </div>

          {!inputText.trim() && !error && (
            <p className="tool-helper-text">{currentContent.emptyState}</p>
          )}

          {copied && (
            <p className="tool-helper-text tool-helper-text-success">
              {currentContent.copied}
            </p>
          )}
        </section>

        <section className="tool-panel">
          <div className="tool-panel-top">
            <div className="tool-panel-heading">
              <h2 className="tool-panel-title">{currentContent.outputTitle}</h2>
            </div>

            <div className="tool-panel-actions">
              <button
                type="button"
                className="tool-action-button tool-action-button-primary"
                onClick={handleCopy}
                disabled={!outputText || Boolean(error)}
              >
                {currentContent.copy}
              </button>
            </div>
          </div>

          <div className="tool-result-box">
            <pre
              className={`tool-result-text ${
                !outputText && !error ? 'tool-result-placeholder' : ''
              } ${error ? 'tool-helper-text-error' : ''}`}
              style={{ margin: 0, direction: 'ltr', textAlign: 'left' }}
            >
              {error || outputText || currentContent.emptyOutput}
            </pre>
          </div>
        </section>

        <section className="tool-panel">
          <div className="tool-panel-heading">
            <h2 className="tool-panel-title">{currentContent.infoTitle}</h2>
          </div>
          <p className="tool-helper-text">{currentContent.infoText}</p>
        </section>
      </section>
    </main>
  );
}

export default JSONFormatter;