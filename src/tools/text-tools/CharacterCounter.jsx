import { useCallback, useMemo, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Character Counter - QuickoTools',
    metaDescription:
      'Count characters in your text instantly with the free Character Counter tool from QuickoTools.',
    title: 'Character Counter',
    description:
      'Count characters in your text instantly with a clean and simple online character counter.',
    inputTitle: 'Input Text',
    outputTitle: 'Character Count',
    placeholder: 'Type or paste your text here...',
    resultPlaceholder: 'Your character count will appear here.',
    clear: 'Clear',
    loadExample: 'Load Example',
    exampleText: 'Hello world from QuickoTools',
    characters: 'Characters',
    emptyState: 'Type or paste text to see the live character count.',
    infoTitle: 'What is a Character Counter?',
    infoText:
      'A character counter helps you instantly measure the total number of characters in your text, which is useful for writing limits, forms, SEO, and social media content.'
  },
  ar: {
    metaTitle: 'عداد الأحرف - QuickoTools',
    metaDescription:
      'احسب عدد الأحرف في النص فورًا باستخدام أداة عداد الأحرف المجانية من QuickoTools.',
    title: 'عداد الأحرف',
    description:
      'احسب عدد الأحرف في النص فورًا باستخدام أداة بسيطة وسريعة لعدّ الأحرف.',
    inputTitle: 'النص المدخل',
    outputTitle: 'عدد الأحرف',
    placeholder: 'اكتب النص هنا أو ألصقه...',
    resultPlaceholder: 'سيظهر عدد الأحرف هنا.',
    clear: 'مسح',
    loadExample: 'تجربة مثال',
    exampleText: 'مرحبا بك في QuickoTools',
    characters: 'الأحرف',
    emptyState: 'اكتب النص أو ألصقه لرؤية عدد الأحرف مباشرة.',
    infoTitle: 'ما هو عداد الأحرف؟',
    infoText:
      'يساعدك عداد الأحرف على معرفة العدد الإجمالي للأحرف في النص فورًا، وهو مفيد لحدود الكتابة والنماذج والسيو ومحتوى وسائل التواصل.'
  }
};

function CharacterCounter({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;
  const [inputText, setInputText] = useState('');

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const characterCount = useMemo(() => inputText.length, [inputText]);

  const stats = useMemo(() => {
    return [
      {
        key: 'characters',
        label: currentContent.characters,
        value: characterCount
      }
    ];
  }, [currentContent.characters, characterCount]);

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

        <section className="tool-stats-grid">
          {stats.map((item) => (
            <div key={item.key} className="tool-stat-card">
              <h2 className="tool-stat-label">{item.label}</h2>
              <p className="tool-stat-value">{item.value}</p>
            </div>
          ))}
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

export default CharacterCounter;