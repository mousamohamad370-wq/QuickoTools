import { useCallback, useEffect, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Base64 Encoder / Decoder - QuickoTools',
    metaDescription:
      'Encode text to Base64 or decode Base64 back to plain text instantly with the free Base64 Encoder / Decoder tool from QuickoTools.',
    title: 'Base64 Encoder / Decoder',
    description:
      'Encode text to Base64 or decode Base64 back to plain text instantly.',
    inputTitle: 'Input',
    inputLabel: 'Input',
    inputPlaceholder: 'Enter text or Base64 value here...',
    outputTitle: 'Result',
    outputPlaceholder: 'The result will appear here.',
    encode: 'Encode',
    decode: 'Decode',
    clear: 'Clear',
    copy: 'Copy Result',
    copied: 'Copied!',
    swap: 'Swap Output to Input',
    invalidBase64: 'Invalid Base64 input',
    detectedBase64: 'Detected Base64 text',
    loadExample: 'Load Example',
    exampleValue: 'Hello World',
    emptyState:
      'Enter text or Base64 content, then choose whether to encode or decode.',
    infoTitle: 'What is Base64?',
    infoText:
      'Base64 is a method used to encode binary data into text format so it can be safely transmitted over the internet.'
  },
  ar: {
    metaTitle: 'تشفير وفك Base64 - QuickoTools',
    metaDescription:
      'حوّل النص إلى Base64 أو فك Base64 إلى نص عادي فورًا باستخدام أداة التشفير وفك Base64 المجانية من QuickoTools.',
    title: 'تشفير وفك Base64',
    description:
      'حوّل النص إلى Base64 أو فك Base64 إلى نص عادي فورًا.',
    inputTitle: 'الإدخال',
    inputLabel: 'الإدخال',
    inputPlaceholder: 'أدخل النص أو قيمة Base64 هنا...',
    outputTitle: 'النتيجة',
    outputPlaceholder: 'ستظهر النتيجة هنا.',
    encode: 'تشفير',
    decode: 'فك',
    clear: 'مسح',
    copy: 'نسخ النتيجة',
    copied: 'تم النسخ!',
    swap: 'نقل الناتج إلى الإدخال',
    invalidBase64: 'نص Base64 غير صالح',
    detectedBase64: 'تم اكتشاف نص Base64',
    loadExample: 'تجربة مثال',
    exampleValue: 'Hello World',
    emptyState: 'أدخل النص أو محتوى Base64 ثم اختر التشفير أو الفك.',
    infoTitle: 'ما هو Base64؟',
    infoText:
      'Base64 هي طريقة تُستخدم لترميز البيانات الثنائية إلى صيغة نصية حتى يمكن نقلها بأمان عبر الإنترنت.'
  }
};

function isValidBase64(value) {
  const trimmed = value.trim();

  if (!trimmed || trimmed.length % 4 !== 0) {
    return false;
  }

  const base64Regex =
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

  if (!base64Regex.test(trimmed)) {
    return false;
  }

  try {
    return btoa(atob(trimmed)) === trimmed;
  } catch {
    return false;
  }
}

function encodeBase64(value) {
  return btoa(unescape(encodeURIComponent(value)));
}

function decodeBase64(value) {
  return decodeURIComponent(escape(atob(value.trim())));
}

function Base64EncoderDecoder({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [detectedBase64, setDetectedBase64] = useState(false);

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  useEffect(() => {
    setDetectedBase64(isValidBase64(inputText));
    setCopied(false);
  }, [inputText]);

  const handleChange = useCallback((event) => {
    setInputText(event.target.value);
    setError('');
    setCopied(false);
  }, []);

  const handleEncode = useCallback(() => {
    try {
      const encoded = encodeBase64(inputText);
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
      const decoded = decodeBase64(inputText);
      setOutputText(decoded);
      setError('');
      setCopied(false);
    } catch {
      setOutputText('');
      setError(currentContent.invalidBase64);
      setCopied(false);
    }
  }, [inputText, currentContent.invalidBase64]);

  const handleClear = useCallback(() => {
    setInputText('');
    setOutputText('');
    setError('');
    setCopied(false);
    setDetectedBase64(false);
  }, []);

  const handleSwap = useCallback(() => {
    if (!outputText) return;

    setInputText(outputText);
    setOutputText('');
    setError('');
    setCopied(false);
  }, [outputText]);

  const handleCopy = useCallback(async () => {
    if (!outputText) return;

    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }, [outputText]);

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
            <label className="tool-label" htmlFor="base64-input">
              {currentContent.inputLabel}
            </label>

            <textarea
              id="base64-input"
              value={inputText}
              onChange={handleChange}
              placeholder={currentContent.inputPlaceholder}
              className="tool-textarea"
              aria-label={currentContent.inputLabel}
            />
          </div>

          {(detectedBase64 || copied) && (
            <div className="tool-panel-actions">
              {detectedBase64 && (
                <p className="tool-helper-text">{currentContent.detectedBase64}</p>
              )}

              {copied && (
                <p className="tool-helper-text tool-helper-text-success">
                  {currentContent.copied}
                </p>
              )}
            </div>
          )}

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

            <button
              type="button"
              className="tool-action-button tool-action-button-secondary"
              onClick={handleSwap}
              disabled={!outputText}
            >
              {currentContent.swap}
            </button>
          </div>

          {!inputText.trim() && !error && (
            <p className="tool-helper-text">{currentContent.emptyState}</p>
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
                disabled={!outputText}
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

export default Base64EncoderDecoder;