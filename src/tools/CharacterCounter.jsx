import { useState } from 'react';

function CharacterCounter({ language }) {
  const [text, setText] = useState('');

  const characterCount = text.length;

  const content = {
    en: {
      title: 'Character Counter',
      description: 'Count characters in your text instantly.',
      placeholder: 'Type or paste your text here...',
      characters: 'Characters'
    },
    ar: {
      title: 'عداد الأحرف',
      description: 'احسب عدد الأحرف في النص فورًا.',
      placeholder: 'اكتب النص هنا أو ألصقه...',
      characters: 'الأحرف'
    }
  };

  const currentContent = language === 'ar' ? content.ar : content.en;

  return (
    <main
      className="tool-page"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      style={{ padding: '40px 20px' }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '12px' }}>
          {currentContent.title}
        </h1>

        <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
          {currentContent.description}
        </p>

        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={currentContent.placeholder}
          style={{
            width: '100%',
            minHeight: '220px',
            padding: '16px',
            border: '1px solid #d1d5db',
            borderRadius: '10px',
            resize: 'vertical',
            outline: 'none',
            fontSize: '16px',
            lineHeight: '1.6'
          }}
        />

        <div
          style={{
            marginTop: '24px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)'
          }}
        >
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>
            {currentContent.characters}
          </h2>
          <p style={{ fontSize: '28px', fontWeight: '700' }}>{characterCount}</p>
        </div>
      </div>
    </main>
  );
}

export default CharacterCounter;