import { useCallback, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Case Converter - QuickoTools',
    metaDescription:
      'Convert text to uppercase, lowercase, title case, or sentence case instantly with the free Case Converter tool from QuickoTools.',
    title: 'Case Converter',
    description:
      'Convert text to uppercase, lowercase, title case, or sentence case instantly.',
    inputTitle: 'Input Text',
    inputPlaceholder: 'Enter your text here...',
    outputTitle: 'Converted Text',
    outputPlaceholder: 'Your converted text will appear here.',
    uppercase: 'UPPERCASE',
    lowercase: 'lowercase',
    titleCase: 'Title Case',
    sentenceCase: 'Sentence case',
    clear: 'Clear',
    copy: 'Copy Result',
    copied: 'Copied!',
    loadExample: 'Load Example',
    exampleValue: 'hello world from quickotools',
    emptyState:
      'Enter your text, then choose a conversion type to generate the result.',
    infoTitle: 'What is a Case Converter?',
    infoText:
      'A case converter helps you quickly change the letter format of text for writing, formatting, coding, and content editing.'
  },
  ar: {
    metaTitle: 'محول حالة النص - QuickoTools',
    metaDescription:
      'حوّل النص إلى أحرف كبيرة أو صغيرة أو بداية كل كلمة كبيرة أو بداية الجملة كبيرة فورًا باستخدام أداة QuickoTools.',
    title: 'محول حالة النص',
    description:
      'حوّل النص إلى أحرف كبيرة أو صغيرة أو بداية كل كلمة كبيرة أو بداية الجملة كبيرة فورًا.',
    inputTitle: 'النص المدخل',
    inputPlaceholder: 'أدخل النص هنا...',
    outputTitle: 'النص الناتج',
    outputPlaceholder: 'سيظهر النص الناتج هنا.',
    uppercase: 'أحرف كبيرة',
    lowercase: 'أحرف صغيرة',
    titleCase: 'بداية كل كلمة كبيرة',
    sentenceCase: 'بداية الجملة كبيرة',
    clear: 'مسح',
    copy: 'نسخ النتيجة',
    copied: 'تم النسخ!',
    loadExample: 'تجربة مثال',
    exampleValue: 'hello world from quickotools',
    emptyState: 'أدخل النص ثم اختر نوع التحويل لإنشاء النتيجة.',
    infoTitle: 'ما هو محول حالة النص؟',
    infoText:
      'محول حالة النص يساعدك على تغيير شكل الأحرف بسرعة لاستخدامه في الكتابة والتنسيق والبرمجة وتحرير المحتوى.'
  }
};

function toTitleCase(text) {
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ''))
    .join(' ');
}

function toSentenceCase(text) {
  const trimmed = text.trim().toLowerCase();

  if (!trimmed) return '';

  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function CaseConverter({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const handleChange = useCallback((event) => {
    setInputText(event.target.value);
    setCopied(false);
  }, []);

  const handleUppercase = useCallback(() => {
    setOutputText(inputText.toUpperCase());
    setCopied(false);
  }, [inputText]);

  const handleLowercase = useCallback(() => {
    setOutputText(inputText.toLowerCase());
    setCopied(false);
  }, [inputText]);

  const handleTitleCase = useCallback(() => {
    setOutputText(toTitleCase(inputText));
    setCopied(false);
  }, [inputText]);

  const handleSentenceCase = useCallback(() => {
    setOutputText(toSentenceCase(inputText));
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

          <textarea
            value={inputText}
            onChange={handleChange}
            placeholder={currentContent.inputPlaceholder}
            className="tool-textarea"
            aria-label={currentContent.inputTitle}
          />

          <div className="tool-panel-actions tool-actions-row">
            <button
              type="button"
              className="tool-action-button tool-action-button-primary"
              onClick={handleUppercase}
              disabled={!inputText}
            >
              {currentContent.uppercase}
            </button>

            <button
              type="button"
              className="tool-action-button tool-action-button-secondary"
              onClick={handleLowercase}
              disabled={!inputText}
            >
              {currentContent.lowercase}
            </button>

            <button
              type="button"
              className="tool-action-button tool-action-button-primary"
              onClick={handleTitleCase}
              disabled={!inputText}
            >
              {currentContent.titleCase}
            </button>

            <button
              type="button"
              className="tool-action-button tool-action-button-secondary"
              onClick={handleSentenceCase}
              disabled={!inputText}
            >
              {currentContent.sentenceCase}
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

export default CaseConverter;