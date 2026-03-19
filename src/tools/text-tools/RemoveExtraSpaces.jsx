import { useCallback, useMemo, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Remove Extra Spaces - QuickoTools',
    metaDescription:
      'Remove extra spaces from text instantly and clean spacing with the free Remove Extra Spaces tool from QuickoTools.',
    badge: 'Text Tool',
    title: 'Remove Extra Spaces',
    description:
      'Remove extra spaces from text instantly and clean unnecessary spacing in one click.',
    inputTitle: 'Input Text',
    inputLabel: 'Input Text',
    inputPlaceholder: 'Paste your text here...',
    outputTitle: 'Cleaned Text',
    outputPlaceholder: 'Your cleaned text will appear here.',
    remove: 'Remove Extra Spaces',
    clear: 'Clear',
    copy: 'Copy Result',
    copied: 'Copied!',
    copyFailed: 'Copy was not available. Please copy the result manually.',
    loadExample: 'Load Example',
    exampleValue:
      'Hello     world    from   QuickoTools.   This    text has   extra spaces.',
    emptyState:
      'Paste your text, then remove extra spaces to generate clean output.',
    infoTitle: 'What does this tool do?',
    infoText:
      'This tool removes repeated spaces between words and trims unnecessary spacing from your text to make it cleaner and easier to read.',
    compatibilityTitle: 'Browser note',
    compatibilityText:
      'If copy does not work inside an in-app browser such as Facebook or Instagram, open this tool in Chrome, Safari, or another full browser.',
    statsTitle: 'Quick Stats',
    originalCharacters: 'Original Characters',
    cleanedCharacters: 'Cleaned Characters',
    removedSpaces: 'Removed Characters',
    tipTitle: 'Helpful tip',
    tipText:
      'This tool keeps line breaks while cleaning repeated spaces and unnecessary spacing around lines.'
  },
  ar: {
    metaTitle: 'إزالة المسافات الزائدة - QuickoTools',
    metaDescription:
      'أزل المسافات الزائدة من النص فورًا ونظّف التباعد باستخدام أداة إزالة المسافات الزائدة المجانية من QuickoTools.',
    badge: 'أداة نصوص',
    title: 'إزالة المسافات الزائدة',
    description:
      'أزل المسافات الزائدة من النص فورًا ونظّف التباعد غير الضروري بضغطة واحدة.',
    inputTitle: 'النص المدخل',
    inputLabel: 'النص المدخل',
    inputPlaceholder: 'ألصق النص هنا...',
    outputTitle: 'النص المنظف',
    outputPlaceholder: 'سيظهر النص المنظف هنا.',
    remove: 'إزالة المسافات الزائدة',
    clear: 'مسح',
    copy: 'نسخ النتيجة',
    copied: 'تم النسخ!',
    copyFailed: 'تعذر النسخ تلقائيًا. يرجى نسخ النتيجة يدويًا.',
    loadExample: 'تجربة مثال',
    exampleValue:
      'مرحبا     بك    في   QuickoTools.   هذا    النص يحتوي   على مسافات زائدة.',
    emptyState:
      'ألصق النص ثم أزل المسافات الزائدة لإنشاء الناتج المنظف.',
    infoTitle: 'ماذا تفعل هذه الأداة؟',
    infoText:
      'تقوم هذه الأداة بحذف المسافات المكررة بين الكلمات وإزالة التباعد غير الضروري من النص ليصبح أنظف وأسهل للقراءة.',
    compatibilityTitle: 'ملاحظة مهمة',
    compatibilityText:
      'إذا لم تعمل ميزة النسخ داخل متصفح التطبيق مثل فيسبوك أو إنستغرام، افتح الأداة في Chrome أو Safari أو أي متصفح كامل.',
    statsTitle: 'إحصائيات سريعة',
    originalCharacters: 'الأحرف قبل التنظيف',
    cleanedCharacters: 'الأحرف بعد التنظيف',
    removedSpaces: 'المحذوف من الأحرف',
    tipTitle: 'نصيحة مفيدة',
    tipText:
      'تحافظ هذه الأداة على فواصل الأسطر، مع تنظيف المسافات المكررة والتباعد غير الضروري حول الأسطر.'
  }
};

function removeExtraSpaces(text) {
  return text
    .replace(/[ \t]+/g, ' ')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim();
}

function RemoveExtraSpaces({ language }) {
  const isArabic = language === 'ar';
  const currentContent = isArabic ? content.ar : content.en;

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const stats = useMemo(() => {
    const cleanedText = outputText || '';
    const originalLength = inputText.length;
    const cleanedLength = cleanedText.length;
    const removedCount = Math.max(0, originalLength - cleanedLength);

    return [
      {
        key: 'originalCharacters',
        label: currentContent.originalCharacters,
        value: originalLength
      },
      {
        key: 'cleanedCharacters',
        label: currentContent.cleanedCharacters,
        value: cleanedLength
      },
      {
        key: 'removedSpaces',
        label: currentContent.removedSpaces,
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
    setOutputText(removeExtraSpaces(inputText));
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
            <label className="tool-label" htmlFor="remove-extra-spaces-input">
              {currentContent.inputLabel}
            </label>

            <textarea
              id="remove-extra-spaces-input"
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

export default RemoveExtraSpaces;