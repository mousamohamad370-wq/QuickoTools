import { useCallback, useMemo, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Character Counter - QuickoTools',
    metaDescription:
      'Count characters in your text instantly with the free Character Counter tool from QuickoTools.',
    badge: 'Text Tool',
    title: 'Character Counter',
    description:
      'Count characters in your text instantly with a clean and simple online character counter.',
    inputTitle: 'Input Text',
    inputLabel: 'Input Text',
    placeholder: 'Type or paste your text here...',
    loadExample: 'Load Example',
    clear: 'Clear',
    exampleText: 'Hello world from QuickoTools',
    characters: 'Characters',
    charactersNoSpaces: 'Characters (No Spaces)',
    words: 'Words',
    lines: 'Lines',
    emptyState: 'Type or paste text to see the live character count.',
    infoTitle: 'What is a Character Counter?',
    infoText:
      'A character counter helps you instantly measure the total number of characters in your text, which is useful for writing limits, forms, SEO, and social media content.',
    statsTitle: 'Live Text Statistics',
    tipTitle: 'Helpful tip',
    tipText:
      'Character counting usually includes spaces and punctuation, so check the “Characters (No Spaces)” stat when you need a cleaner text-only count.'
  },
  ar: {
    metaTitle: 'عداد الأحرف - QuickoTools',
    metaDescription:
      'احسب عدد الأحرف في النص فورًا باستخدام أداة عداد الأحرف المجانية من QuickoTools.',
    badge: 'أداة نصوص',
    title: 'عداد الأحرف',
    description:
      'احسب عدد الأحرف في النص فورًا باستخدام أداة بسيطة وسريعة لعدّ الأحرف.',
    inputTitle: 'النص المدخل',
    inputLabel: 'النص المدخل',
    placeholder: 'اكتب النص هنا أو ألصقه...',
    loadExample: 'تجربة مثال',
    clear: 'مسح',
    exampleText: 'مرحبا بك في QuickoTools',
    characters: 'الأحرف',
    charactersNoSpaces: 'الأحرف بدون مسافات',
    words: 'الكلمات',
    lines: 'الأسطر',
    emptyState: 'اكتب النص أو ألصقه لرؤية عدد الأحرف مباشرة.',
    infoTitle: 'ما هو عداد الأحرف؟',
    infoText:
      'يساعدك عداد الأحرف على معرفة العدد الإجمالي للأحرف في النص فورًا، وهو مفيد لحدود الكتابة والنماذج والسيو ومحتوى وسائل التواصل.',
    statsTitle: 'إحصائيات النص المباشرة',
    tipTitle: 'نصيحة مفيدة',
    tipText:
      'غالبًا ما يشمل عدّ الأحرف المسافات وعلامات الترقيم، لذلك راقب أيضًا إحصائية “الأحرف بدون مسافات” عندما تحتاج عددًا أنظف للنص فقط.'
  }
};

function CharacterCounter({ language }) {
  const isArabic = language === 'ar';
  const currentContent = isArabic ? content.ar : content.en;
  const [inputText, setInputText] = useState('');

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const stats = useMemo(() => {
    const trimmedText = inputText.trim();
    const wordCount = trimmedText ? trimmedText.split(/\s+/).length : 0;
    const lineCount = inputText ? inputText.split('\n').length : 0;

    return [
      {
        key: 'characters',
        label: currentContent.characters,
        value: inputText.length
      },
      {
        key: 'charactersNoSpaces',
        label: currentContent.charactersNoSpaces,
        value: inputText.replace(/\s/g, '').length
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
      }
    ];
  }, [inputText, currentContent]);

  const handleChange = useCallback((event) => {
    setInputText(event.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setInputText('');
  }, []);

  const handleLoadExample = useCallback(() => {
    setInputText(currentContent.exampleText);
  }, [currentContent.exampleText]);

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
                disabled={!inputText}
              >
                {currentContent.clear}
              </button>
            </div>
          </div>

          <div className="tool-field">
            <label className="tool-label" htmlFor="character-counter-input">
              {currentContent.inputLabel}
            </label>

            <textarea
              id="character-counter-input"
              value={inputText}
              onChange={handleChange}
              placeholder={currentContent.placeholder}
              className="tool-textarea"
              aria-label={currentContent.inputTitle}
            />
          </div>

          {!inputText.trim() && (
            <p className="tool-helper-text">{currentContent.emptyState}</p>
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
            <h2 className="tool-info-title">{currentContent.tipTitle}</h2>
            <p className="tool-info-text">{currentContent.tipText}</p>
          </div>
        </section>
      </section>
    </main>
  );
}

export default CharacterCounter;