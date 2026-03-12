import { useState } from 'react';

function AgeCalculator({ language }) {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const content = {
    en: {
      title: 'Age Calculator',
      description:
        'Calculate age from date of birth instantly with extra details like weeks, hours, minutes, and next birthday.',
      label: 'Date of Birth',
      useToday: 'Use Today',
      calculate: 'Calculate Age',
      clear: 'Clear',
      errorEmpty: 'Please select your date of birth',
      errorFuture: 'Date of birth cannot be in the future.',
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
      title: 'حاسبة العمر',
      description:
        'احسب العمر من تاريخ الميلاد فورًا مع تفاصيل إضافية مثل الأسابيع والساعات والدقائق وموعد عيد الميلاد القادم.',
      label: 'تاريخ الميلاد',
      useToday: 'استخدم تاريخ اليوم',
      calculate: 'احسب العمر',
      clear: 'مسح',
      errorEmpty: 'يرجى اختيار تاريخ الميلاد',
      errorFuture: 'لا يمكن أن يكون تاريخ الميلاد في المستقبل.',
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

  const t = language === 'ar' ? content.ar : content.en;

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const calculateNextBirthdayDays = (dob, today) => {
    const currentYear = today.getFullYear();

    let nextBirthday = new Date(currentYear, dob.getMonth(), dob.getDate());

    if (nextBirthday < today) {
      nextBirthday = new Date(currentYear + 1, dob.getMonth(), dob.getDate());
    }

    const oneDay = 1000 * 60 * 60 * 24;
    const diffTime = nextBirthday.getTime() - today.getTime();

    return Math.ceil(diffTime / oneDay);
  };

  const calculateAge = () => {
    if (!birthDate) {
      setError(t.errorEmpty);
      setResult(null);
      return;
    }

    const today = new Date();
    const dob = new Date(birthDate);

    today.setHours(0, 0, 0, 0);
    dob.setHours(0, 0, 0, 0);

    if (dob > today) {
      setError(t.errorFuture);
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
  };

  const handleUseToday = () => {
    setBirthDate(getTodayDate());
    setError('');
  };

  const clearFields = () => {
    setBirthDate('');
    setResult(null);
    setError('');
  };

  return (
    <main className="tool-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="tool-container">
        <h1 className="tool-page-title">{t.title}</h1>

        <p className="tool-page-description">{t.description}</p>

        <div className="tool-box">
          <label className="tool-label">{t.label}</label>

          <div className="age-input-row">
            <input
              type="date"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              className="tool-input"
            />

            <button
              type="button"
              onClick={handleUseToday}
              className="tool-secondary-button age-use-today-button"
            >
              {t.useToday}
            </button>
          </div>

          <div className="tool-actions">
            <button
              type="button"
              onClick={calculateAge}
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
          <div className="age-results-grid age-results-show">
            <div className="result-card">
              <h2 className="result-card-title">{t.years}</h2>
              <p className="result-card-value">{result.years}</p>
            </div>

            <div className="result-card">
              <h2 className="result-card-title">{t.months}</h2>
              <p className="result-card-value">{result.months}</p>
            </div>

            <div className="result-card">
              <h2 className="result-card-title">{t.days}</h2>
              <p className="result-card-value">{result.days}</p>
            </div>

            <div className="result-card">
              <h2 className="result-card-title">{t.totalDays}</h2>
              <p className="result-card-value">{result.totalDays}</p>
            </div>

            <div className="result-card">
              <h2 className="result-card-title">{t.weeks}</h2>
              <p className="result-card-value">{result.weeks}</p>
            </div>

            <div className="result-card">
              <h2 className="result-card-title">{t.hours}</h2>
              <p className="result-card-value">{result.hours}</p>
            </div>

            <div className="result-card">
              <h2 className="result-card-title">{t.minutes}</h2>
              <p className="result-card-value">{result.minutes}</p>
            </div>

            <div className="result-card">
              <h2 className="result-card-title">{t.nextBirthday}</h2>
              <p className="result-card-value">
                {result.nextBirthdayDays} {t.daysSuffix}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default AgeCalculator;