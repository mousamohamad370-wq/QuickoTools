import { useCallback, useMemo, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Case Converter - QuickoTools',
    metaDescription:
      'Convert text to uppercase, lowercase, title case, or sentence case instantly with the free Case Converter tool from QuickoTools.',
    badge: 'Text Tool',
    title: 'Case Converter',
    description:
      'Convert text to uppercase, lowercase, title case, or sentence case instantly.',
    inputTitle: 'Input Text',
    inputLabel: 'Input Text',
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
    copyFailed: 'Copy was not available. Please copy the result manually.',
    loadExample: 'Load Example',
    exampleValue: 'hello world from quickotools. this is a simple text example.',
    emptyState:
      'Enter your text, then choose a conversion type to generate the result.',
    infoTitle: 'What is a Case Converter?',
    infoText:
      'A case converter helps you quickly change the letter format of text for writing, formatting, coding, and content editing.',
    compatibilityTitle: 'Browser note',
    compatibilityText:
      'If copy does not work inside an in-app browser such as Facebook or Instagram, open this tool in Chrome, Safari, or another full browser.',
    statsTitle: 'Quick Stats',
    characters: 'Characters',
    charactersNoSpaces: 'Characters (No Spaces)',
    words: 'Words',
    lines: 'Lines',
    selectedMode: 'Selected Mode',
    noneSelected: 'None yet',
    tipTitle: 'Helpful tip',
    tipText:
      'Title Case capitalizes each word, while Sentence case capitalizes the first letter of each sentence for more natural reading.'
  },
  ar: {
    metaTitle: 'محول حالة النص - QuickoTools',
    metaDescription:
      'حوّل النص إلى أحرف كبيرة أو صغيرة أو بداية كل كلمة كبيرة أو بداية الجملة كبيرة فورًا باستخدام أداة QuickoTools.',
    badge: 'أداة نصوص',
    title: 'محول حالة النص',
    description:
      'حوّل النص إلى أحرف كبيرة أو صغيرة أو بداية كل كلمة كبيرة أو بداية الجملة كبيرة فورًا.',
    inputTitle: 'النص المدخل',
    inputLabel: 'النص المدخل',
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
    copyFailed: 'تعذر النسخ تلقائيًا. يرجى نسخ النتيجة يدويًا.',
    loadExample: 'تجربة مثال',
    exampleValue: 'hello world from quickotools. this is a simple text example.',
    emptyState: 'أدخل النص ثم اختر نوع التحويل لإنشاء النتيجة.',
    infoTitle: 'ما هو محول حالة النص؟',
    infoText:
      'محول حالة النص يساعدك على تغيير شكل الأحرف بسرعة لاستخدامه في الكتابة والتنسيق والبرمجة وتحرير المحتوى.',
    compatibilityTitle: 'ملاحظة مهمة',
    compatibilityText:
      'إذا لم تعمل ميزة النسخ داخل متصفح التطبيق مثل فيسبوك أو إنستغرام، افتح الأداة في Chrome أو Safari أو أي متصفح كامل.',
    statsTitle: 'إحصائيات سريعة',
    characters: 'الأحرف',
    charactersNoSpaces: 'الأحرف بدون مسافات',
    words: 'الكلمات',
    lines: 'الأسطر',
    selectedMode: 'نوع التحويل المختار',
    noneSelected: 'لم يتم الاختيار بعد',
    tipTitle: 'نصيحة مفيدة',
    tipText:
      'خيار بداية كل كلمة كبيرة يحوّل كل كلمة لتبدأ بحرف كبير، بينما بداية الجملة كبيرة تجعل أول حرف في كل جملة كبيرًا بشكل أقرب للقراءة الطبيعية.'
  }
};

function toTitleCase(text) {
  return text
    .toLowerCase()
    .split(/\s+/)
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ''))
    .join(' ');
}

function toSentenceCase(text) {
  return text
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s*\w)/g, (match) => match.toUpperCase());
}

function CaseConverter({ language }) {
  const isArabic = language === 'ar';
  const currentContent = isArabic ? content.ar : content.en;

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [selectedMode, setSelectedMode] = useState('');

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const stats = useMemo(() => {
    const sourceText = outputText || inputText;
    const trimmedText = sourceText.trim();
    const wordCount = trimmedText ? trimmedText.split(/\s+/).length : 0;
    const lineCount = sourceText ? sourceText.split('\n').length : 0;

    return [
      {
        key: 'characters',
        label: currentContent.characters,
        value: sourceText.length
      },
      {
        key: 'charactersNoSpaces',
        label: currentContent.charactersNoSpaces,
        value: sourceText.replace(/\s/g, '').length
      },
      {
        key: 'words',
        label: currentContent.words,
        value: wordCount
      },
      {
        key: 'lines',
        label: currentContent.lines,
        value: lineCount
      },
      {
        key: 'selectedMode',
        label: currentContent.selectedMode,
        value: selectedMode || currentContent.noneSelected
      }
    ];
  }, [inputText, outputText, selectedMode, currentContent]);

  const handleChange = useCallback((event) => {
    setInputText(event.target.value);
    setOutputText('');
    setCopied(false);
    setCopyError(false);
    setSelectedMode('');
  }, []);

  const handleUppercase = useCallback(() => {
    setOutputText(inputText.toUpperCase());
    setCopied(false);
    setCopyError(false);
    setSelectedMode(currentContent.uppercase);
  }, [inputText, currentContent.uppercase]);

  const handleLowercase = useCallback(() => {
    setOutputText(inputText.toLowerCase());
    setCopied(false);
    setCopyError(false);
    setSelectedMode(currentContent.lowercase);
  }, [inputText, currentContent.lowercase]);

  const handleTitleCase = useCallback(() => {
    setOutputText(toTitleCase(inputText));
    setCopied(false);
    setCopyError(false);
    setSelectedMode(currentContent.titleCase);
  }, [inputText, currentContent.titleCase]);

  const handleSentenceCase = useCallback(() => {
    setOutputText(toSentenceCase(inputText));
    setCopied(false);
    setCopyError(false);
    setSelectedMode(currentContent.sentenceCase);
  }, [inputText, currentContent.sentenceCase]);

  const handleClear = useCallback(() => {
    setInputText('');
    setOutputText('');
    setCopied(false);
    setCopyError(false);
    setSelectedMode('');
  }, []);

  const handleLoadExample = useCallback(() => {
    setInputText(currentContent.exampleValue);
    setOutputText('');
    setCopied(false);
    setCopyError(false);
    setSelectedMode('');
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
            <label className="tool-label" htmlFor="case-converter-input">
              {currentContent.inputLabel}
            </label>

            <textarea
              id="case-converter-input"
              value={inputText}
              onChange={handleChange}
              placeholder={currentContent.inputPlaceholder}
              className="tool-textarea"
              aria-label={currentContent.inputTitle}
            />
          </div>

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

export default CaseConverter;