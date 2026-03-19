import { useCallback, useMemo, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Word Counter - QuickoTools',
    metaDescription:
      'Count words, characters, lines, paragraphs, and reading time instantly with the free Word Counter tool from QuickoTools.',
    badge: 'Text Tool',
    title: 'Word Counter',
    description:
      'Count words, characters, lines, paragraphs, and text length instantly with this free online word counter.',
    inputTitle: 'Enter Your Text',
    placeholder: 'Type or paste your text here...',
    words: 'Words',
    characters: 'Characters',
    charactersNoSpaces: 'Characters (No Spaces)',
    lines: 'Lines',
    paragraphs: 'Paragraphs',
    readingTime: 'Reading Time',
    clear: 'Clear Text',
    loadExample: 'Load Example',
    emptyState: 'Start typing to see the live text statistics.',
    exampleText: 'Hello world\nQuickoTools is simple and fast.',
    quickInfoTitle: 'How it works',
    quickInfoText:
      'Paste or type any text and the statistics will update instantly while you write.',
    exampleTitle: 'Quick Example',
    exampleLabel: 'Sample text',
    tipsTitle: 'Why use this tool',
    tipsText:
      'This word counter is useful for articles, essays, assignments, SEO writing, social content, and quick text checks.',
    readingTimeUnit: 'min',
    statsSectionTitle: 'Live Text Statistics'
  },
  ar: {
    metaTitle: 'عداد الكلمات - QuickoTools',
    metaDescription:
      'احسب عدد الكلمات والأحرف والأسطر والفقرات ووقت القراءة بسرعة باستخدام أداة عداد الكلمات من QuickoTools.',
    badge: 'أداة نصوص',
    title: 'عداد الكلمات',
    description:
      'احسب عدد الكلمات والأحرف والأسطر والفقرات وطول النص فورًا باستخدام أداة عداد الكلمات المجانية.',
    inputTitle: 'أدخل النص',
    placeholder: 'اكتب النص هنا أو ألصقه...',
    words: 'الكلمات',
    characters: 'الأحرف',
    charactersNoSpaces: 'الأحرف بدون مسافات',
    lines: 'الأسطر',
    paragraphs: 'الفقرات',
    readingTime: 'وقت القراءة',
    clear: 'مسح النص',
    loadExample: 'تجربة مثال',
    emptyState: 'ابدأ بالكتابة لرؤية إحصائيات النص مباشرة.',
    exampleText: 'مرحبا بالعالم\nQuickoTools سريع وبسيط.',
    quickInfoTitle: 'كيف تعمل الأداة',
    quickInfoText:
      'ألصق أي نص أو اكتب مباشرة، وستتحدث الإحصائيات فورًا أثناء الكتابة.',
    exampleTitle: 'مثال سريع',
    exampleLabel: 'نص تجريبي',
    tipsTitle: 'لماذا تستخدم هذه الأداة',
    tipsText:
      'تفيد هذه الأداة في المقالات، والواجبات، وكتابة السيو، ومنشورات التواصل، ومراجعة النصوص بسرعة.',
    readingTimeUnit: 'دقيقة',
    statsSectionTitle: 'إحصائيات النص المباشرة'
  }
};

function WordCounter({ language }) {
  const isArabic = language === 'ar';
  const currentContent = isArabic ? content.ar : content.en;
  const [text, setText] = useState('');

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const stats = useMemo(() => {
    const trimmedText = text.trim();

    const wordCount = trimmedText ? trimmedText.split(/\s+/).length : 0;
    const characterCount = text.length;
    const characterCountNoSpaces = text.replace(/\s/g, '').length;
    const lineCount = text ? text.split('\n').length : 0;
    const paragraphCount = trimmedText
      ? trimmedText.split(/\n\s*\n/).filter(Boolean).length
      : 0;

    const readingTimeMinutes = wordCount > 0 ? Math.max(1, Math.ceil(wordCount / 200)) : 0;

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
      },
      {
        key: 'paragraphs',
        label: currentContent.paragraphs,
        value: paragraphCount
      },
      {
        key: 'readingTime',
        label: currentContent.readingTime,
        value:
          readingTimeMinutes === 0
            ? '0'
            : `${readingTimeMinutes} ${currentContent.readingTimeUnit}`
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
    <main className="tool-page" dir={isArabic ? 'rtl' : 'ltr'}>
      <section className="tool-shell">
        <div className="tool-shell-header">
          <span className="tool-shell-badge">{currentContent.badge}</span>
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

        <div className="tool-panel">
          <div className="tool-panel-top">
            <div className="tool-panel-heading">
              <h2 className="tool-panel-title">
                {currentContent.statsSectionTitle}
              </h2>
            </div>
          </div>

          <section className="tool-stats-grid">
            {stats.map((item) => (
              <div key={item.key} className="tool-stat-card">
                <h3 className="tool-stat-label">{item.label}</h3>
                <p className="tool-stat-value">{item.value}</p>
              </div>
            ))}
          </section>
        </div>

        <section className="tool-info-grid">
          <div className="tool-info-card">
            <h2 className="tool-info-title">{currentContent.quickInfoTitle}</h2>
            <p className="tool-info-text">{currentContent.quickInfoText}</p>

            <div className="tool-example-box">
              <span className="tool-example-label">
                {currentContent.exampleLabel}
              </span>
              <div className="tool-example-content">
                {currentContent.exampleText}
              </div>
            </div>
          </div>

          <div className="tool-info-card">
            <h2 className="tool-info-title">{currentContent.tipsTitle}</h2>
            <p className="tool-info-text">{currentContent.tipsText}</p>
          </div>
        </section>
      </section>
    </main>
  );
}

export default WordCounter;