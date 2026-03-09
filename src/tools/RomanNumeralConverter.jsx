import { useState } from 'react';

function RomanNumeralConverter({ language }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const content = {
    en: {
      title: 'Roman Numeral Converter',
      description: 'Convert numbers to Roman numerals or Roman numerals back to numbers instantly.',
      inputLabel: 'Input',
      inputPlaceholder: 'Enter a number or Roman numeral...',
      outputTitle: 'Result',
      outputPlaceholder: 'The result will appear here.',
      toRoman: 'To Roman',
      toNumber: 'To Number',
      clear: 'Clear',
      copy: 'Copy',
      copied: 'Copied!',
      invalidNumber: 'Please enter a number between 1 and 3999',
      invalidRoman: 'Invalid Roman numeral',
      exampleTitle: 'Example',
      tryExample: 'Try Example',
      exampleValue: '2024',
      infoTitle: 'What are Roman numerals?',
      infoText:
        'Roman numerals are a number system from ancient Rome that uses letters like I, V, X, L, C, D, and M to represent values.'
    },
    ar: {
      title: 'محول الأرقام الرومانية',
      description: 'حوّل الأرقام إلى أرقام رومانية أو حوّل الأرقام الرومانية إلى أرقام عادية فورًا.',
      inputLabel: 'الإدخال',
      inputPlaceholder: 'أدخل رقمًا أو رقمًا رومانيًا...',
      outputTitle: 'النتيجة',
      outputPlaceholder: 'ستظهر النتيجة هنا.',
      toRoman: 'إلى روماني',
      toNumber: 'إلى رقم',
      clear: 'مسح',
      copy: 'نسخ',
      copied: 'تم النسخ!',
      invalidNumber: 'يرجى إدخال رقم بين 1 و 3999',
      invalidRoman: 'الرقم الروماني غير صالح',
      exampleTitle: 'مثال',
      tryExample: 'جرّب المثال',
      exampleValue: '2024',
      infoTitle: 'ما هي الأرقام الرومانية؟',
      infoText:
        'الأرقام الرومانية هي نظام عددي من روما القديمة يستخدم حروفًا مثل I و V و X و L و C و D و M لتمثيل القيم.'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

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

  const convertToRoman = (number) => {
    let num = number;
    let result = '';

    for (const item of romanMap) {
      while (num >= item.value) {
        result += item.symbol;
        num -= item.value;
      }
    }

    return result;
  };

  const convertFromRoman = (roman) => {
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
  };

  const isValidRoman = (roman) => {
    return /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(roman);
  };

  const handleToRoman = () => {
    const number = Number(input.trim());

    if (!Number.isInteger(number) || number < 1 || number > 3999) {
      setOutput('');
      setError(t.invalidNumber);
      setCopied(false);
      return;
    }

    setOutput(convertToRoman(number));
    setError('');
    setCopied(false);
  };

  const handleToNumber = () => {
    const roman = input.trim().toUpperCase();

    if (!roman || !isValidRoman(roman)) {
      setOutput('');
      setError(t.invalidRoman);
      setCopied(false);
      return;
    }

    setOutput(String(convertFromRoman(roman)));
    setError('');
    setCopied(false);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
    setCopied(false);
  };

  const copyResult = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      setCopied(false);
    }
  };

  const tryExample = () => {
    setInput(t.exampleValue);
    setOutput('');
    setError('');
    setCopied(false);
  };

  return (
    <main
      className="tool-page"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      style={{
        padding: '40px 20px',
        backgroundColor: '#f3f4f6',
        minHeight: '100vh'
      }}
    >
      <div style={{ maxWidth: '980px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1
            style={{
              fontSize: '32px',
              marginBottom: '12px',
              fontWeight: '700',
              color: '#111827'
            }}
          >
            {t.title}
          </h1>

          <p
            style={{
              color: '#6b7280',
              lineHeight: '1.7',
              fontSize: '16px',
              margin: 0
            }}
          >
            {t.description}
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
            marginBottom: '28px'
          }}
        >
          <div style={{ marginBottom: '18px' }}>
            <label
              style={{
                display: 'block',
                fontWeight: '700',
                marginBottom: '12px',
                color: '#111827',
                fontSize: '18px'
              }}
            >
              {t.inputLabel}
            </label>

            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t.inputPlaceholder}
              style={{
                width: '100%',
                height: '54px',
                padding: '0 16px',
                border: '1px solid #d1d5db',
                borderRadius: '10px',
                outline: 'none',
                fontSize: '16px',
                backgroundColor: '#ffffff',
                color: '#111827',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {copied && (
            <div style={{ marginBottom: '18px' }}>
              <span
                style={{
                  backgroundColor: '#dbeafe',
                  color: '#1d4ed8',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                {t.copied}
              </span>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: language === 'ar' ? 'flex-start' : 'flex-end',
              flexWrap: 'wrap'
            }}
          >
            <button
              onClick={handleToRoman}
              style={{
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '14px 24px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              {t.toRoman}
            </button>

            <button
              onClick={handleToNumber}
              style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '14px 24px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              {t.toNumber}
            </button>

            <button
              onClick={clearAll}
              style={{
                backgroundColor: '#e5e7eb',
                color: '#111827',
                border: 'none',
                borderRadius: '10px',
                padding: '14px 24px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              {t.clear}
            </button>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
            marginBottom: '28px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '18px'
            }}
          >
            <h2
              style={{
                fontSize: '18px',
                margin: 0,
                color: '#111827',
                fontWeight: '700'
              }}
            >
              {t.outputTitle}
            </h2>

            <button
              onClick={copyResult}
              style={{
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 20px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: output ? 'pointer' : 'not-allowed',
                opacity: output ? 1 : 0.65
              }}
            >
              {t.copy}
            </button>
          </div>

          <div
            style={{
              minHeight: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <p
              style={{
                width: '100%',
                fontSize: output || error ? '22px' : '20px',
                fontWeight: output ? '700' : '700',
                color: error ? '#dc2626' : output ? '#111827' : '#374151',
                lineHeight: '1.9',
                margin: 0,
                wordBreak: 'break-word'
              }}
            >
              {error || output || t.outputPlaceholder}
            </p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
            marginBottom: '28px'
          }}
        >
          <h2
            style={{
              fontSize: '18px',
              marginBottom: '16px',
              color: '#111827',
              fontWeight: '700'
            }}
          >
            {t.exampleTitle}
          </h2>

          <button
            onClick={tryExample}
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '14px 24px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            {t.tryExample}
          </button>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)'
          }}
        >
          <h2
            style={{
              fontSize: '18px',
              marginBottom: '12px',
              color: '#111827',
              fontWeight: '700'
            }}
          >
            {t.infoTitle}
          </h2>

          <p
            style={{
              color: '#6b7280',
              lineHeight: '1.8',
              margin: 0,
              fontSize: '16px'
            }}
          >
            {t.infoText}
          </p>
        </div>
      </div>
    </main>
  );
}

export default RomanNumeralConverter;