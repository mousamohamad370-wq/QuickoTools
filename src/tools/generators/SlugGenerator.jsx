import { useCallback, useMemo, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Slug Generator - QuickoTools',
    metaDescription:
      'Convert text into a clean URL-friendly slug instantly with the free Slug Generator tool from QuickoTools.',
    title: 'Slug Generator',
    description:
      'Convert text into a clean URL-friendly slug instantly for SEO, links, and content publishing.',
    inputTitle: 'Input Text',
    outputTitle: 'Slug Result',
    placeholder: 'Type or paste your text here...',
    resultPlaceholder: 'Your slug will appear here.',
    clear: 'Clear',
    copy: 'Copy Result',
    copied: 'Copied!',
    loadExample: 'Load Example',
    exampleText: 'Hello World From QuickoTools',
    emptyState: 'Type or paste text to generate a clean slug automatically.',
    infoTitle: 'What is a Slug Generator?',
    infoText:
      'A slug generator converts text into a lowercase, URL-friendly format that is easier to read, share, and use in web page links.'
  },
  ar: {
    metaTitle: 'مولد Slug - QuickoTools',
    metaDescription:
      'حوّل النص إلى رابط URL نظيف وسهل القراءة فورًا باستخدام أداة مولد Slug المجانية من QuickoTools.',
    title: 'مولد Slug',
    description:
      'حوّل النص إلى slug نظيف ومناسب للروابط فورًا لاستخدامه في السيو والروابط ونشر المحتوى.',
    inputTitle: 'النص المدخل',
    outputTitle: 'نتيجة Slug',
    placeholder: 'اكتب النص هنا أو ألصقه...',
    resultPlaceholder: 'سيظهر الـ slug هنا.',
    clear: 'مسح',
    copy: 'نسخ النتيجة',
    copied: 'تم النسخ!',
    loadExample: 'تجربة مثال',
    exampleText: 'Hello World From QuickoTools',
    emptyState: 'اكتب النص أو ألصقه لإنشاء slug نظيف بشكل تلقائي.',
    infoTitle: 'ما هو مولد Slug؟',
    infoText:
      'يقوم مولد Slug بتحويل النص إلى صيغة صغيرة ومناسبة للروابط، مما يجعلها أسهل للقراءة والمشاركة والاستخدام في روابط صفحات الويب.'
  }
};

function createSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function SlugGenerator({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;
  const [inputText, setInputText] = useState('');
  const [copied, setCopied] = useState(false);

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const outputText = useMemo(() => createSlug(inputText), [inputText]);

  const handleChange = useCallback((event) => {
    setInputText(event.target.value);
    setCopied(false);
  }, []);

  const handleClear = useCallback(() => {
    setInputText('');
    setCopied(false);
  }, []);

  const handleLoadExample = useCallback(() => {
    setInputText(currentContent.exampleText);
    setCopied(false);
  }, [currentContent.exampleText]);

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
                disabled={!inputText}
              >
                {currentContent.clear}
              </button>
            </div>
          </div>

          <textarea
            value={inputText}
            onChange={handleChange}
            placeholder={currentContent.placeholder}
            className="tool-textarea"
            aria-label={currentContent.inputTitle}
          />

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

export default SlugGenerator;