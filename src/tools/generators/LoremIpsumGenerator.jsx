import { useCallback, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const paragraphs = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.',
  'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.',
  'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.',
  'Donec sollicitudin molestie malesuada. Vivamus suscipit tortor eget felis porttitor volutpat.'
];

const content = {
  en: {
    metaTitle: 'Lorem Ipsum Generator - QuickoTools',
    metaDescription:
      'Generate placeholder Lorem Ipsum text instantly for design, UI, and development projects with QuickoTools.',
    title: 'Lorem Ipsum Generator',
    description:
      'Generate placeholder text instantly for design, UI, and development projects.',
    inputTitle: 'Generator Settings',
    label: 'Number of paragraphs',
    placeholder: 'Enter number of paragraphs',
    generate: 'Generate',
    clear: 'Clear',
    copy: 'Copy Result',
    copied: 'Copied!',
    loadExample: 'Load Example',
    exampleCount: 3,
    resultTitle: 'Generated Text',
    resultPlaceholder: 'Your generated Lorem Ipsum text will appear here.',
    emptyState:
      'Choose the number of paragraphs, then generate your Lorem Ipsum text.',
    infoTitle: 'What is Lorem Ipsum?',
    infoText:
      'Lorem Ipsum is placeholder text commonly used in design and publishing to preview layouts before real content is added.'
  },
  ar: {
    metaTitle: 'مولد Lorem Ipsum - QuickoTools',
    metaDescription:
      'أنشئ نص Lorem Ipsum تجريبيًا فورًا لمشاريع التصميم والواجهات والتطوير باستخدام QuickoTools.',
    title: 'مولد Lorem Ipsum',
    description:
      'أنشئ نصًا تجريبيًا فورًا لمشاريع التصميم والواجهات والتطوير.',
    inputTitle: 'إعدادات التوليد',
    label: 'عدد الفقرات',
    placeholder: 'أدخل عدد الفقرات',
    generate: 'إنشاء',
    clear: 'مسح',
    copy: 'نسخ النتيجة',
    copied: 'تم النسخ!',
    loadExample: 'تجربة مثال',
    exampleCount: 3,
    resultTitle: 'النص الناتج',
    resultPlaceholder: 'سيظهر نص Lorem Ipsum الذي تم إنشاؤه هنا.',
    emptyState: 'اختر عدد الفقرات ثم أنشئ نص Lorem Ipsum.',
    infoTitle: 'ما هو Lorem Ipsum؟',
    infoText:
      'Lorem Ipsum هو نص تجريبي يُستخدم عادة في التصميم والنشر لمعاينة شكل المحتوى قبل إضافة النص الحقيقي.'
  }
};

function LoremIpsumGenerator({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;

  const [count, setCount] = useState(3);
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const handleCountChange = useCallback((event) => {
    setCount(event.target.value);
    setCopied(false);
  }, []);

  const handleGenerate = useCallback(() => {
    const safeCount = Math.max(1, Math.min(20, Number(count) || 1));

    const result = Array.from(
      { length: safeCount },
      (_, index) => paragraphs[index % paragraphs.length]
    ).join('\n\n');

    setOutputText(result);
    setCopied(false);
  }, [count]);

  const handleClear = useCallback(() => {
    setCount(3);
    setOutputText('');
    setCopied(false);
  }, []);

  const handleLoadExample = useCallback(() => {
    setCount(currentContent.exampleCount);
    setOutputText('');
    setCopied(false);
  }, [currentContent.exampleCount]);

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
                disabled={!outputText && Number(count) === 3}
              >
                {currentContent.clear}
              </button>
            </div>
          </div>

          <div className="tool-field">
            <label className="tool-label" htmlFor="lorem-ipsum-count">
              {currentContent.label}
            </label>

            <input
              id="lorem-ipsum-count"
              type="number"
              min="1"
              max="20"
              value={count}
              onChange={handleCountChange}
              placeholder={currentContent.placeholder}
              className="tool-input"
              aria-label={currentContent.label}
            />
          </div>

          <div className="tool-panel-actions tool-actions-row">
            <button
              type="button"
              className="tool-action-button tool-action-button-primary"
              onClick={handleGenerate}
            >
              {currentContent.generate}
            </button>
          </div>

          {!outputText && (
            <p className="tool-helper-text">{currentContent.emptyState}</p>
          )}
        </section>

        <section className="tool-panel">
          <div className="tool-panel-top">
            <div className="tool-panel-heading">
              <h2 className="tool-panel-title">{currentContent.resultTitle}</h2>
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

export default LoremIpsumGenerator;