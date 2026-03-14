import { useCallback, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Remove Empty Lines - QuickoTools',
    metaDescription:
      'Remove empty lines from text instantly with the free Remove Empty Lines tool from QuickoTools.',
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
    loadExample: 'Load Example',
    exampleValue: 'Apple\n\nBanana\n\n\nOrange\nGrape\n\n',
    emptyState:
      'Paste your text, then remove empty lines to generate clean output.',
    infoTitle: 'What does this tool do?',
    infoText:
      'This tool removes blank lines from your text while keeping the remaining lines in their original order.'
  },
  ar: {
    metaTitle: 'إزالة الأسطر الفارغة - QuickoTools',
    metaDescription:
      'أزل الأسطر الفارغة من النص فورًا باستخدام أداة إزالة الأسطر الفارغة المجانية من QuickoTools.',
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
    loadExample: 'تجربة مثال',
    exampleValue: 'تفاح\n\nموز\n\n\nبرتقال\nعنب\n\n',
    emptyState:
      'ألصق النص ثم أزل الأسطر الفارغة لإنشاء الناتج المنظف.',
    infoTitle: 'ماذا تفعل هذه الأداة؟',
    infoText:
      'تقوم هذه الأداة بحذف الأسطر الفارغة من النص مع الحفاظ على ترتيب الأسطر المتبقية كما هو.'
  }
};

function removeEmptyLines(text) {
  return text
    .split('\n')
    .filter((line) => line.trim() !== '')
    .join('\n');
}

function RemoveEmptyLines({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const handleChange = useCallback((event) => {
    setInputText(event.target.value);
    setOutputText('');
    setCopied(false);
  }, []);

  const handleRemove = useCallback(() => {
    setOutputText(removeEmptyLines(inputText));
    setCopied(false);
  }, [inputText]);

  const handleClear = useCallback(() => {
    setInputText('');
    setOutputText('');
    setCopied(false);
  }, []);

  const handleLoadExample = useCallback(() => {
    setInputText(currentContent.exampleValue);
    setOutputText('');
    setCopied(false);
  }, [currentContent.exampleValue]);

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

export default RemoveEmptyLines;