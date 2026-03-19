import { useCallback, useMemo, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Remove Duplicate Lines - QuickoTools',
    metaDescription:
      'Remove duplicate lines from your text instantly with the free Remove Duplicate Lines tool from QuickoTools.',
    badge: 'Text Tool',
    title: 'Remove Duplicate Lines',
    description:
      'Remove repeated lines from your text instantly while keeping only unique lines in the output.',
    inputTitle: 'Input Text',
    inputLabel: 'Input Text',
    outputTitle: 'Cleaned Output',
    placeholder: 'Paste your lines here...',
    resultPlaceholder: 'Your cleaned text will appear here.',
    remove: 'Remove Duplicates',
    clear: 'Clear',
    copy: 'Copy Result',
    copied: 'Copied!',
    copyFailed: 'Copy was not available. Please copy the result manually.',
    loadExample: 'Load Example',
    exampleText: 'apple\nbanana\napple\norange\nbanana',
    totalLines: 'Total Lines',
    uniqueLines: 'Unique Lines',
    removedDuplicates: 'Removed Duplicates',
    emptyState: 'Paste your lines, then remove duplicates to generate clean output.',
    infoTitle: 'What does this tool do?',
    infoText:
      'This tool removes duplicate lines from your text while preserving the first occurrence of each line.',
    compatibilityTitle: 'Browser note',
    compatibilityText:
      'If copy does not work inside an in-app browser such as Facebook or Instagram, open this tool in Chrome, Safari, or another full browser.',
    tipTitle: 'Helpful tip',
    tipText:
      'This tool keeps the first appearance of each line and removes later duplicates, so the original order of unique lines stays intact.',
    statsTitle: 'Quick Stats'
  },
  ar: {
    metaTitle: 'إزالة الأسطر المكررة - QuickoTools',
    metaDescription:
      'أزل الأسطر المكررة من النص فورًا باستخدام أداة إزالة الأسطر المكررة المجانية من QuickoTools.',
    badge: 'أداة نصوص',
    title: 'إزالة الأسطر المكررة',
    description:
      'أزل الأسطر المكررة من النص فورًا مع الاحتفاظ بالأسطر الفريدة فقط في النتيجة.',
    inputTitle: 'النص المدخل',
    inputLabel: 'النص المدخل',
    outputTitle: 'الناتج المنظف',
    placeholder: 'ألصق الأسطر هنا...',
    resultPlaceholder: 'سيظهر النص المنظف هنا.',
    remove: 'إزالة التكرار',
    clear: 'مسح',
    copy: 'نسخ النتيجة',
    copied: 'تم النسخ!',
    copyFailed: 'تعذر النسخ تلقائيًا. يرجى نسخ النتيجة يدويًا.',
    loadExample: 'تجربة مثال',
    exampleText: 'تفاح\nموز\nتفاح\nبرتقال\nموز',
    totalLines: 'إجمالي الأسطر',
    uniqueLines: 'الأسطر الفريدة',
    removedDuplicates: 'الأسطر المكررة المحذوفة',
    emptyState: 'ألصق الأسطر ثم أزل التكرار لإنشاء الناتج المنظف.',
    infoTitle: 'ماذا تفعل هذه الأداة؟',
    infoText:
      'تقوم هذه الأداة بحذف الأسطر المكررة من النص مع الاحتفاظ بأول ظهور فقط لكل سطر.',
    compatibilityTitle: 'ملاحظة مهمة',
    compatibilityText:
      'إذا لم تعمل ميزة النسخ داخل متصفح التطبيق مثل فيسبوك أو إنستغرام، افتح الأداة في Chrome أو Safari أو أي متصفح كامل.',
    tipTitle: 'نصيحة مفيدة',
    tipText:
      'تحتفظ هذه الأداة بأول ظهور لكل سطر وتحذف التكرارات اللاحقة، لذلك يبقى ترتيب الأسطر الفريدة كما هو.',
    statsTitle: 'إحصائيات سريعة'
  }
};

function RemoveDuplicateLines({ language }) {
  const isArabic = language === 'ar';
  const currentContent = isArabic ? content.ar : content.en;

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const stats = useMemo(() => {
    const inputLines = inputText ? inputText.split('\n') : [];
    const uniqueLines = inputText ? [...new Set(inputLines)] : [];
    const cleanedText = uniqueLines.join('\n');
    const removedDuplicates = Math.max(0, inputLines.length - uniqueLines.length);

    return {
      totalLines: inputLines.length,
      uniqueLines: uniqueLines.length,
      removedDuplicates,
      cleanedText
    };
  }, [inputText]);

  const cards = useMemo(() => {
    return [
      {
        key: 'totalLines',
        label: currentContent.totalLines,
        value: stats.totalLines
      },
      {
        key: 'uniqueLines',
        label: currentContent.uniqueLines,
        value: stats.uniqueLines
      },
      {
        key: 'removedDuplicates',
        label: currentContent.removedDuplicates,
        value: stats.removedDuplicates
      }
    ];
  }, [
    currentContent.totalLines,
    currentContent.uniqueLines,
    currentContent.removedDuplicates,
    stats.totalLines,
    stats.uniqueLines,
    stats.removedDuplicates
  ]);

  const handleChange = useCallback((event) => {
    setInputText(event.target.value);
    setCopied(false);
    setCopyError(false);
  }, []);

  const handleRemoveDuplicates = useCallback(() => {
    setOutputText(stats.cleanedText);
    setCopied(false);
    setCopyError(false);
  }, [stats.cleanedText]);

  const handleClear = useCallback(() => {
    setInputText('');
    setOutputText('');
    setCopied(false);
    setCopyError(false);
  }, []);

  const handleLoadExample = useCallback(() => {
    setInputText(currentContent.exampleText);
    setOutputText('');
    setCopied(false);
    setCopyError(false);
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
                onClick={handleRemoveDuplicates}
                disabled={!inputText}
              >
                {currentContent.remove}
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
            <label className="tool-label" htmlFor="remove-duplicate-lines-input">
              {currentContent.inputLabel}
            </label>

            <textarea
              id="remove-duplicate-lines-input"
              value={inputText}
              onChange={handleChange}
              placeholder={currentContent.placeholder}
              className="tool-textarea"
              aria-label={currentContent.inputTitle}
            />
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
              {outputText || currentContent.resultPlaceholder}
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
            {cards.map((item) => (
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

export default RemoveDuplicateLines;