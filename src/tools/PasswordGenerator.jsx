import { useState } from 'react';

function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let availableChars = '';

    if (includeUppercase) availableChars += uppercaseChars;
    if (includeLowercase) availableChars += lowercaseChars;
    if (includeNumbers) availableChars += numberChars;
    if (includeSymbols) availableChars += symbolChars;

    if (!availableChars) {
      setPassword('Please select at least one option.');
      return;
    }

    let newPassword = '';

    for (let i = 0; i < Number(length); i += 1) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      newPassword += availableChars[randomIndex];
    }

    setPassword(newPassword);
  };

  const copyPassword = async () => {
    if (!password || password === 'Please select at least one option.') {
      return;
    }

    try {
      await navigator.clipboard.writeText(password);
      alert('Password copied to clipboard.');
    } catch (error) {
      alert('Copy failed. Please copy manually.');
    }
  };

  return (
    <main style={{ padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '12px' }}>
          Password Generator
        </h1>

        <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
          Generate strong random passwords instantly.
        </p>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
            marginBottom: '24px'
          }}
        >
          <label
            style={{
              display: 'block',
              marginBottom: '10px',
              fontWeight: '600'
            }}
          >
            Password Length
          </label>

          <input
            type="number"
            min="4"
            max="50"
            value={length}
            onChange={(event) => setLength(event.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              marginBottom: '20px'
            }}
          />

          <div
            style={{
              display: 'grid',
              gap: '12px',
              marginBottom: '24px'
            }}
          >
            <label>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
                style={{ marginRight: '8px' }}
              />
              Include Uppercase Letters
            </label>

            <label>
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={() => setIncludeLowercase(!includeLowercase)}
                style={{ marginRight: '8px' }}
              />
              Include Lowercase Letters
            </label>

            <label>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
                style={{ marginRight: '8px' }}
              />
              Include Numbers
            </label>

            <label>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
                style={{ marginRight: '8px' }}
              />
              Include Symbols
            </label>
          </div>

          <button
            onClick={generatePassword}
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              padding: '12px 18px',
              borderRadius: '8px',
              cursor: 'pointer',
              marginRight: '12px'
            }}
          >
            Generate Password
          </button>

          <button
            onClick={copyPassword}
            style={{
              backgroundColor: '#111827',
              color: '#ffffff',
              border: 'none',
              padding: '12px 18px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Copy Password
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
            Generated Password
          </h2>

          <div
            style={{
              padding: '14px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              wordBreak: 'break-all',
              minHeight: '52px'
            }}
          >
            {password || 'Your generated password will appear here.'}
          </div>
        </div>
      </div>
    </main>
  );
}

export default PasswordGenerator;