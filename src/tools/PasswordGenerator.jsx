import { useState } from 'react';

function PasswordGenerator({ language }) {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');

  const content = {
    en: {
      title: 'Password Generator',
      description: 'Generate strong random passwords instantly.',
      length: 'Password Length',
      uppercase: 'Include Uppercase Letters',
      lowercase: 'Include Lowercase Letters',
      numbers: 'Include Numbers',
      symbols: 'Include Symbols',
      generate: 'Generate Password',
      copy: 'Copy Password',
      result: 'Generated Password',
      placeholder: 'Your generated password will appear here.',
      copied: 'Password copied to clipboard.',
      copyError: 'Copy failed. Please copy manually.'
    },
    ar: {
      title: 'مولد كلمات المرور',
      description: 'أنشئ كلمات مرور قوية وعشوائية فورًا.',
      length: 'طول كلمة المرور',
      uppercase: 'تضمين أحرف كبيرة',
      lowercase: 'تضمين أحرف صغيرة',
      numbers: 'تضمين أرقام',
      symbols: 'تضمين رموز',
      generate: 'إنشاء كلمة المرور',
      copy: 'نسخ كلمة المرور',
      result: 'كلمة المرور الناتجة',
      placeholder: 'ستظهر كلمة المرور هنا.',
      copied: 'تم نسخ كلمة المرور.',
      copyError: 'فشل النسخ. انسخها يدويًا.'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  const generatePassword = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}<>?';

    let characters = '';

    if (includeUppercase) characters += upper;
    if (includeLowercase) characters += lower;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    if (!characters) {
      setPassword('');
      return;
    }

    let newPassword = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }

    setPassword(newPassword);
  };

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      alert(t.copied);
    } catch {
      alert(t.copyError);
    }
  };

  return (
    <main
      className="tool-page"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      style={{ padding: '40px 20px' }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '12px' }}>
          {t.title}
        </h1>

        <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: '1.6' }}>
          {t.description}
        </p>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
            marginBottom: '24px'
          }}
        >
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            {t.length}
          </label>

          <input
            type="number"
            min="4"
            max="50"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              marginBottom: '20px'
            }}
          />

          <div style={{ marginBottom: '10px' }}>
            <label>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />{' '}
              {t.uppercase}
            </label>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
              />{' '}
              {t.lowercase}
            </label>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />{' '}
              {t.numbers}
            </label>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />{' '}
              {t.symbols}
            </label>
          </div>

          <button
            onClick={generatePassword}
            style={{
              padding: '12px 18px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            {t.generate}
          </button>

          <button
            onClick={copyPassword}
            style={{
              padding: '12px 18px',
              backgroundColor: '#111827',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            {t.copy}
          </button>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 6px 18px rgba(0,0,0,0.06)'
          }}
        >
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>
            {t.result}
          </h2>

          <p
            style={{
              fontSize: '22px',
              fontWeight: '700',
              wordBreak: 'break-all'
            }}
          >
            {password || t.placeholder}
          </p>
        </div>
      </div>
    </main>
  );
}

export default PasswordGenerator;