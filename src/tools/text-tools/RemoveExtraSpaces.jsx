import { useCallback, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Remove Extra Spaces - QuickoTools',
    metaDescription:
      'Remove extra spaces from text instantly and clean spacing with the free Remove Extra Spaces tool from QuickoTools.',
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
    loadExample: 'Load Example',
    exampleValue:
      'Hello     world    from   QuickoTools.   This    text has   extra spaces.',
    emptyState:
      'Paste your text, then remove extra spaces to generate clean output.',
    infoTitle: 'What does this tool do?',
    infoText:
      'This tool removes repeated spaces between words and trims unnecessary spacing from your text to make it cleaner and easier to read.'
  },
  ar: {
    metaTitle: 'إزالة المسافات الزائدة - QuickoTools',
    metaDescription:
      'أزل المسافات الزائدة من النص فورًا ونظّف التباعد باستخدام أداة إزالة المسافات الزائدة المجانية من QuickoTools.',
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
    loadExample: 'تجربة مثال',
    exampleValue:
      'مرحبا     بك    في   QuickoTools.   هذا    النص يحتوي   على مسافات زائدة.',
    emptyState:
      'ألصق النص ثم أزل المسافات الزائدة لإنشاء الناتج المنظف.',
    infoTitle: 'ماذا تفعل هذه الأداة؟',
    infoText:
      'تقوم هذه الأداة بحذف المسافات المكررة بين الكلمات وإزالة التباعد غير الضروري من النص ليصبح أنظف وأسهل للقراءة.'
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
    setOutputText(removeExtraSpaces(inputText));
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

export default RemoveExtraSpaces;