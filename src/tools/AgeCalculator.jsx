import { useState } from 'react';

function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const calculateNextBirthdayDays = (dob, today) => {
    const currentYear = today.getFullYear();

    let nextBirthday = new Date(
      currentYear,
      dob.getMonth(),
      dob.getDate()
    );

    if (nextBirthday < today) {
      nextBirthday = new Date(
        currentYear + 1,
        dob.getMonth(),
        dob.getDate()
      );
    }

    const oneDay = 1000 * 60 * 60 * 24;
    const diffTime = nextBirthday.getTime() - today.getTime();

    return Math.ceil(diffTime / oneDay);
  };

  const calculateAge = () => {
    if (!birthDate) {
      setError('Please select your date of birth');
      setResult(null);
      return;
    }

    const today = new Date();
    const dob = new Date(birthDate);

    today.setHours(0, 0, 0, 0);
    dob.setHours(0, 0, 0, 0);

    if (dob > today) {
      setError('Date of birth cannot be in the future.');
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
    <main className="tool-page">
      <div className="tool-container">
        <h1 className="tool-page-title">Age Calculator</h1>

        <p className="tool-page-description">
          Calculate age from date of birth instantly with extra details like
          weeks, hours, minutes, and next birthday.
        </p>

        <div className="tool-box">
          <label className="tool-label">Date of Birth</label>

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
              Use Today
            </button>
          </div>

          <div className="tool-actions">
            <button
              type="button"
              onClick={calculateAge}
              className="tool-primary-button"
            >
              Calculate Age
            </button>

            <button
              type="button"
              onClick={clearFields}
              className="tool-secondary-button"
            >
              Clear
            </button>
          </div>
        </div>

        {error && (
          <div className="tool-error-message">
            {error}
          </div>
        )}

        {result && (
          <div className="age-results-grid age-results-show">
            <div className="result-card">
              <h2 className="result-card-title">Years</h2>
              <p className="result-card-value">{result.years}</p>
            </div>

            <div className="result-card">
              <h2 className="result-card-title">Months</h2>
              <p className="result-card-value">{result.months}</p>
            </div>

            <div className="result-card">
              <h2 className="result-card-title">Days</h2>
              <p className="result-card-value">{result.days}</p>
            </div>

            <div className="result-card">
              <h2 className="result-card-title">Total Days</h2>
              <p className="result-card-value">{result.totalDays}</p>
            </div>

            <div className="result-card">
              <h2 className="result-card-title">Weeks</h2>
              <p className="result-card-value">{result.weeks}</p>
            </div>

            <div className="result-card">
              <h2 className="result-card-title">Hours</h2>
              <p className="result-card-value">{result.hours}</p>
            </div>

            <div className="result-card">
              <h2 className="result-card-title">Minutes</h2>
              <p className="result-card-value">{result.minutes}</p>
            </div>

            <div className="result-card">
              <h2 className="result-card-title">Next Birthday In</h2>
              <p className="result-card-value">{result.nextBirthdayDays} Days</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default AgeCalculator;