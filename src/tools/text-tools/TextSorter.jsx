import { useCallback, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Text Sorter - QuickoTools',
    metaDescription:
      'Sort lines of text alphabetically in ascending or descending order with the free Text Sorter tool from QuickoTools.',
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
    loadExample: 'Load Example',
    exampleValue: 'Banana\nApple\nOrange\nGrape',
    emptyState: 'Paste your text lines, then choose a sorting direction.',
    infoTitle: 'What does this tool do?',
    infoText:
      'This tool sorts text line by line in alphabetical order, which is useful for organizing names, lists, keywords, and other text data.'
  },
  ar: {
    metaTitle: 'ترتيب النص - QuickoTools',
    metaDescription:
      'رتّب أسطر النص أبجديًا تصاعديًا أو تنازليًا باستخدام أداة ترتيب النص المجانية من QuickoTools.',
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
    loadExample: 'تجربة مثال',
    exampleValue: 'موز\nتفاح\nبرتقال\nعنب',
    emptyState: 'ألصق أسطر النص ثم اختر اتجاه الترتيب.',
    infoTitle: 'ماذا تفعل هذه الأداة؟',
    infoText:
      'تقوم هذه الأداة بترتيب النص سطرًا بسطر حسب الترتيب الأبجدي، وهي مفيدة لتنظيم الأسماء والقوائم والكلمات المفتاحية وغير ذلك.'
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

  const handleSortAZ = useCallback(() => {
    setOutputText(sortLines(inputText, 'asc'));
    setCopied(false);
  }, [inputText]);

  const handleSortZA = useCallback(() => {
    setOutputText(sortLines(inputText, 'desc'));
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

export default TextSorter;