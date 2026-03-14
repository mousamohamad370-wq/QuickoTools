import { useCallback, useMemo, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Password Generator - QuickoTools',
    metaDescription:
      'Generate strong random passwords instantly with customizable options using the free Password Generator tool from QuickoTools.',
    title: 'Password Generator',
    description:
      'Generate strong random passwords instantly with customizable length and character options.',
    inputTitle: 'Password Settings',
    outputTitle: 'Generated Password',
    length: 'Password Length',
    uppercase: 'Include Uppercase Letters',
    lowercase: 'Include Lowercase Letters',
    numbers: 'Include Numbers',
    symbols: 'Include Symbols',
    generate: 'Generate Password',
    clear: 'Clear',
    copy: 'Copy Result',
    copied: 'Copied!',
    loadExample: 'Load Example',
    placeholder: 'Your generated password will appear here.',
    emptyState: 'Choose your password settings, then generate a strong password.',
    infoTitle: 'What is a Password Generator?',
    infoText:
      'A password generator creates secure random passwords using selected character types, which helps improve account security and privacy.',
    validationMessage: 'Please select at least one character type.',
    exampleSettings: {
      length: 12,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: false
    }
  },
  ar: {
    metaTitle: 'مولد كلمات المرور - QuickoTools',
    metaDescription:
      'أنشئ كلمات مرور قوية وعشوائية فورًا مع خيارات مخصصة باستخدام أداة مولد كلمات المرور المجانية من QuickoTools.',
    title: 'مولد كلمات المرور',
    description:
      'أنشئ كلمات مرور قوية وعشوائية فورًا مع إمكانية تخصيص الطول وأنواع الأحرف.',
    inputTitle: 'إعدادات كلمة المرور',
    outputTitle: 'كلمة المرور الناتجة',
    length: 'طول كلمة المرور',
    uppercase: 'تضمين أحرف كبيرة',
    lowercase: 'تضمين أحرف صغيرة',
    numbers: 'تضمين أرقام',
    symbols: 'تضمين رموز',
    generate: 'إنشاء كلمة المرور',
    clear: 'مسح',
    copy: 'نسخ النتيجة',
    copied: 'تم النسخ!',
    loadExample: 'تجربة مثال',
    placeholder: 'ستظهر كلمة المرور هنا.',
    emptyState: 'اختر إعدادات كلمة المرور ثم أنشئ كلمة مرور قوية.',
    infoTitle: 'ما هو مولد كلمات المرور؟',
    infoText:
      'يقوم مولد كلمات المرور بإنشاء كلمات مرور عشوائية وآمنة باستخدام أنواع الأحرف التي تختارها، مما يساعد على تحسين الأمان والخصوصية.',
    validationMessage: 'يرجى اختيار نوع واحد على الأقل من الأحرف.',
    exampleSettings: {
      length: 12,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: false
    }
  }
};

const characterSets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+[]{}<>?'
};

function PasswordGenerator({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;

  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const hasAnyCharacterType = useMemo(() => {
    return (
      includeUppercase ||
      includeLowercase ||
      includeNumbers ||
      includeSymbols
    );
  }, [
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
  ]);

  const handleLengthChange = useCallback((event) => {
    const value = Number(event.target.value);
    setLength(value);
    setCopied(false);
    setError('');
  }, []);

  const handleGenerate = useCallback(() => {
    let characters = '';
    const safeLength = Math.max(4, Math.min(50, Number(length) || 12));

    if (includeUppercase) characters += characterSets.uppercase;
    if (includeLowercase) characters += characterSets.lowercase;
    if (includeNumbers) characters += characterSets.numbers;
    if (includeSymbols) characters += characterSets.symbols;

    if (!characters) {
      setPassword('');
      setCopied(false);
      setError(currentContent.validationMessage);
      return;
    }

    let newPassword = '';

    for (let index = 0; index < safeLength; index += 1) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }

    setPassword(newPassword);
    setCopied(false);
    setError('');
  }, [
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    currentContent.validationMessage
  ]);

  const handleClear = useCallback(() => {
    setLength(12);
    setIncludeUppercase(true);
    setIncludeLowercase(true);
    setIncludeNumbers(true);
    setIncludeSymbols(false);
    setPassword('');
    setCopied(false);
    setError('');
  }, []);

  const handleLoadExample = useCallback(() => {
    const example = currentContent.exampleSettings;

    setLength(example.length);
    setIncludeUppercase(example.includeUppercase);
    setIncludeLowercase(example.includeLowercase);
    setIncludeNumbers(example.includeNumbers);
    setIncludeSymbols(example.includeSymbols);
    setPassword('');
    setCopied(false);
    setError('');
  }, [currentContent.exampleSettings]);

  const handleCopy = useCallback(async () => {
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }, [password]);

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
                disabled={
                  length === 12 &&
                  includeUppercase &&
                  includeLowercase &&
                  includeNumbers &&
                  !includeSymbols &&
                  !password
                }
              >
                {currentContent.clear}
              </button>
            </div>
          </div>

          <div className="tool-field">
            <label className="tool-label" htmlFor="password-length">
              {currentContent.length}
            </label>
            <input
              id="password-length"
              type="number"
              min="4"
              max="50"
              value={length}
              onChange={handleLengthChange}
              className="tool-input"
              aria-label={currentContent.length}
            />
          </div>

          <div className="tool-info-grid">
            <label className="tool-info-card">
              <div className="tool-info-title">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(event) => {
                    setIncludeUppercase(event.target.checked);
                    setCopied(false);
                    setError('');
                  }}
                />{' '}
                {currentContent.uppercase}
              </div>
            </label>

            <label className="tool-info-card">
              <div className="tool-info-title">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(event) => {
                    setIncludeLowercase(event.target.checked);
                    setCopied(false);
                    setError('');
                  }}
                />{' '}
                {currentContent.lowercase}
              </div>
            </label>

            <label className="tool-info-card">
              <div className="tool-info-title">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(event) => {
                    setIncludeNumbers(event.target.checked);
                    setCopied(false);
                    setError('');
                  }}
                />{' '}
                {currentContent.numbers}
              </div>
            </label>

            <label className="tool-info-card">
              <div className="tool-info-title">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(event) => {
                    setIncludeSymbols(event.target.checked);
                    setCopied(false);
                    setError('');
                  }}
                />{' '}
                {currentContent.symbols}
              </div>
            </label>
          </div>

          <div className="tool-panel-actions tool-actions-row">
            <button
              type="button"
              className="tool-action-button tool-action-button-primary"
              onClick={handleGenerate}
            >
              {currentContent.generate}
            </button>
          </div>

          {!password && !error && (
            <p className="tool-helper-text">{currentContent.emptyState}</p>
          )}

          {error && (
            <p className="tool-helper-text tool-helper-text-error">{error}</p>
          )}

          {!hasAnyCharacterType && !error && (
            <p className="tool-helper-text tool-helper-text-error">
              {currentContent.validationMessage}
            </p>
          )}
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
                disabled={!password}
              >
                {currentContent.copy}
              </button>
            </div>
          </div>

          <div className="tool-result-box">
            <p
              className={`tool-result-text ${
                !password ? 'tool-result-placeholder' : ''
              }`}
            >
              {password || currentContent.placeholder}
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

export default PasswordGenerator;