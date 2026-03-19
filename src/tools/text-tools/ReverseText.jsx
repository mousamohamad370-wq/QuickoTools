import { useCallback, useMemo, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Reverse Text - QuickoTools',
    metaDescription:
      'Reverse text instantly with the free Reverse Text tool from QuickoTools.',
    badge: 'Text Tool',
    title: 'Reverse Text',
    description:
      'Reverse text instantly by characters for quick text manipulation and formatting.',
    inputTitle: 'Input Text',
    inputLabel: 'Input Text',
    inputPlaceholder: 'Type or paste your text here...',
    outputTitle: 'Reversed Text',
    outputPlaceholder: 'Your reversed text will appear here.',
    reverse: 'Reverse Text',
    clear: 'Clear',
    copy: 'Copy Result',
    copied: 'Copied!',
    copyFailed: 'Copy was not available. Please copy the result manually.',
    loadExample: 'Load Example',
    exampleValue: 'Hello world from QuickoTools',
    emptyState: 'Type or paste text, then reverse it to generate the result.',
    infoTitle: 'What does this tool do?',
    infoText:
      'This tool reverses the order of characters in your text instantly, which can be useful for testing, formatting, puzzles, and text manipulation.',
    compatibilityTitle: 'Browser note',
    compatibilityText:
      'If copy does not work inside an in-app browser such as Facebook or Instagram, open this tool in Chrome, Safari, or another full browser.',
    statsTitle: 'Quick Stats',
    characterCount: 'Characters',
    charactersNoSpaces: 'Characters (No Spaces)',
    lineCount: 'Lines',
    tipTitle: 'Helpful tip',
    tipText:
      'This tool reverses characters exactly as entered, so punctuation, spaces, and line breaks are also reversed.'
  },
  ar: {
    metaTitle: 'عكس النص - QuickoTools',
    metaDescription:
      'اعكس النص فورًا باستخدام أداة عكس النص المجانية من QuickoTools.',
    badge: 'أداة نصوص',
    title: 'عكس النص',
    description:
      'اعكس النص فورًا على مستوى الأحرف لمعالجة النصوص وتنسيقها بسرعة.',
    inputTitle: 'النص المدخل',
    inputLabel: 'النص المدخل',
    inputPlaceholder: 'اكتب النص هنا أو ألصقه...',
    outputTitle: 'النص المعكوس',
    outputPlaceholder: 'سيظهر النص المعكوس هنا.',
    reverse: 'عكس النص',
    clear: 'مسح',
    copy: 'نسخ النتيجة',
    copied: 'تم النسخ!',
    copyFailed: 'تعذر النسخ تلقائيًا. يرجى نسخ النتيجة يدويًا.',
    loadExample: 'تجربة مثال',
    exampleValue: 'مرحبا بك في QuickoTools',
    emptyState: 'اكتب النص أو ألصقه ثم اعكسه لإنشاء النتيجة.',
    infoTitle: 'ماذا تفعل هذه الأداة؟',
    infoText:
      'تقوم هذه الأداة بعكس ترتيب الأحرف في النص فورًا، وهي مفيدة للاختبار والتنسيق والألعاب النصية ومعالجة النصوص.',
    compatibilityTitle: 'ملاحظة مهمة',
    compatibilityText:
      'إذا لم تعمل ميزة النسخ داخل متصفح التطبيق مثل فيسبوك أو إنستغرام، افتح الأداة في Chrome أو Safari أو أي متصفح كامل.',
    statsTitle: 'إحصائيات سريعة',
    characterCount: 'عدد الأحرف',
    charactersNoSpaces: 'الأحرف بدون مسافات',
    lineCount: 'عدد الأسطر',
    tipTitle: 'نصيحة مفيدة',
    tipText:
      'تعكس هذه الأداة الأحرف تمامًا كما هي، لذلك يتم أيضًا عكس علامات الترقيم والمسافات وفواصل الأسطر.'
  }
};

function reverseText(value) {
  return Array.from(value).reverse().join('');
}

function ReverseText({ language }) {
  const isArabic = language === 'ar';
  const currentContent = isArabic ? content.ar : content.en;

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const stats = useMemo(() => {
    return [
      {
        key: 'characterCount',
        label: currentContent.characterCount,
        value: inputText.length
      },
      {
        key: 'charactersNoSpaces',
        label: currentContent.charactersNoSpaces,
        value: inputText.replace(/\s/g, '').length
      },
      {
        key: 'lineCount',
        label: currentContent.lineCount,
        value: inputText ? inputText.split('\n').length : 0
      }
    ];
  }, [inputText, currentContent]);

  const handleChange = useCallback((event) => {
    setInputText(event.target.value);
    setOutputText('');
    setCopied(false);
    setCopyError(false);
  }, []);

  const handleReverse = useCallback(() => {
    setOutputText(reverseText(inputText));
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
            <label className="tool-label" htmlFor="reverse-text-input">
              {currentContent.inputLabel}
            </label>

            <textarea
              id="reverse-text-input"
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
              onClick={handleReverse}
              disabled={!inputText}
            >
              {currentContent.reverse}
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

export default ReverseText;