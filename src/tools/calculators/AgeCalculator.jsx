import { useCallback, useMemo, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'Age Calculator - QuickoTools',
    metaDescription:
      'Calculate age from date of birth instantly with extra details like years, months, days, weeks, hours, minutes, and next birthday.',
    title: 'Age Calculator',
    description:
      'Calculate age from date of birth instantly with extra details like weeks, hours, minutes, and next birthday.',
    inputTitle: 'Birth Date',
    label: 'Date of Birth',
    placeholder: 'Select your date of birth',
    useToday: 'Use Today',
    calculate: 'Calculate Age',
    clear: 'Clear',
    loadExample: 'Load Example',
    exampleValue: '2000-01-15',
    errorEmpty: 'Please select your date of birth.',
    errorFuture: 'Date of birth cannot be in the future.',
    emptyState: 'Select a birth date, then calculate your age.',
    infoTitle: 'What does this calculator show?',
    infoText:
      'This age calculator shows your age in years, months, and days, along with total days, weeks, hours, minutes, and the number of days until your next birthday.',
    years: 'Years',
    months: 'Months',
    days: 'Days',
    totalDays: 'Total Days',
    weeks: 'Weeks',
    hours: 'Hours',
    minutes: 'Minutes',
    nextBirthday: 'Next Birthday In',
    daysSuffix: 'Days'
  },
  ar: {
    metaTitle: 'حاسبة العمر - QuickoTools',
    metaDescription:
      'احسب العمر من تاريخ الميلاد فورًا مع تفاصيل إضافية مثل السنوات والأشهر والأيام والأسابيع والساعات والدقائق وموعد عيد الميلاد القادم.',
    title: 'حاسبة العمر',
    description:
      'احسب العمر من تاريخ الميلاد فورًا مع تفاصيل إضافية مثل الأسابيع والساعات والدقائق وموعد عيد الميلاد القادم.',
    inputTitle: 'تاريخ الميلاد',
    label: 'تاريخ الميلاد',
    placeholder: 'اختر تاريخ الميلاد',
    useToday: 'استخدم تاريخ اليوم',
    calculate: 'احسب العمر',
    clear: 'مسح',
    loadExample: 'تجربة مثال',
    exampleValue: '2000-01-15',
    errorEmpty: 'يرجى اختيار تاريخ الميلاد.',
    errorFuture: 'لا يمكن أن يكون تاريخ الميلاد في المستقبل.',
    emptyState: 'اختر تاريخ الميلاد ثم احسب العمر.',
    infoTitle: 'ماذا تعرض هذه الحاسبة؟',
    infoText:
      'تعرض هذه الحاسبة العمر بالسنوات والأشهر والأيام، بالإضافة إلى إجمالي الأيام والأسابيع والساعات والدقائق وعدد الأيام المتبقية حتى عيد الميلاد القادم.',
    years: 'السنوات',
    months: 'الأشهر',
    days: 'الأيام',
    totalDays: 'إجمالي الأيام',
    weeks: 'الأسابيع',
    hours: 'الساعات',
    minutes: 'الدقائق',
    nextBirthday: 'عيد الميلاد القادم بعد',
    daysSuffix: 'يوم'
  }
};

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

function calculateNextBirthdayDays(dob, today) {
  const currentYear = today.getFullYear();
  let nextBirthday = new Date(currentYear, dob.getMonth(), dob.getDate());

  if (nextBirthday < today) {
    nextBirthday = new Date(currentYear + 1, dob.getMonth(), dob.getDate());
  }

  const oneDay = 1000 * 60 * 60 * 24;
  const diffTime = nextBirthday.getTime() - today.getTime();

  return Math.ceil(diffTime / oneDay);
}

function AgeCalculator({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;

  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const resultCards = useMemo(() => {
    if (!result) return [];

    return [
      {
        key: 'years',
        label: currentContent.years,
        value: result.years
      },
      {
        key: 'months',
        label: currentContent.months,
        value: result.months
      },
      {
        key: 'days',
        label: currentContent.days,
        value: result.days
      },
      {
        key: 'totalDays',
        label: currentContent.totalDays,
        value: result.totalDays
      },
      {
        key: 'weeks',
        label: currentContent.weeks,
        value: result.weeks
      },
      {
        key: 'hours',
        label: currentContent.hours,
        value: result.hours
      },
      {
        key: 'minutes',
        label: currentContent.minutes,
        value: result.minutes
      },
      {
        key: 'nextBirthday',
        label: currentContent.nextBirthday,
        value: `${result.nextBirthdayDays} ${currentContent.daysSuffix}`
      }
    ];
  }, [result, currentContent]);

  const handleDateChange = useCallback((event) => {
    setBirthDate(event.target.value);
    setError('');
    setResult(null);
  }, []);

  const handleCalculate = useCallback(() => {
    if (!birthDate) {
      setError(currentContent.errorEmpty);
      setResult(null);
      return;
    }

    const today = new Date();
    const dob = new Date(birthDate);

    today.setHours(0, 0, 0, 0);
    dob.setHours(0, 0, 0, 0);

    if (dob > today) {
      setError(currentContent.errorFuture);
      setResult(null);
      return;
    }

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
      months -= 1;

      const previousMonthDays = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();

      days += previousMonthDays;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.floor(
      (today.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24)
    );

    const weeks = Math.floor(totalDays / 7);
    const hours = totalDays * 24;
    const minutes = hours * 60;
    const nextBirthdayDays = calculateNextBirthdayDays(dob, today);

    setError('');
    setResult({
      years,
      months,
      days,
      totalDays,
      weeks,
      hours,
      minutes,
      nextBirthdayDays
    });
  }, [birthDate, currentContent.errorEmpty, currentContent.errorFuture]);

  const handleUseToday = useCallback(() => {
    setBirthDate(getTodayDate());
    setError('');
    setResult(null);
  }, []);

  const handleLoadExample = useCallback(() => {
    setBirthDate(currentContent.exampleValue);
    setError('');
    setResult(null);
  }, [currentContent.exampleValue]);

  const handleClear = useCallback(() => {
    setBirthDate('');
    setResult(null);
    setError('');
  }, []);

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
                disabled={!birthDate && !result}
              >
                {currentContent.clear}
              </button>
            </div>
          </div>

          <div className="tool-field">
            <label className="tool-label" htmlFor="age-calculator-date">
              {currentContent.label}
            </label>

            <input
              id="age-calculator-date"
              type="date"
              value={birthDate}
              onChange={handleDateChange}
              className="tool-input"
              aria-label={currentContent.label}
            />
          </div>

          <div className="tool-panel-actions tool-actions-row">
            <button
              type="button"
              className="tool-action-button tool-action-button-primary"
              onClick={handleCalculate}
            >
              {currentContent.calculate}
            </button>

            <button
              type="button"
              className="tool-action-button tool-action-button-secondary"
              onClick={handleUseToday}
            >
              {currentContent.useToday}
            </button>
          </div>

          {!birthDate && !error && (
            <p className="tool-helper-text">{currentContent.emptyState}</p>
          )}

          {error && (
            <p className="tool-helper-text tool-helper-text-error">{error}</p>
          )}
        </section>

        {result && (
          <section className="tool-stats-grid">
            {resultCards.map((item) => (
              <div key={item.key} className="tool-stat-card">
                <h2 className="tool-stat-label">{item.label}</h2>
                <p className="tool-stat-value">{item.value}</p>
              </div>
            ))}
          </section>
        )}

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

export default AgeCalculator;