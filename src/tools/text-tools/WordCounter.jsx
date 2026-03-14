import { useCallback, useMemo, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Word Counter - QuickoTools',
    metaDescription:
      'Count words, characters, and lines instantly with the free Word Counter tool from QuickoTools.',
    title: 'Word Counter',
    description:
      'Count words, characters, lines, and text length instantly with this free online word counter.',
    inputTitle: 'Enter Your Text',
    placeholder: 'Type or paste your text here...',
    words: 'Words',
    characters: 'Characters',
    charactersNoSpaces: 'Characters (No Spaces)',
    lines: 'Lines',
    clear: 'Clear Text',
    loadExample: 'Load Example',
    emptyState: 'Start typing to see the live text statistics.',
    exampleText: 'Hello world\nQuickoTools is simple and fast.'
  },
  ar: {
    metaTitle: 'عداد الكلمات - QuickoTools',
    metaDescription:
      'احسب عدد الكلمات والأحرف والأسطر في النص بسرعة وسهولة باستخدام أداة عداد الكلمات من QuickoTools.',
    title: 'عداد الكلمات',
    description:
      'احسب عدد الكلمات والأحرف والأسطر وطول النص فورًا باستخدام أداة عداد الكلمات المجانية.',
    inputTitle: 'أدخل النص',
    placeholder: 'اكتب النص هنا أو ألصقه...',
    words: 'الكلمات',
    characters: 'الأحرف',
    charactersNoSpaces: 'الأحرف بدون مسافات',
    lines: 'الأسطر',
    clear: 'مسح النص',
    loadExample: 'تجربة مثال',
    emptyState: 'ابدأ بالكتابة لرؤية إحصائيات النص مباشرة.',
    exampleText: 'مرحبا بالعالم\nQuickoTools سريع وبسيط.'
  }
};

function WordCounter({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;
  const [text, setText] = useState('');

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const stats = useMemo(() => {
    const trimmedText = text.trim();

    const wordCount = trimmedText ? trimmedText.split(/\s+/).length : 0;
    const characterCount = text.length;
    const characterCountNoSpaces = text.replace(/\s/g, '').length;
    const lineCount = text ? text.split('\n').length : 0;

    return [
      {
        key: 'words',
        label: currentContent.words,
        value: wordCount
      },
      {
        key: 'characters',
        label: currentContent.characters,
        value: characterCount
      },
      {
        key: 'charactersNoSpaces',
        label: currentContent.charactersNoSpaces,
        value: characterCountNoSpaces
      },
      {
        key: 'lines',
        label: currentContent.lines,
        value: lineCount
      }
    ];
  }, [text, currentContent]);

  const handleChange = useCallback((event) => {
    setText(event.target.value);
  }, []);

  const handleLoadExample = useCallback(() => {
    setText(currentContent.exampleText);
  }, [currentContent.exampleText]);

  const handleClear = useCallback(() => {
    setText('');
  }, []);

  return (
    <main className="tool-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <section className="tool-shell">
        <div className="tool-shell-header">
          <span className="tool-shell-badge">QuickoTools</span>
          <h1 className="tool-shell-title">{currentContent.title}</h1>
          <p className="tool-shell-description">{currentContent.description}</p>
        </div>

        <div className="tool-panel">
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
                disabled={!text}
              >
                {currentContent.clear}
              </button>
            </div>
          </div>

          <textarea
            value={text}
            onChange={handleChange}
            placeholder={currentContent.placeholder}
            className="tool-textarea"
            aria-label={currentContent.title}
          />

          {!text.trim() && (
            <p className="tool-helper-text">{currentContent.emptyState}</p>
          )}
        </div>

        <section className="tool-stats-grid">
          {stats.map((item) => (
            <div key={item.key} className="tool-stat-card">
              <h2 className="tool-stat-label">{item.label}</h2>
              <p className="tool-stat-value">{item.value}</p>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}

export default WordCounter;