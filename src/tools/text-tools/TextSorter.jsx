import { useCallback, useMemo, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Text Sorter - QuickoTools',
    metaDescription:
      'Sort lines of text alphabetically in ascending or descending order with the free Text Sorter tool from QuickoTools.',
    badge: 'Text Tool',
    title: 'Text Sorter',
    description:
      'Sort lines of text alphabetically in ascending or descending order instantly.',
    inputTitle: 'Input Text',
    inputLabel: 'Input Text',
    inputPlaceholder: 'Paste your lines here...',
    outputTitle: 'Sorted Text',
    outputPlaceholder: 'Your sorted text will appear here.',
    sortAZ: 'Sort A to Z',
    sortZA: 'Sort Z to A',
    clear: 'Clear',
    copy: 'Copy Result',
    copied: 'Copied!',
    copyFailed: 'Copy was not available. Please copy the result manually.',
    loadExample: 'Load Example',
    exampleValue: 'Banana\nApple\nOrange\nGrape',
    emptyState: 'Paste your text lines, then choose a sorting direction.',
    infoTitle: 'What does this tool do?',
    infoText:
      'This tool sorts text line by line in alphabetical order, which is useful for organizing names, lists, keywords, and other text data.',
    compatibilityTitle: 'Browser note',
    compatibilityText:
      'If copy does not work inside an in-app browser such as Facebook or Instagram, open this tool in Chrome, Safari, or another full browser.',
    statsTitle: 'Quick Stats',
    totalLines: 'Total Lines',
    nonEmptyLines: 'Non-Empty Lines',
    sortTipTitle: 'Helpful tip',
    sortTipText:
      'For the cleanest result, remove extra blank lines before sorting if your list contains spacing gaps.'
  },
  ar: {
    metaTitle: 'ترتيب النص - QuickoTools',
    metaDescription:
      'رتّب أسطر النص أبجديًا تصاعديًا أو تنازليًا باستخدام أداة ترتيب النص المجانية من QuickoTools.',
    badge: 'أداة نصوص',
    title: 'ترتيب النص',
    description:
      'رتّب أسطر النص أبجديًا تصاعديًا أو تنازليًا فورًا.',
    inputTitle: 'النص المدخل',
    inputLabel: 'النص المدخل',
    inputPlaceholder: 'ألصق الأسطر هنا...',
    outputTitle: 'النص المرتب',
    outputPlaceholder: 'سيظهر النص المرتب هنا.',
    sortAZ: 'ترتيب من أ إلى ي',
    sortZA: 'ترتيب من ي إلى أ',
    clear: 'مسح',
    copy: 'نسخ النتيجة',
    copied: 'تم النسخ!',
    copyFailed: 'تعذر النسخ تلقائيًا. يرجى نسخ النتيجة يدويًا.',
    loadExample: 'تجربة مثال',
    exampleValue: 'موز\nتفاح\nبرتقال\nعنب',
    emptyState: 'ألصق أسطر النص ثم اختر اتجاه الترتيب.',
    infoTitle: 'ماذا تفعل هذه الأداة؟',
    infoText:
      'تقوم هذه الأداة بترتيب النص سطرًا بسطر حسب الترتيب الأبجدي، وهي مفيدة لتنظيم الأسماء والقوائم والكلمات المفتاحية وغير ذلك.',
    compatibilityTitle: 'ملاحظة مهمة',
    compatibilityText:
      'إذا لم تعمل ميزة النسخ داخل متصفح التطبيق مثل فيسبوك أو إنستغرام، افتح الأداة في Chrome أو Safari أو أي متصفح كامل.',
    statsTitle: 'إحصائيات سريعة',
    totalLines: 'إجمالي الأسطر',
    nonEmptyLines: 'الأسطر غير الفارغة',
    sortTipTitle: 'نصيحة مفيدة',
    sortTipText:
      'للحصول على نتيجة أنظف، احذف الأسطر الفارغة الزائدة قبل الترتيب إذا كانت قائمتك تحتوي على فراغات.'
  }
};

function sortLines(text, direction = 'asc') {
  const lines = text.split('\n');
  const sorted = [...lines].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' })
  );

  return direction === 'desc' ? sorted.reverse().join('\n') : sorted.join('\n');
}

function TextSorter({ language }) {
  const isArabic = language === 'ar';
  const currentContent = isArabic ? content.ar : content.en;

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const stats = useMemo(() => {
    const lines = inputText ? inputText.split('\n') : [];
    const nonEmptyLines = lines.filter((line) => line.trim() !== '').length;

    return [
      {
        key: 'totalLines',
        label: currentContent.totalLines,
        value: lines.length
      },
      {
        key: 'nonEmptyLines',
        label: currentContent.nonEmptyLines,
        value: nonEmptyLines
      }
    ];
  }, [inputText, currentContent]);

  const handleChange = useCallback((event) => {
    setInputText(event.target.value);
    setOutputText('');
    setCopied(false);
    setCopyError(false);
  }, []);

  const handleSortAZ = useCallback(() => {
    setOutputText(sortLines(inputText, 'asc'));
    setCopied(false);
    setCopyError(false);
  }, [inputText]);

  const handleSortZA = useCallback(() => {
    setOutputText(sortLines(inputText, 'desc'));
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
            <label className="tool-label" htmlFor="text-sorter-input">
              {currentContent.inputLabel}
            </label>

            <textarea
              id="text-sorter-input"
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
              onClick={handleSortAZ}
              disabled={!inputText}
            >
              {currentContent.sortAZ}
            </button>

            <button
              type="button"
              className="tool-action-button tool-action-button-secondary"
              onClick={handleSortZA}
              disabled={!inputText}
            >
              {currentContent.sortZA}
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
              <span className="tool-example-label">{currentContent.sortTipTitle}</span>
              <div className="tool-example-content">
                {currentContent.sortTipText}
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default TextSorter;