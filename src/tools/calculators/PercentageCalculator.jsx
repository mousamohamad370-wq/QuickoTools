import { useState } from 'react';

function PercentageCalculator({ language }) {
  const [mode, setMode] = useState('percent-of-number');
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const content = {
    en: {
      title: 'Percentage Calculator',
      description:
        'Calculate percentages, find what percent one number is of another, and measure percentage increase or decrease.',
      calculationType: 'Calculation Type',
      modePercentOf: 'What is X% of Y',
      modeWhatPercent: 'X is what percent of Y',
      modeChange: 'Percentage increase or decrease',
      percentage: 'Percentage (%)',
      number: 'Number',
      firstNumber: 'First Number',
      secondNumber: 'Second Number',
      originalNumber: 'Original Number',
      newNumber: 'New Number',
      calculate: 'Calculate',
      clear: 'Clear',
      resultTitle: 'Result',
      guideTitle: 'How to use this tool',
      guideText:
        'Choose the calculation type, enter your numbers, and click calculate. This tool is useful for discounts, profits, growth, exam scores, and daily math tasks.',
      errorInvalid: 'Please enter valid numbers',
      errorSecondZero: 'The second number cannot be zero',
      errorFirstZero: 'The first number cannot be zero'
    },
    ar: {
      title: 'حاسبة النسبة المئوية',
      description:
        'احسب النسب المئوية، واعرف كم تمثل قيمة من أخرى، واحسب نسبة الزيادة أو النقصان.',
      calculationType: 'نوع العملية',
      modePercentOf: 'كم يساوي X% من Y',
      modeWhatPercent: 'X يساوي كم بالمئة من Y',
      modeChange: 'نسبة الزيادة أو النقصان',
      percentage: 'النسبة المئوية (%)',
      number: 'الرقم',
      firstNumber: 'الرقم الأول',
      secondNumber: 'الرقم الثاني',
      originalNumber: 'الرقم الأصلي',
      newNumber: 'الرقم الجديد',
      calculate: 'احسب',
      clear: 'مسح',
      resultTitle: 'النتيجة',
      guideTitle: 'كيفية استخدام الأداة',
      guideText:
        'اختر نوع العملية، ثم أدخل الأرقام واضغط على احسب. هذه الأداة مفيدة للخصومات والأرباح والنمو ودرجات الاختبارات والحسابات اليومية.',
      errorInvalid: 'يرجى إدخال أرقام صحيحة',
      errorSecondZero: 'لا يمكن أن يكون الرقم الثاني صفرًا',
      errorFirstZero: 'لا يمكن أن يكون الرقم الأول صفرًا'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  const calculateResult = () => {
    const first = Number(firstValue);
    const second = Number(secondValue);

    if (
      firstValue === '' ||
      secondValue === '' ||
      Number.isNaN(first) ||
      Number.isNaN(second)
    ) {
      setError(t.errorInvalid);
      setResult('');
      return;
    }

    if (mode === 'percent-of-number') {
      const value = (first / 100) * second;
      if (language === 'ar') {
        setResult(`${first}% من ${second} = ${value.toFixed(2)}`);
      } else {
        setResult(`${first}% of ${second} = ${value.toFixed(2)}`);
      }
      setError('');
      return;
    }

    if (mode === 'what-percent') {
      if (second === 0) {
        setError(t.errorSecondZero);
        setResult('');
        return;
      }

      const value = (first / second) * 100;

      if (language === 'ar') {
        setResult(`${first} يساوي ${value.toFixed(2)}% من ${second}`);
      } else {
        setResult(`${first} is ${value.toFixed(2)}% of ${second}`);
      }

      setError('');
      return;
    }

    if (mode === 'percentage-change') {
      if (first === 0) {
        setError(t.errorFirstZero);
        setResult('');
        return;
      }

      const value = ((second - first) / first) * 100;

      if (language === 'ar') {
        const label = value >= 0 ? 'زيادة' : 'نقصان';
        setResult(
          `نسبة ${label} من ${first} إلى ${second} = ${Math.abs(value).toFixed(2)}%`
        );
      } else {
        const label = value >= 0 ? 'increase' : 'decrease';
        setResult(
          `Percentage ${label} from ${first} to ${second} = ${Math.abs(value).toFixed(2)}%`
        );
      }

      setError('');
    }
  };

  const clearFields = () => {
    setFirstValue('');
    setSecondValue('');
    setResult('');
    setError('');
    setMode('percent-of-number');
  };

  const getLabels = () => {
    if (mode === 'percent-of-number') {
      return {
        first: t.percentage,
        second: t.number
      };
    }

    if (mode === 'what-percent') {
      return {
        first: t.firstNumber,
        second: t.secondNumber
      };
    }

    return {
      first: t.originalNumber,
      second: t.newNumber
    };
  };

  const labels = getLabels();

  return (
    <main className="tool-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="tool-container">
        <h1 className="tool-page-title">{t.title}</h1>

        <p className="tool-page-description">{t.description}</p>

        <div className="tool-box">
          <label className="tool-label">{t.calculationType}</label>
          <select
            value={mode}
            onChange={(event) => setMode(event.target.value)}
            className="tool-input"
            style={{ marginBottom: '20px' }}
          >
            <option value="percent-of-number">{t.modePercentOf}</option>
            <option value="what-percent">{t.modeWhatPercent}</option>
            <option value="percentage-change">{t.modeChange}</option>
          </select>

          <label className="tool-label">{labels.first}</label>
          <input
            type="number"
            value={firstValue}
            onChange={(event) => setFirstValue(event.target.value)}
            placeholder={labels.first}
            className="tool-input"
            style={{ marginBottom: '16px' }}
          />

          <label className="tool-label">{labels.second}</label>
          <input
            type="number"
            value={secondValue}
            onChange={(event) => setSecondValue(event.target.value)}
            placeholder={labels.second}
            className="tool-input"
            style={{ marginBottom: '20px' }}
          />

          <div className="tool-actions">
            <button
              type="button"
              onClick={calculateResult}
              className="tool-primary-button"
            >
              {t.calculate}
            </button>

            <button
              type="button"
              onClick={clearFields}
              className="tool-secondary-button"
            >
              {t.clear}
            </button>
          </div>
        </div>

        {error && <div className="tool-error-message">{error}</div>}

        {result && (
          <>
            <div className="age-results-grid age-results-show">
              <div className="result-card">
                <h2 className="result-card-title">{t.resultTitle}</h2>
                <p className="result-card-value" style={{ fontSize: '22px' }}>
                  {result}
                </p>
              </div>
            </div>

            <div className="tool-box tool-section">
              <h2 className="tool-section-title">{t.guideTitle}</h2>
              <p className="tool-text">{t.guideText}</p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default PercentageCalculator;