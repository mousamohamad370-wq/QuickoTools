import { useCallback, useMemo, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Text Repeater - QuickoTools',
    metaDescription:
      'Repeat any text multiple times instantly with the free Text Repeater tool from QuickoTools.',
    title: 'Text Repeater',
    description:
      'Repeat any text multiple times instantly for testing, formatting, and content tasks.',
    inputTitle: 'Repeat Your Text',
    textLabel: 'Text',
    textPlaceholder: 'Enter your text here...',
    countLabel: 'Repeat Count',
    countPlaceholder: 'Enter repeat count',
    generate: 'Repeat Text',
    clear: 'Clear',
    copy: 'Copy Result',
    copied: 'Copied!',
    resultTitle: 'Repeated Text',
    resultPlaceholder: 'Your repeated text will appear here.',
    infoTitle: 'What is a Text Repeater?',
    infoText:
      'A text repeater duplicates the same text multiple times, which is useful for testing, formatting, and quick content generation.',
    loadExample: 'Try Example',
    exampleText: 'Hello',
    invalidCount: 'Please enter a valid repeat count between 1 and 1000.',
    emptyState: 'Enter text and a repeat count, then generate the result.'
  },
  ar: {
    metaTitle: 'مكرر النص - QuickoTools',
    metaDescription:
      'كرر أي نص عدة مرات فورًا باستخدام أداة مكرر النص المجانية من QuickoTools.',
    title: 'مكرر النص',
    description:
      'كرر أي نص عدة مرات فورًا لأغراض الاختبار والتنسيق وإنشاء المحتوى.',
    inputTitle: 'كرّر النص',
    textLabel: 'النص',
    textPlaceholder: 'أدخل النص هنا...',
    countLabel: 'عدد التكرار',
    countPlaceholder: 'أدخل عدد مرات التكرار',
    generate: 'تكرار النص',
    clear: 'مسح',
    copy: 'نسخ النتيجة',
    copied: 'تم النسخ!',
    resultTitle: 'النص المكرر',
    resultPlaceholder: 'سيظهر النص المكرر هنا.',
    infoTitle: 'ما هو مكرر النص؟',
    infoText:
      'مكرر النص هو أداة تقوم بتكرار نفس النص عدة مرات، وهو مفيد للاختبار والتنسيق وإنشاء محتوى سريع.',
    loadExample: 'تجربة مثال',
    exampleText: 'مرحبا',
    invalidCount: 'يرجى إدخال عدد تكرار صالح بين 1 و 1000.',
    emptyState: 'أدخل النص وحدد عدد التكرار ثم أنشئ النتيجة.'
  }
};

function TextRepeater({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;

  const [text, setText] = useState('');
  const [count, setCount] = useState(5);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const hasValidOutput = useMemo(() => {
    return Boolean(output && !error);
  }, [output, error]);

  const handleTextChange = useCallback((event) => {
    setText(event.target.value);
    setCopied(false);
    setError('');
  }, []);

  const handleCountChange = useCallback((event) => {
    setCount(event.target.value);
    setCopied(false);
    setError('');
  }, []);

  const handleGenerate = useCallback(() => {
    const safeCount = Number(count);

    if (!text.trim() || !safeCount || safeCount < 1 || safeCount > 1000) {
      setOutput('');
      setError(currentContent.invalidCount);
      setCopied(false);
      return;
    }

    const repeated = Array.from({ length: safeCount }, () => text).join('\n');

    setOutput(repeated);
    setError('');
    setCopied(false);
  }, [text, count, currentContent.invalidCount]);

  const handleClear = useCallback(() => {
    setText('');
    setCount(5);
    setOutput('');
    setCopied(false);
    setError('');
  }, []);

  const handleLoadExample = useCallback(() => {
    setText(currentContent.exampleText);
    setCount(5);
    setOutput('');
    setCopied(false);
    setError('');
  }, [currentContent.exampleText]);

  const handleCopy = useCallback(async () => {
    if (!hasValidOutput) return;

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }, [hasValidOutput, output]);

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
                disabled={!text && !output && Number(count) === 5}
              >
                {currentContent.clear}
              </button>
            </div>
          </div>

          <div className="tool-field">
            <label className="tool-label" htmlFor="text-repeater-input">
              {currentContent.textLabel}
            </label>
            <textarea
              id="text-repeater-input"
              value={text}
              onChange={handleTextChange}
              placeholder={currentContent.textPlaceholder}
              className="tool-textarea"
              aria-label={currentContent.textLabel}
            />
          </div>

          <div className="tool-field">
            <label className="tool-label" htmlFor="text-repeater-count">
              {currentContent.countLabel}
            </label>
            <input
              id="text-repeater-count"
              type="number"
              min="1"
              max="1000"
              value={count}
              onChange={handleCountChange}
              placeholder={currentContent.countPlaceholder}
              className="tool-input"
              aria-label={currentContent.countLabel}
            />
          </div>

          <div className="tool-panel-actions tool-actions-row">
            <button
              type="button"
              className="tool-action-button tool-action-button-primary"
              onClick={handleGenerate}
            >
              {currentContent.generate}
            </button>
          </div>

          {!text.trim() && !output && !error && (
            <p className="tool-helper-text">{currentContent.emptyState}</p>
          )}

          {copied && (
            <p className="tool-helper-text tool-helper-text-success">
              {currentContent.copied}
            </p>
          )}

          {error && (
            <p className="tool-helper-text tool-helper-text-error">{error}</p>
          )}
        </section>

        <section className="tool-panel">
          <div className="tool-panel-top">
            <div className="tool-panel-heading">
              <h2 className="tool-panel-title">{currentContent.resultTitle}</h2>
            </div>

            <div className="tool-panel-actions">
              <button
                type="button"
                className="tool-action-button tool-action-button-primary"
                onClick={handleCopy}
                disabled={!hasValidOutput}
              >
                {currentContent.copy}
              </button>
            </div>
          </div>

          <div className="tool-result-box">
            <p
              className={`tool-result-text ${
                !output && !error ? 'tool-result-placeholder' : ''
              }`}
            >
              {error || output || currentContent.resultPlaceholder}
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

export default TextRepeater;