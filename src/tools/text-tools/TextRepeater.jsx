import { useCallback, useMemo, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Text Repeater - QuickoTools',
    metaDescription:
      'Repeat any text multiple times instantly with the free Text Repeater tool from QuickoTools.',
    badge: 'Text Tool',
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
    copyFailed: 'Copy was not available. Please copy the result manually.',
    resultTitle: 'Repeated Text',
    resultPlaceholder: 'Your repeated text will appear here.',
    infoTitle: 'What is a Text Repeater?',
    infoText:
      'A text repeater duplicates the same text multiple times, which is useful for testing, formatting, and quick content generation.',
    loadExample: 'Try Example',
    exampleText: 'Hello',
    invalidCount: 'Please enter a valid repeat count between 1 and 1000.',
    emptyState: 'Enter text and a repeat count, then generate the result.',
    compatibilityTitle: 'Browser note',
    compatibilityText:
      'If copy does not work inside an in-app browser such as Facebook or Instagram, open this tool in Chrome, Safari, or another full browser.',
    statsTitle: 'Quick Stats',
    repeatCountStat: 'Repeat Count',
    outputLines: 'Output Lines',
    outputCharacters: 'Output Characters',
    tipTitle: 'Helpful tip',
    tipText:
      'Use a smaller repeat count first if you want to preview the result before generating a very long repeated text.'
  },
  ar: {
    metaTitle: 'مكرر النص - QuickoTools',
    metaDescription:
      'كرر أي نص عدة مرات فورًا باستخدام أداة مكرر النص المجانية من QuickoTools.',
    badge: 'أداة نصوص',
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
    copyFailed: 'تعذر النسخ تلقائيًا. يرجى نسخ النتيجة يدويًا.',
    resultTitle: 'النص المكرر',
    resultPlaceholder: 'سيظهر النص المكرر هنا.',
    infoTitle: 'ما هو مكرر النص؟',
    infoText:
      'مكرر النص هو أداة تقوم بتكرار نفس النص عدة مرات، وهو مفيد للاختبار والتنسيق وإنشاء محتوى سريع.',
    loadExample: 'تجربة مثال',
    exampleText: 'مرحبا',
    invalidCount: 'يرجى إدخال عدد تكرار صالح بين 1 و 1000.',
    emptyState: 'أدخل النص وحدد عدد التكرار ثم أنشئ النتيجة.',
    compatibilityTitle: 'ملاحظة مهمة',
    compatibilityText:
      'إذا لم تعمل ميزة النسخ داخل متصفح التطبيق مثل فيسبوك أو إنستغرام، افتح الأداة في Chrome أو Safari أو أي متصفح كامل.',
    statsTitle: 'إحصائيات سريعة',
    repeatCountStat: 'عدد التكرار',
    outputLines: 'عدد الأسطر الناتجة',
    outputCharacters: 'عدد الأحرف الناتجة',
    tipTitle: 'نصيحة مفيدة',
    tipText:
      'استخدم عدد تكرار صغير أولًا إذا أردت معاينة النتيجة قبل إنشاء نص طويل جدًا.'
  }
};

function TextRepeater({ language }) {
  const isArabic = language === 'ar';
  const currentContent = isArabic ? content.ar : content.en;

  const [text, setText] = useState('');
  const [count, setCount] = useState(5);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [error, setError] = useState('');

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const safeCount = Number(count);

  const hasValidOutput = useMemo(() => {
    return Boolean(output && !error);
  }, [output, error]);

  const stats = useMemo(() => {
    return [
      {
        key: 'repeatCount',
        label: currentContent.repeatCountStat,
        value: Number.isFinite(safeCount) && safeCount > 0 ? safeCount : 0
      },
      {
        key: 'outputLines',
        label: currentContent.outputLines,
        value: output ? output.split('\n').length : 0
      },
      {
        key: 'outputCharacters',
        label: currentContent.outputCharacters,
        value: output.length
      }
    ];
  }, [currentContent, safeCount, output]);

  const handleTextChange = useCallback((event) => {
    setText(event.target.value);
    setCopied(false);
    setCopyError(false);
    setError('');
  }, []);

  const handleCountChange = useCallback((event) => {
    setCount(event.target.value);
    setCopied(false);
    setCopyError(false);
    setError('');
  }, []);

  const handleGenerate = useCallback(() => {
    const numericCount = Number(count);

    if (!text.trim() || !numericCount || numericCount < 1 || numericCount > 1000) {
      setOutput('');
      setError(currentContent.invalidCount);
      setCopied(false);
      setCopyError(false);
      return;
    }

    const repeated = Array.from({ length: numericCount }, () => text).join('\n');

    setOutput(repeated);
    setError('');
    setCopied(false);
    setCopyError(false);
  }, [text, count, currentContent.invalidCount]);

  const handleClear = useCallback(() => {
    setText('');
    setCount(5);
    setOutput('');
    setCopied(false);
    setCopyError(false);
    setError('');
  }, []);

  const handleLoadExample = useCallback(() => {
    setText(currentContent.exampleText);
    setCount(5);
    setOutput('');
    setCopied(false);
    setCopyError(false);
    setError('');
  }, [currentContent.exampleText]);

  const fallbackCopyText = useCallback((value) => {
    const textArea = document.createElement('textarea');
    textArea.value = value;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    } catch {
      document.body.removeChild(textArea);
      return false;
    }
  }, []);

  const handleCopy = useCallback(async () => {
    if (!hasValidOutput) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(output);
      } else {
        const copiedWithFallback = fallbackCopyText(output);

        if (!copiedWithFallback) {
          throw new Error('Fallback copy failed');
        }
      }

      setCopied(true);
      setCopyError(false);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }, [hasValidOutput, output, fallbackCopyText]);

  return (
    <main className="tool-page" dir={isArabic ? 'rtl' : 'ltr'}>
      <section className="tool-shell">
        <div className="tool-shell-header">
          <span className="tool-shell-badge">{currentContent.badge}</span>
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

          {copied && (
            <p className="tool-helper-text tool-helper-text-success">
              {currentContent.copied}
            </p>
          )}

          {copyError && (
            <p className="tool-helper-text tool-helper-text-error">
              {currentContent.copyFailed}
            </p>
          )}
        </section>

        <section className="tool-panel">
          <div className="tool-panel-top">
            <div className="tool-panel-heading">
              <h2 className="tool-panel-title">{currentContent.statsTitle}</h2>
            </div>
          </div>

          <div className="tool-stats-grid">
            {stats.map((item) => (
              <div key={item.key} className="tool-stat-card">
                <h3 className="tool-stat-label">{item.label}</h3>
                <p className="tool-stat-value">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="tool-info-grid">
          <div className="tool-info-card">
            <h2 className="tool-info-title">{currentContent.infoTitle}</h2>
            <p className="tool-info-text">{currentContent.infoText}</p>
          </div>

          <div className="tool-info-card">
            <h2 className="tool-info-title">{currentContent.compatibilityTitle}</h2>
            <p className="tool-info-text">{currentContent.compatibilityText}</p>

            <div className="tool-example-box">
              <span className="tool-example-label">{currentContent.tipTitle}</span>
              <div className="tool-example-content">
                {currentContent.tipText}
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default TextRepeater;