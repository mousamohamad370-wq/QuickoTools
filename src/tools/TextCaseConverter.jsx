import { useState } from 'react';

function TextCaseConverter() {
  const [text, setText] = useState('');

  const convertToUppercase = () => {
    setText(text.toUpperCase());
  };

  const convertToLowercase = () => {
    setText(text.toLowerCase());
  };

  const convertToCapitalize = () => {
    const capitalizedText = text
      .toLowerCase()
      .split(' ')
      .map((word) => {
        if (!word) return '';
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');

    setText(capitalizedText);
  };

  const clearText = () => {
    setText('');
  };

  return (
    <main style={{ padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '12px' }}>
          Text Case Converter
        </h1>

        <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
          Convert text to uppercase, lowercase, or capitalize format instantly.
        </p>

        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Type or paste your text here..."
          style={{
            width: '100%',
            minHeight: '220px',
            padding: '16px',
            border: '1px solid #d1d5db',
            borderRadius: '10px',
            resize: 'vertical',
            outline: 'none',
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '20px'
          }}
        />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '24px'
          }}
        >
          <button
            onClick={convertToUppercase}
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              padding: '12px 18px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            UPPERCASE
          </button>

          <button
            onClick={convertToLowercase}
            style={{
              backgroundColor: '#111827',
              color: '#ffffff',
              border: 'none',
              padding: '12px 18px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            lowercase
          </button>

          <button
            onClick={convertToCapitalize}
            style={{
              backgroundColor: '#059669',
              color: '#ffffff',
              border: 'none',
              padding: '12px 18px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Capitalize
          </button>

          <button
            onClick={clearText}
            style={{
              backgroundColor: '#dc2626',
              color: '#ffffff',
              border: 'none',
              padding: '12px 18px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Clear
          </button>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)'
          }}
        >
          <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>
            Preview
          </h2>

          <div
            style={{
              minHeight: '120px',
              padding: '16px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              lineHeight: '1.7',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}
          >
            {text || 'Converted text will appear here.'}
          </div>
        </div>
      </div>
    </main>
  );
}

export default TextCaseConverter;