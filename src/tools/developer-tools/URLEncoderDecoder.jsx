import { useCallback, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'URL Encoder / Decoder - QuickoTools',
    metaDescription:
      'Encode URLs and text for safe web usage or decode them back instantly with the free URL Encoder / Decoder tool from QuickoTools.',
    title: 'URL Encoder / Decoder',
    description:
      'Encode URLs and text for safe web usage or decode them back instantly.',
    inputTitle: 'Input',
    inputLabel: 'Input',
    inputPlaceholder: 'Enter text or URL here...',
    outputTitle: 'Result',
    outputPlaceholder: 'The result will appear here.',
    encode: 'Encode',
    decode: 'Decode',
    clear: 'Clear',
    copy: 'Copy Result',
    copied: 'Copied!',
    invalidInput: 'Invalid encoded URL input',
    infoTitle: 'What is URL encoding?',
    infoText:
      'URL encoding converts special characters into a format that can be safely used inside web addresses.',
    loadExample: 'Load Example',
    exampleValue: 'https://example.com/search?q=hello world&lang=en',
    emptyState:
      'Enter text or a URL, then choose whether to encode or decode.'
  },
  ar: {
    metaTitle: 'تشفير وفك URL - QuickoTools',
    metaDescription:
      'قم بترميز الروابط والنصوص لاستخدامها بأمان في الويب أو فكها فورًا باستخدام أداة تشفير وفك URL المجانية من QuickoTools.',
    title: 'تشفير وفك URL',
    description:
      'قم بترميز الروابط والنصوص لاستخدامها بأمان في الويب أو فكها فورًا.',
    inputTitle: 'الإدخال',
    inputLabel: 'الإدخال',
    inputPlaceholder: 'أدخل النص أو الرابط هنا...',
    outputTitle: 'النتيجة',
    outputPlaceholder: 'ستظهر النتيجة هنا.',
    encode: 'تشفير',
    decode: 'فك',
    clear: 'مسح',
    copy: 'نسخ النتيجة',
    copied: 'تم النسخ!',
    invalidInput: 'الرابط أو النص المشفر غير صالح',
    infoTitle: 'ما هو URL encoding؟',
    infoText:
      'ترميز URL يحول الأحرف الخاصة إلى صيغة يمكن استخدامها بأمان داخل عناوين وروابط الويب.',
    loadExample: 'تجربة مثال',
    exampleValue: 'https://example.com/search?q=hello world&lang=en',
    emptyState: 'أدخل النص أو الرابط ثم اختر التشفير أو الفك.'
  }
};

function URLEncoderDecoder({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const handleChange = useCallback((event) => {
    setInputText(event.target.value);
    setOutputText('');
    setError('');
    setCopied(false);
  }, []);

  const handleEncode = useCallback(() => {
    try {
      const encoded = encodeURIComponent(inputText);
      setOutputText(encoded);
      setError('');
      setCopied(false);
    } catch {
      setOutputText('');
      setError('');
      setCopied(false);
    }
  }, [inputText]);

  const handleDecode = useCallback(() => {
    try {
      const decoded = decodeURIComponent(inputText);
      setOutputText(decoded);
      setError('');
      setCopied(false);
    } catch {
      setOutputText('');
      setError(currentContent.invalidInput);
      setCopied(false);
    }
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
            <label className="tool-label" htmlFor="url-encoder-input">
              {currentContent.inputLabel}
            </label>

            <textarea
              id="url-encoder-input"
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

export default URLEncoderDecoder;