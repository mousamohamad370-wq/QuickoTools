import { useCallback, useMemo, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Remove Empty Lines - QuickoTools',
    metaDescription:
      'Remove empty lines from text instantly with the free Remove Empty Lines tool from QuickoTools.',
    badge: 'Text Tool',
    title: 'Remove Empty Lines',
    description:
      'Remove empty lines from text instantly and clean up unnecessary line spacing.',
    inputTitle: 'Input Text',
    inputLabel: 'Input Text',
    inputPlaceholder: 'Paste your text here...',
    outputTitle: 'Cleaned Text',
    outputPlaceholder: 'Your cleaned text will appear here.',
    remove: 'Remove Empty Lines',
    clear: 'Clear',
    copy: 'Copy Result',
    copied: 'Copied!',
    copyFailed: 'Copy was not available. Please copy the result manually.',
    loadExample: 'Load Example',
    exampleValue: 'Apple\n\nBanana\n\n\nOrange\nGrape\n\n',
    emptyState:
      'Paste your text, then remove empty lines to generate clean output.',
    infoTitle: 'What does this tool do?',
    infoText:
      'This tool removes blank lines from your text while keeping the remaining lines in their original order.',
    compatibilityTitle: 'Browser note',
    compatibilityText:
      'If copy does not work inside an in-app browser such as Facebook or Instagram, open this tool in Chrome, Safari, or another full browser.',
    statsTitle: 'Quick Stats',
    originalLines: 'Original Lines',
    cleanedLines: 'Cleaned Lines',
    removedLines: 'Removed Empty Lines',
    tipTitle: 'Helpful tip',
    tipText:
      'This tool removes fully empty lines and lines that contain only spaces, while keeping the remaining text lines in order.'
  },
  ar: {
    metaTitle: 'إزالة الأسطر الفارغة - QuickoTools',
    metaDescription:
      'أزل الأسطر الفارغة من النص فورًا باستخدام أداة إزالة الأسطر الفارغة المجانية من QuickoTools.',
    badge: 'أداة نصوص',
    title: 'إزالة الأسطر الفارغة',
    description:
      'أزل الأسطر الفارغة من النص فورًا ونظّف تباعد الأسطر غير الضروري.',
    inputTitle: 'النص المدخل',
    inputLabel: 'النص المدخل',
    inputPlaceholder: 'ألصق النص هنا...',
    outputTitle: 'النص المنظف',
    outputPlaceholder: 'سيظهر النص المنظف هنا.',
    remove: 'إزالة الأسطر الفارغة',
    clear: 'مسح',
    copy: 'نسخ النتيجة',
    copied: 'تم النسخ!',
    copyFailed: 'تعذر النسخ تلقائيًا. يرجى نسخ النتيجة يدويًا.',
    loadExample: 'تجربة مثال',
    exampleValue: 'تفاح\n\nموز\n\n\nبرتقال\nعنب\n\n',
    emptyState:
      'ألصق النص ثم أزل الأسطر الفارغة لإنشاء الناتج المنظف.',
    infoTitle: 'ماذا تفعل هذه الأداة؟',
    infoText:
      'تقوم هذه الأداة بحذف الأسطر الفارغة من النص مع الحفاظ على ترتيب الأسطر المتبقية كما هو.',
    compatibilityTitle: 'ملاحظة مهمة',
    compatibilityText:
      'إذا لم تعمل ميزة النسخ داخل متصفح التطبيق مثل فيسبوك أو إنستغرام، افتح الأداة في Chrome أو Safari أو أي متصفح كامل.',
    statsTitle: 'إحصائيات سريعة',
    originalLines: 'عدد الأسطر الأصلية',
    cleanedLines: 'عدد الأسطر بعد التنظيف',
    removedLines: 'الأسطر الفارغة المحذوفة',
    tipTitle: 'نصيحة مفيدة',
    tipText:
      'تقوم هذه الأداة بحذف الأسطر الفارغة تمامًا وكذلك الأسطر التي تحتوي فقط على مسافات، مع الحفاظ على ترتيب بقية الأسطر.'
  }
};

function removeEmptyLines(text) {
  return text
    .split('\n')
    .filter((line) => line.trim() !== '')
    .join('\n');
}

function RemoveEmptyLines({ language }) {
  const isArabic = language === 'ar';
  const currentContent = isArabic ? content.ar : content.en;

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const stats = useMemo(() => {
    const inputLines = inputText ? inputText.split('\n') : [];
    const outputLines = outputText ? outputText.split('\n') : [];
    const removedCount = Math.max(0, inputLines.length - outputLines.length);

    return [
      {
        key: 'originalLines',
        label: currentContent.originalLines,
        value: inputLines.length
      },
      {
        key: 'cleanedLines',
        label: currentContent.cleanedLines,
        value: outputLines.length
      },
      {
        key: 'removedLines',
        label: currentContent.removedLines,
        value: removedCount
      }
    ];
  }, [inputText, outputText, currentContent]);

  const handleChange = useCallback((event) => {
    setInputText(event.target.value);
    setOutputText('');
    setCopied(false);
    setCopyError(false);
  }, []);

  const handleRemove = useCallback(() => {
    setOutputText(removeEmptyLines(inputText));
    setCopied(false);
    setCopyError(false);
  }, [inputText]);

  const handleClear = useCallback(() => {
    setInputText('');
    setOutputText('');
    setCopied(false);
    setCopyError(false);
  }, []);

  const handleLoadExample = useCallback(() => {
    setInputText(currentContent.exampleValue);
    setOutputText('');
    setCopied(false);
    setCopyError(false);
  }, [currentContent.exampleValue]);

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
    if (!outputText) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(outputText);
      } else {
        const copiedWithFallback = fallbackCopyText(outputText);

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
  }, [outputText, fallbackCopyText]);

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
                disabled={!inputText && !outputText}
              >
                {currentContent.clear}
              </button>
            </div>
          </div>

          <div className="tool-field">
            <label className="tool-label" htmlFor="remove-empty-lines-input">
              {currentContent.inputLabel}
            </label>

            <textarea
              id="remove-empty-lines-input"
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
              onClick={handleRemove}
              disabled={!inputText}
            >
              {currentContent.remove}
            </button>
          </div>

          {!inputText.trim() && (
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
                !outputText ? 'tool-result-placeholder' : ''
              }`}
            >
              {outputText || currentContent.outputPlaceholder}
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

export default RemoveEmptyLines;