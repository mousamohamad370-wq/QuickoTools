import { useCallback, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Reverse Text - QuickoTools',
    metaDescription:
      'Reverse text instantly with the free Reverse Text tool from QuickoTools.',
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
    loadExample: 'Load Example',
    exampleValue: 'Hello world from QuickoTools',
    emptyState: 'Type or paste text, then reverse it to generate the result.',
    infoTitle: 'What does this tool do?',
    infoText:
      'This tool reverses the order of characters in your text instantly, which can be useful for testing, formatting, puzzles, and text manipulation.'
  },
  ar: {
    metaTitle: 'عكس النص - QuickoTools',
    metaDescription:
      'اعكس النص فورًا باستخدام أداة عكس النص المجانية من QuickoTools.',
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
    loadExample: 'تجربة مثال',
    exampleValue: 'مرحبا بك في QuickoTools',
    emptyState: 'اكتب النص أو ألصقه ثم اعكسه لإنشاء النتيجة.',
    infoTitle: 'ماذا تفعل هذه الأداة؟',
    infoText:
      'تقوم هذه الأداة بعكس ترتيب الأحرف في النص فورًا، وهي مفيدة للاختبار والتنسيق والألعاب النصية ومعالجة النصوص.'
  }
};

function reverseText(value) {
  return value.split('').reverse().join('');
}

function ReverseText({ language }) {
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

  const handleReverse = useCallback(() => {
    setOutputText(reverseText(inputText));
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

export default ReverseText;