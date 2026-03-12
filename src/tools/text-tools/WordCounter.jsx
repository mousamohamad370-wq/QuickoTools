import { useMemo, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

function WordCounter({ language }) {
  const content = {
    en: {
      title: 'Word Counter',
      description:
        'Count words, characters, lines, and text length instantly with this free online word counter.',
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
      title: 'عداد الكلمات',
      description:
        'احسب عدد الكلمات والأحرف والأسطر وطول النص فورًا باستخدام أداة عداد الكلمات المجانية.',
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

  const currentContent = language === 'ar' ? content.ar : content.en;
  const [text, setText] = useState('');

  usePageMeta(
    language === 'ar'
      ? 'عداد الكلمات - QuickoTools'
      : 'Word Counter - QuickoTools',
    language === 'ar'
      ? 'احسب عدد الكلمات والأحرف والأسطر في النص بسرعة وسهولة باستخدام أداة عداد الكلمات من QuickoTools.'
      : 'Count words, characters, and lines instantly with the free Word Counter tool from QuickoTools.'
  );

  const stats = useMemo(() => {
    const trimmedText = text.trim();

    const wordCount = trimmedText === '' ? 0 : trimmedText.split(/\s+/).length;
    const characterCount = text.length;
    const characterCountNoSpaces = text.replace(/\s/g, '').length;
    const lineCount = text === '' ? 0 : text.split(/\n/).length;

    return {
      wordCount,
      characterCount,
      characterCountNoSpaces,
      lineCount
    };
  }, [text]);

  const handleLoadExample = () => {
    setText(currentContent.exampleText);
  };

  const handleClear = () => {
    setText('');
  };

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
              <h2 className="tool-panel-title">{currentContent.title}</h2>
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
                disabled={text.length === 0}
              >
                {currentContent.clear}
              </button>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder={currentContent.placeholder}
            className="tool-textarea"
          />

          {text.trim() === '' && (
            <p className="tool-helper-text">{currentContent.emptyState}</p>
          )}
        </div>

        <section className="tool-stats-grid">
          <div className="tool-stat-card">
            <h2 className="tool-stat-label">{currentContent.words}</h2>
            <p className="tool-stat-value">{stats.wordCount}</p>
          </div>

          <div className="tool-stat-card">
            <h2 className="tool-stat-label">{currentContent.characters}</h2>
            <p className="tool-stat-value">{stats.characterCount}</p>
          </div>

          <div className="tool-stat-card">
            <h2 className="tool-stat-label">
              {currentContent.charactersNoSpaces}
            </h2>
            <p className="tool-stat-value">{stats.characterCountNoSpaces}</p>
          </div>

          <div className="tool-stat-card">
            <h2 className="tool-stat-label">{currentContent.lines}</h2>
            <p className="tool-stat-value">{stats.lineCount}</p>
          </div>
        </section>
      </section>
    </main>
  );
}

export default WordCounter;