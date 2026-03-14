import { useCallback, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Roman Numeral Converter - QuickoTools',
    metaDescription:
      'Convert numbers to Roman numerals or Roman numerals back to numbers instantly with the free Roman Numeral Converter from QuickoTools.',
    title: 'Roman Numeral Converter',
    description:
      'Convert numbers to Roman numerals or Roman numerals back to numbers instantly.',
    inputTitle: 'Input',
    inputLabel: 'Input',
    inputPlaceholder: 'Enter a number or Roman numeral...',
    outputTitle: 'Result',
    outputPlaceholder: 'The result will appear here.',
    toRoman: 'To Roman',
    toNumber: 'To Number',
    clear: 'Clear',
    copy: 'Copy Result',
    copied: 'Copied!',
    loadExample: 'Load Example',
    exampleValue: '2024',
    invalidNumber: 'Please enter a number between 1 and 3999.',
    invalidRoman: 'Invalid Roman numeral.',
    emptyState:
      'Enter a number or Roman numeral, then choose the conversion type.',
    infoTitle: 'What are Roman numerals?',
    infoText:
      'Roman numerals are a number system from ancient Rome that uses letters like I, V, X, L, C, D, and M to represent values.'
  },
  ar: {
    metaTitle: 'محول الأرقام الرومانية - QuickoTools',
    metaDescription:
      'حوّل الأرقام إلى أرقام رومانية أو حوّل الأرقام الرومانية إلى أرقام عادية فورًا باستخدام أداة محول الأرقام الرومانية المجانية من QuickoTools.',
    title: 'محول الأرقام الرومانية',
    description:
      'حوّل الأرقام إلى أرقام رومانية أو حوّل الأرقام الرومانية إلى أرقام عادية فورًا.',
    inputTitle: 'الإدخال',
    inputLabel: 'الإدخال',
    inputPlaceholder: 'أدخل رقمًا أو رقمًا رومانيًا...',
    outputTitle: 'النتيجة',
    outputPlaceholder: 'ستظهر النتيجة هنا.',
    toRoman: 'إلى روماني',
    toNumber: 'إلى رقم',
    clear: 'مسح',
    copy: 'نسخ النتيجة',
    copied: 'تم النسخ!',
    loadExample: 'تجربة مثال',
    exampleValue: '2024',
    invalidNumber: 'يرجى إدخال رقم بين 1 و 3999.',
    invalidRoman: 'الرقم الروماني غير صالح.',
    emptyState: 'أدخل رقمًا أو رقمًا رومانيًا ثم اختر نوع التحويل.',
    infoTitle: 'ما هي الأرقام الرومانية؟',
    infoText:
      'الأرقام الرومانية هي نظام عددي من روما القديمة يستخدم حروفًا مثل I و V و X و L و C و D و M لتمثيل القيم.'
  }
};

const romanMap = [
  { value: 1000, symbol: 'M' },
  { value: 900, symbol: 'CM' },
  { value: 500, symbol: 'D' },
  { value: 400, symbol: 'CD' },
  { value: 100, symbol: 'C' },
  { value: 90, symbol: 'XC' },
  { value: 50, symbol: 'L' },
  { value: 40, symbol: 'XL' },
  { value: 10, symbol: 'X' },
  { value: 9, symbol: 'IX' },
  { value: 5, symbol: 'V' },
  { value: 4, symbol: 'IV' },
  { value: 1, symbol: 'I' }
];

function convertToRoman(number) {
  let num = number;
  let result = '';

  for (const item of romanMap) {
    while (num >= item.value) {
      result += item.symbol;
      num -= item.value;
    }
  }

  return result;
}

function convertFromRoman(roman) {
  const romanValues = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };

  let total = 0;

  for (let index = 0; index < roman.length; index += 1) {
    const current = romanValues[roman[index]];
    const next = romanValues[roman[index + 1]];

    if (next && current < next) {
      total += next - current;
      index += 1;
    } else {
      total += current;
    }
  }

  return total;
}

function isValidRoman(roman) {
  return /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(
    roman
  );
}

function RomanNumeralConverter({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const handleChange = useCallback((event) => {
    setInputText(event.target.value);
    setOutputText('');
    setError('');
    setCopied(false);
  }, []);

  const handleToRoman = useCallback(() => {
    const number = Number(inputText.trim());

    if (!Number.isInteger(number) || number < 1 || number > 3999) {
      setOutputText('');
      setError(currentContent.invalidNumber);
      setCopied(false);
      return;
    }

    setOutputText(convertToRoman(number));
    setError('');
    setCopied(false);
  }, [inputText, currentContent.invalidNumber]);

  const handleToNumber = useCallback(() => {
    const roman = inputText.trim().toUpperCase();

    if (!roman || !isValidRoman(roman)) {
      setOutputText('');
      setError(currentContent.invalidRoman);
      setCopied(false);
      return;
    }

    setOutputText(String(convertFromRoman(roman)));
    setError('');
    setCopied(false);
  }, [inputText, currentContent.invalidRoman]);

  const handleClear = useCallback(() => {
    setInputText('');
    setOutputText('');
    setError('');
    setCopied(false);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!outputText || error) return;

    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }, [outputText, error]);

  const handleLoadExample = useCallback(() => {
    setInputText(currentContent.exampleValue);
    setOutputText('');
    setError('');
    setCopied(false);
  }, [currentContent.exampleValue]);

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
                disabled={!inputText && !outputText}
              >
                {currentContent.clear}
              </button>
            </div>
          </div>

          <div className="tool-field">
            <label className="tool-label" htmlFor="roman-converter-input">
              {currentContent.inputLabel}
            </label>

            <input
              id="roman-converter-input"
              type="text"
              value={inputText}
              onChange={handleChange}
              placeholder={currentContent.inputPlaceholder}
              className="tool-input"
              aria-label={currentContent.inputLabel}
            />
          </div>

          <div className="tool-panel-actions tool-actions-row">
            <button
              type="button"
              className="tool-action-button tool-action-button-primary"
              onClick={handleToRoman}
              disabled={!inputText}
            >
              {currentContent.toRoman}
            </button>

            <button
              type="button"
              className="tool-action-button tool-action-button-secondary"
              onClick={handleToNumber}
              disabled={!inputText}
            >
              {currentContent.toNumber}
            </button>
          </div>

          {!inputText.trim() && !error && (
            <p className="tool-helper-text">{currentContent.emptyState}</p>
          )}

          {copied && (
            <p className="tool-helper-text tool-helper-text-success">
              {currentContent.copied}
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
                disabled={!outputText || Boolean(error)}
              >
                {currentContent.copy}
              </button>
            </div>
          </div>

          <div className="tool-result-box">
            <p
              className={`tool-result-text ${
                !outputText && !error ? 'tool-result-placeholder' : ''
              } ${error ? 'tool-helper-text-error' : ''}`}
            >
              {error || outputText || currentContent.outputPlaceholder}
            </p>
          </div>
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

export default RomanNumeralConverter;