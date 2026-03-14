import { useCallback, useMemo, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Percentage Calculator - QuickoTools',
    metaDescription:
      'Calculate percentages, find what percent one number is of another, and measure percentage increase or decrease with the free Percentage Calculator from QuickoTools.',
    title: 'Percentage Calculator',
    description:
      'Calculate percentages, find what percent one number is of another, and measure percentage increase or decrease.',
    inputTitle: 'Calculation Inputs',
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
    loadExample: 'Load Example',
    resultTitle: 'Result',
    resultPlaceholder: 'Your result will appear here.',
    guideTitle: 'How to use this tool',
    guideText:
      'Choose the calculation type, enter your numbers, and click calculate. This tool is useful for discounts, profits, growth, exam scores, and daily math tasks.',
    errorInvalid: 'Please enter valid numbers.',
    errorSecondZero: 'The second number cannot be zero.',
    errorFirstZero: 'The first number cannot be zero.',
    emptyState:
      'Choose a calculation type, enter your numbers, then calculate the result.',
    exampleData: {
      mode: 'percent-of-number',
      firstValue: '15',
      secondValue: '200'
    }
  },
  ar: {
    metaTitle: 'حاسبة النسبة المئوية - QuickoTools',
    metaDescription:
      'احسب النسب المئوية، واعرف كم تمثل قيمة من أخرى، واحسب نسبة الزيادة أو النقصان باستخدام أداة حاسبة النسبة المئوية المجانية من QuickoTools.',
    title: 'حاسبة النسبة المئوية',
    description:
      'احسب النسب المئوية، واعرف كم تمثل قيمة من أخرى، واحسب نسبة الزيادة أو النقصان.',
    inputTitle: 'بيانات العملية',
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
    loadExample: 'تجربة مثال',
    resultTitle: 'النتيجة',
    resultPlaceholder: 'ستظهر النتيجة هنا.',
    guideTitle: 'كيفية استخدام الأداة',
    guideText:
      'اختر نوع العملية، ثم أدخل الأرقام واضغط على احسب. هذه الأداة مفيدة للخصومات والأرباح والنمو ودرجات الاختبارات والحسابات اليومية.',
    errorInvalid: 'يرجى إدخال أرقام صحيحة.',
    errorSecondZero: 'لا يمكن أن يكون الرقم الثاني صفرًا.',
    errorFirstZero: 'لا يمكن أن يكون الرقم الأول صفرًا.',
    emptyState: 'اختر نوع العملية ثم أدخل الأرقام واضغط على احسب.',
    exampleData: {
      mode: 'percent-of-number',
      firstValue: '15',
      secondValue: '200'
    }
  }
};

function PercentageCalculator({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;

  const [mode, setMode] = useState('percent-of-number');
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const labels = useMemo(() => {
    if (mode === 'percent-of-number') {
      return {
        first: currentContent.percentage,
        second: currentContent.number
      };
    }

    if (mode === 'what-percent') {
      return {
        first: currentContent.firstNumber,
        second: currentContent.secondNumber
      };
    }

    return {
      first: currentContent.originalNumber,
      second: currentContent.newNumber
    };
  }, [mode, currentContent]);

  const handleModeChange = useCallback((event) => {
    setMode(event.target.value);
    setResult('');
    setError('');
  }, []);

  const handleFirstValueChange = useCallback((event) => {
    setFirstValue(event.target.value);
    setResult('');
    setError('');
  }, []);

  const handleSecondValueChange = useCallback((event) => {
    setSecondValue(event.target.value);
    setResult('');
    setError('');
  }, []);

  const handleCalculate = useCallback(() => {
    const first = Number(firstValue);
    const second = Number(secondValue);

    if (
      firstValue === '' ||
      secondValue === '' ||
      Number.isNaN(first) ||
      Number.isNaN(second)
    ) {
      setError(currentContent.errorInvalid);
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
        setError(currentContent.errorSecondZero);
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

    if (first === 0) {
      setError(currentContent.errorFirstZero);
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
  }, [
    firstValue,
    secondValue,
    mode,
    language,
    currentContent.errorInvalid,
    currentContent.errorSecondZero,
    currentContent.errorFirstZero
  ]);

  const handleClear = useCallback(() => {
    setMode('percent-of-number');
    setFirstValue('');
    setSecondValue('');
    setResult('');
    setError('');
  }, []);

  const handleLoadExample = useCallback(() => {
    setMode(currentContent.exampleData.mode);
    setFirstValue(currentContent.exampleData.firstValue);
    setSecondValue(currentContent.exampleData.secondValue);
    setResult('');
    setError('');
  }, [currentContent.exampleData]);

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
                disabled={!firstValue && !secondValue && !result && mode === 'percent-of-number'}
              >
                {currentContent.clear}
              </button>
            </div>
          </div>

          <div className="tool-field">
            <label className="tool-label" htmlFor="percentage-mode">
              {currentContent.calculationType}
            </label>

            <select
              id="percentage-mode"
              value={mode}
              onChange={handleModeChange}
              className="tool-input"
              aria-label={currentContent.calculationType}
            >
              <option value="percent-of-number">{currentContent.modePercentOf}</option>
              <option value="what-percent">{currentContent.modeWhatPercent}</option>
              <option value="percentage-change">{currentContent.modeChange}</option>
            </select>
          </div>

          <div className="tool-field">
            <label className="tool-label" htmlFor="percentage-first-value">
              {labels.first}
            </label>
            <input
              id="percentage-first-value"
              type="number"
              value={firstValue}
              onChange={handleFirstValueChange}
              placeholder={labels.first}
              className="tool-input"
              aria-label={labels.first}
            />
          </div>

          <div className="tool-field">
            <label className="tool-label" htmlFor="percentage-second-value">
              {labels.second}
            </label>
            <input
              id="percentage-second-value"
              type="number"
              value={secondValue}
              onChange={handleSecondValueChange}
              placeholder={labels.second}
              className="tool-input"
              aria-label={labels.second}
            />
          </div>

          <div className="tool-panel-actions tool-actions-row">
            <button
              type="button"
              onClick={handleCalculate}
              className="tool-action-button tool-action-button-primary"
            >
              {currentContent.calculate}
            </button>
          </div>

          {!firstValue && !secondValue && !error && (
            <p className="tool-helper-text">{currentContent.emptyState}</p>
          )}

          {error && (
            <p className="tool-helper-text tool-helper-text-error">{error}</p>
          )}
        </section>

        <section className="tool-panel">
          <div className="tool-panel-heading">
            <h2 className="tool-panel-title">{currentContent.resultTitle}</h2>
          </div>

          <div className="tool-result-box">
            <p
              className={`tool-result-text ${
                !result && !error ? 'tool-result-placeholder' : ''
              } ${error ? 'tool-helper-text-error' : ''}`}
            >
              {error || result || currentContent.resultPlaceholder}
            </p>
          </div>
        </section>

        <section className="tool-panel">
          <div className="tool-panel-heading">
            <h2 className="tool-panel-title">{currentContent.guideTitle}</h2>
          </div>
          <p className="tool-helper-text">{currentContent.guideText}</p>
        </section>
      </section>
    </main>
  );
}

export default PercentageCalculator;