import { useCallback, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'HTML Entity Encoder / Decoder - QuickoTools',
    metaDescription:
      'Encode special HTML characters into entities or decode them back into normal text instantly with the free HTML Entity Encoder / Decoder tool from QuickoTools.',
    title: 'HTML Entity Encoder / Decoder',
    description:
      'Encode special HTML characters into entities or decode them back into normal text instantly.',
    inputTitle: 'Input',
    inputLabel: 'Input',
    inputPlaceholder: 'Enter text or HTML entities here...',
    outputTitle: 'Result',
    outputPlaceholder: 'The result will appear here.',
    encode: 'Encode',
    decode: 'Decode',
    clear: 'Clear',
    copy: 'Copy Result',
    copied: 'Copied!',
    loadExample: 'Load Example',
    exampleValue: '<div class="box">Hello & welcome</div>',
    infoTitle: 'What are HTML entities?',
    infoText:
      'HTML entities are special character codes used to safely display reserved symbols like <, >, &, and quotes inside HTML.',
    invalidInput: 'Unable to decode the provided HTML entities',
    emptyState:
      'Enter text or HTML entities, then choose whether to encode or decode.'
  },
  ar: {
    metaTitle: 'تشفير وفك HTML Entities - QuickoTools',
    metaDescription:
      'حوّل أحرف HTML الخاصة إلى entities أو فكها إلى نص عادي فورًا باستخدام أداة تشفير وفك HTML Entities المجانية من QuickoTools.',
    title: 'تشفير وفك HTML Entities',
    description:
      'حوّل أحرف HTML الخاصة إلى entities أو فكها إلى نص عادي فورًا.',
    inputTitle: 'الإدخال',
    inputLabel: 'الإدخال',
    inputPlaceholder: 'أدخل النص أو HTML entities هنا...',
    outputTitle: 'النتيجة',
    outputPlaceholder: 'ستظهر النتيجة هنا.',
    encode: 'تشفير',
    decode: 'فك',
    clear: 'مسح',
    copy: 'نسخ النتيجة',
    copied: 'تم النسخ!',
    loadExample: 'تجربة مثال',
    exampleValue: '<div class="box">Hello & welcome</div>',
    infoTitle: 'ما هي HTML entities؟',
    infoText:
      'HTML entities هي رموز خاصة تُستخدم لعرض الأحرف المحجوزة مثل < و > و & وعلامات الاقتباس بأمان داخل HTML.',
    invalidInput: 'تعذر فك HTML entities المدخلة',
    emptyState: 'أدخل النص أو HTML entities ثم اختر التشفير أو الفك.'
  }
};

function encodeHtmlEntities(value) {
  const textarea = document.createElement('textarea');
  textarea.textContent = value;
  return textarea.innerHTML;
}

function decodeHtmlEntities(value) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = value;
  return textarea.value;
}

function HTMLEntityEncoderDecoder({ language }) {
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

  const handleEncode = useCallback(() => {
    const encoded = encodeHtmlEntities(inputText);

    setOutputText(encoded);
    setError('');
    setCopied(false);
  }, [inputText]);

  const handleDecode = useCallback(() => {
    const decoded = decodeHtmlEntities(inputText);

    if (!inputText.trim()) {
      setOutputText('');
      setError('');
      setCopied(false);
      return;
    }

    if (decoded === inputText && !/&[a-zA-Z0-9#]+;/.test(inputText)) {
      setOutputText('');
      setError(currentContent.invalidInput);
      setCopied(false);
      return;
    }

    setOutputText(decoded);
    setError('');
    setCopied(false);
  }, [inputText, currentContent.invalidInput]);

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
            <label className="tool-label" htmlFor="html-entity-input">
              {currentContent.inputLabel}
            </label>

            <textarea
              id="html-entity-input"
              value={inputText}
              onChange={handleChange}
              placeholder={currentContent.inputPlaceholder}
              className="tool-textarea"
              aria-label={currentContent.inputLabel}
            />
          </div>

          <div className="tool-panel-actions tool-actions-row">
            <button
              type="button"
              className="tool-action-button tool-action-button-primary"
              onClick={handleEncode}
              disabled={!inputText}
            >
              {currentContent.encode}
            </button>

            <button
              type="button"
              className="tool-action-button tool-action-button-secondary"
              onClick={handleDecode}
              disabled={!inputText}
            >
              {currentContent.decode}
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
            <p
              className={`tool-result-text ${
                !outputText && !error ? 'tool-result-placeholder' : ''
              } ${error ? 'tool-helper-text-error' : ''}`}
            >
              {error || outputText || currentContent.outputPlaceholder}
            </p>
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

export default HTMLEntityEncoderDecoder;