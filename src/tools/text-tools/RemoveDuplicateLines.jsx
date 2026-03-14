import { useCallback, useMemo, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Remove Duplicate Lines - QuickoTools',
    metaDescription:
      'Remove duplicate lines from your text instantly with the free Remove Duplicate Lines tool from QuickoTools.',
    title: 'Remove Duplicate Lines',
    description:
      'Remove repeated lines from your text instantly while keeping only unique lines in the output.',
    inputTitle: 'Input Text',
    outputTitle: 'Cleaned Output',
    placeholder: 'Paste your lines here...',
    resultPlaceholder: 'Your cleaned text will appear here.',
    remove: 'Remove Duplicates',
    clear: 'Clear',
    copy: 'Copy Result',
    copied: 'Copied!',
    loadExample: 'Load Example',
    exampleText: 'apple\nbanana\napple\norange\nbanana',
    totalLines: 'Total Lines',
    uniqueLines: 'Unique Lines',
    emptyState: 'Paste your lines, then remove duplicates to generate clean output.',
    infoTitle: 'What does this tool do?',
    infoText:
      'This tool removes duplicate lines from your text while preserving the first occurrence of each line.'
  },
  ar: {
    metaTitle: 'إزالة الأسطر المكررة - QuickoTools',
    metaDescription:
      'أزل الأسطر المكررة من النص فورًا باستخدام أداة إزالة الأسطر المكررة المجانية من QuickoTools.',
    title: 'إزالة الأسطر المكررة',
    description:
      'أزل الأسطر المكررة من النص فورًا مع الاحتفاظ بالأسطر الفريدة فقط في النتيجة.',
    inputTitle: 'النص المدخل',
    outputTitle: 'الناتج المنظف',
    placeholder: 'ألصق الأسطر هنا...',
    resultPlaceholder: 'سيظهر النص المنظف هنا.',
    remove: 'إزالة التكرار',
    clear: 'مسح',
    copy: 'نسخ النتيجة',
    copied: 'تم النسخ!',
    loadExample: 'تجربة مثال',
    exampleText: 'تفاح\nموز\nتفاح\nبرتقال\nموز',
    totalLines: 'إجمالي الأسطر',
    uniqueLines: 'الأسطر الفريدة',
    emptyState: 'ألصق الأسطر ثم أزل التكرار لإنشاء الناتج المنظف.',
    infoTitle: 'ماذا تفعل هذه الأداة؟',
    infoText:
      'تقوم هذه الأداة بحذف الأسطر المكررة من النص مع الاحتفاظ بأول ظهور فقط لكل سطر.'
  }
};

function RemoveDuplicateLines({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const stats = useMemo(() => {
    const inputLines = inputText ? inputText.split('\n') : [];
    const uniqueLines = inputText ? [...new Set(inputLines)] : [];

    return {
      totalLines: inputLines.length,
      uniqueLines: uniqueLines.length,
      cleanedText: uniqueLines.join('\n')
    };
  }, [inputText]);

  const cards = useMemo(() => {
    return [
      {
        key: 'totalLines',
        label: currentContent.totalLines,
        value: stats.totalLines
      },
      {
        key: 'uniqueLines',
        label: currentContent.uniqueLines,
        value: stats.uniqueLines
      }
    ];
  }, [
    currentContent.totalLines,
    currentContent.uniqueLines,
    stats.totalLines,
    stats.uniqueLines
  ]);

  const handleChange = useCallback((event) => {
    setInputText(event.target.value);
    setCopied(false);
  }, []);

  const handleRemoveDuplicates = useCallback(() => {
    setOutputText(stats.cleanedText);
    setCopied(false);
  }, [stats.cleanedText]);

  const handleClear = useCallback(() => {
    setInputText('');
    setOutputText('');
    setCopied(false);
  }, []);

  const handleLoadExample = useCallback(() => {
    setInputText(currentContent.exampleText);
    setOutputText('');
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
                onClick={handleRemoveDuplicates}
                disabled={!inputText}
              >
                {currentContent.remove}
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
            placeholder={currentContent.placeholder}
            className="tool-textarea"
            aria-label={currentContent.inputTitle}
          />

          {!inputText.trim() && (
            <p className="tool-helper-text">{currentContent.emptyState}</p>
          )}
        </section>

        <section className="tool-stats-grid">
          {cards.map((item) => (
            <div key={item.key} className="tool-stat-card">
              <h2 className="tool-stat-label">{item.label}</h2>
              <p className="tool-stat-value">{item.value}</p>
            </div>
          ))}
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

export default RemoveDuplicateLines;