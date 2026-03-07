import { useState } from 'react';

function PercentageCalculator() {
  const [mode, setMode] = useState('percent-of-number');
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const calculateResult = () => {
    const first = Number(firstValue);
    const second = Number(secondValue);

    if (firstValue === '' || secondValue === '' || Number.isNaN(first) || Number.isNaN(second)) {
      setError('Please enter valid numbers');
      setResult('');
      return;
    }

    if (mode === 'percent-of-number') {
      const value = (first / 100) * second;
      setResult(`${first}% of ${second} = ${value.toFixed(2)}`);
      setError('');
      return;
    }

    if (mode === 'what-percent') {
      if (second === 0) {
        setError('The second number cannot be zero');
        setResult('');
        return;
      }

      const value = (first / second) * 100;
      setResult(`${first} is ${value.toFixed(2)}% of ${second}`);
      setError('');
      return;
    }

    if (mode === 'percentage-change') {
      if (first === 0) {
        setError('The first number cannot be zero');
        setResult('');
        return;
      }

      const value = ((second - first) / first) * 100;
      const label = value >= 0 ? 'increase' : 'decrease';

      setResult(
        `Percentage ${label} from ${first} to ${second} = ${Math.abs(value).toFixed(2)}%`
      );
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
        first: 'Percentage (%)',
        second: 'Number',
        title: 'What is X% of Y'
      };
    }

    if (mode === 'what-percent') {
      return {
        first: 'First Number',
        second: 'Second Number',
        title: 'X is what percent of Y'
      };
    }

    return {
      first: 'Original Number',
      second: 'New Number',
      title: 'Percentage increase or decrease'
    };
  };

  const labels = getLabels();

  return (
    <main className="tool-page">
      <div className="tool-container">
        <h1 className="tool-page-title">Percentage Calculator</h1>

        <p className="tool-page-description">
          Calculate percentages, find what percent one number is of another,
          and measure percentage increase or decrease.
        </p>

        <div className="tool-box">
          <label className="tool-label">Calculation Type</label>
          <select
            value={mode}
            onChange={(event) => setMode(event.target.value)}
            className="tool-input"
            style={{ marginBottom: '20px' }}
          >
            <option value="percent-of-number">What is X% of Y</option>
            <option value="what-percent">X is what percent of Y</option>
            <option value="percentage-change">Percentage increase or decrease</option>
          </select>

          <label className="tool-label">{labels.first}</label>
          <input
            type="number"
            value={firstValue}
            onChange={(event) => setFirstValue(event.target.value)}
            placeholder={`Enter ${labels.first.toLowerCase()}`}
            className="tool-input"
            style={{ marginBottom: '16px' }}
          />

          <label className="tool-label">{labels.second}</label>
          <input
            type="number"
            value={secondValue}
            onChange={(event) => setSecondValue(event.target.value)}
            placeholder={`Enter ${labels.second.toLowerCase()}`}
            className="tool-input"
            style={{ marginBottom: '20px' }}
          />

          <div className="tool-actions">
            <button
              type="button"
              onClick={calculateResult}
              className="tool-primary-button"
            >
              Calculate
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
          <>
            <div className="age-results-grid age-results-show">
              <div className="result-card">
                <h2 className="result-card-title">Result</h2>
                <p className="result-card-value" style={{ fontSize: '22px' }}>
                  {result}
                </p>
              </div>
            </div>

            <div className="tool-box tool-section">
              <h2 className="tool-section-title">How to use this tool</h2>
              <p className="tool-text">
                Choose the calculation type, enter your numbers, and click
                calculate. This tool is useful for discounts, profits, growth,
                exam scores, and daily math tasks.
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default PercentageCalculator;