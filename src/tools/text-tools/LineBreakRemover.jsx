import { useCallback, useMemo, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Line Break Remover - QuickoTools',
    metaDescription:
      'Remove line breaks from text instantly and convert multi-line text into a clean single line with QuickoTools.',
    badge: 'Text Tool',
    title: 'Line Break Remover',
    description:
      'Remove line breaks from text instantly and turn multi-line text into a clean single line.',
    inputTitle: 'Input Text',
    inputLabel: 'Input Text',
    inputPlaceholder: 'Paste your multi-line text here...',
    outputTitle: 'Clean Text',
    outputPlaceholder: 'Your cleaned text will appear here.',
    remove: 'Remove Line Breaks',
    clear: 'Clear',
    copy: 'Copy Result',
    copied: 'Copied!',
    copyFailed: 'Copy was not available. Please copy the result manually.',
    loadExample: 'Load Example',
    exampleValue:
      'Hello world\nThis is QuickoTools\nRemove line breaks easily',
    emptyState:
      'Paste your multi-line text, then remove line breaks to generate clean output.',
    infoTitle: 'What is a Line Break Remover?',
    infoText:
      'A line break remover helps you convert multi-line text into one clean line, which is useful for forms, code, documents, and content formatting.',
    compatibilityTitle: 'Browser note',
    compatibilityText:
      'If copy does not work inside an in-app browser such as Facebook or Instagram, open this tool in Chrome, Safari, or another full browser.',
    statsTitle: 'Quick Stats',
    originalLines: 'Original Lines',
    originalCharacters: 'Original Characters',
    cleanedCharacters: 'Cleaned Characters',
    removedBreaks: 'Removed Breaks',
    tipTitle: 'Helpful tip',
    tipText:
      'This tool replaces line breaks with spaces and also normalizes repeated whitespace, so the final result becomes a clean single line.'
  },
  ar: {
    metaTitle: 'إزالة فواصل الأسطر - QuickoTools',
    metaDescription:
      'احذف فواصل الأسطر من النص فورًا وحوّل النص متعدد الأسطر إلى سطر واحد مرتب باستخدام QuickoTools.',
    badge: 'أداة نصوص',
    title: 'إزالة فواصل الأسطر',
    description:
      'احذف فواصل الأسطر من النص فورًا وحوّل النص متعدد الأسطر إلى سطر واحد مرتب.',
    inputTitle: 'النص المدخل',
    inputLabel: 'النص المدخل',
    inputPlaceholder: 'ألصق النص متعدد الأسطر هنا...',
    outputTitle: 'النص المنظف',
    outputPlaceholder: 'سيظهر النص بعد إزالة فواصل الأسطر هنا.',
    remove: 'إزالة فواصل الأسطر',
    clear: 'مسح',
    copy: 'نسخ النتيجة',
    copied: 'تم النسخ!',
    copyFailed: 'تعذر النسخ تلقائيًا. يرجى نسخ النتيجة يدويًا.',
    loadExample: 'تجربة مثال',
    exampleValue:
      'مرحبا بالعالم\nهذا هو QuickoTools\nاحذف فواصل الأسطر بسهولة',
    emptyState:
      'ألصق النص متعدد الأسطر ثم أزل فواصل الأسطر لإنشاء الناتج المنظف.',
    infoTitle: 'ما هي أداة إزالة فواصل الأسطر؟',
    infoText:
      'تساعدك هذه الأداة على تحويل النص متعدد الأسطر إلى سطر واحد منظم، وهي مفيدة للنماذج والبرمجة والمستندات وتنسيق المحتوى.',
    compatibilityTitle: 'ملاحظة مهمة',
    compatibilityText:
      'إذا لم تعمل ميزة النسخ داخل متصفح التطبيق مثل فيسبوك أو إنستغرام، افتح الأداة في Chrome أو Safari أو أي متصفح كامل.',
    statsTitle: 'إحصائيات سريعة',
    originalLines: 'عدد الأسطر الأصلية',
    originalCharacters: 'الأحرف قبل التنظيف',
    cleanedCharacters: 'الأحرف بعد التنظيف',
    removedBreaks: 'فواصل الأسطر المحذوفة',
    tipTitle: 'نصيحة مفيدة',
    tipText:
      'تستبدل هذه الأداة فواصل الأسطر بمسافات، وتقوم أيضًا بتنظيف التباعد الزائد ليصبح الناتج سطرًا واحدًا مرتبًا.'
  }
};

function removeLineBreaks(text) {
  return text
    .replace(/\r?\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function LineBreakRemover({ language }) {
  const isArabic = language === 'ar';
  const currentContent = isArabic ? content.ar : content.en;

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const stats = useMemo(() => {
    const originalLines = inputText ? inputText.split('\n').length : 0;
    const originalCharacters = inputText.length;
    const cleanedCharacters = outputText.length;

    const removedBreaks = inputText
      ? (inputText.match(/\r?\n/g) || []).length
      : 0;

    return [
      {
        key: 'originalLines',
        label: currentContent.originalLines,
        value: originalLines
      },
      {
        key: 'originalCharacters',
        label: currentContent.originalCharacters,
        value: originalCharacters
      },
      {
        key: 'cleanedCharacters',
        label: currentContent.cleanedCharacters,
        value: cleanedCharacters
      },
      {
        key: 'removedBreaks',
        label: currentContent.removedBreaks,
        value: removedBreaks
      }
    ];
  }, [inputText, outputText, currentContent]);

  const handleChange = useCallback((event) => {
    setInputText(event.target.value);
    setCopied(false);
    setCopyError(false);
  }, []);

  const handleRemoveLineBreaks = useCallback(() => {
    const cleaned = removeLineBreaks(inputText);
    setOutputText(cleaned);
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
                onClick={handleRemoveLineBreaks}
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
            <label className="tool-label" htmlFor="line-break-remover-input">
              {currentContent.inputLabel}
            </label>

            <textarea
              id="line-break-remover-input"
              value={inputText}
              onChange={handleChange}
              placeholder={currentContent.inputPlaceholder}
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

export default LineBreakRemover;