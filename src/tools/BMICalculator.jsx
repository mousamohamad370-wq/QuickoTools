import { useState } from 'react';

function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const getCategory = (bmi) => {
    if (bmi < 18.5) {
      return 'Underweight';
    }

    if (bmi < 25) {
      return 'Normal weight';
    }

    if (bmi < 30) {
      return 'Overweight';
    }

    return 'Obese';
  };

  const getCategoryExplanation = (category) => {
    if (category === 'Underweight') {
      return 'If your BMI is less than 18.5, you are considered underweight.';
    }

    if (category === 'Normal weight') {
      return 'If your BMI is between 18.5 and 24.9, you are considered to have a normal weight.';
    }

    if (category === 'Overweight') {
      return 'If your BMI is between 25 and 29.9, you are considered overweight.';
    }

    return 'If your BMI is 30 or more, you are considered obese.';
  };

  const calculateBMI = () => {
    const heightValue = Number(height);
    const weightValue = Number(weight);

    if (!heightValue || !weightValue || heightValue <= 0 || weightValue <= 0) {
      setError('Please enter valid height and weight');
      setResult(null);
      return;
    }

    const heightInMeters = heightValue / 100;
    const bmi = weightValue / (heightInMeters * heightInMeters);
    const category = getCategory(bmi);

    const healthyMinWeight = 18.5 * (heightInMeters * heightInMeters);
    const healthyMaxWeight = 24.9 * (heightInMeters * heightInMeters);

    setError('');
    setResult({
      bmi: bmi.toFixed(1),
      category,
      explanation: getCategoryExplanation(category),
      healthyWeightRange: `${healthyMinWeight.toFixed(1)} kg – ${healthyMaxWeight.toFixed(1)} kg`
    });
  };

  const clearFields = () => {
    setHeight('');
    setWeight('');
    setResult(null);
    setError('');
  };

  return (
    <main className="tool-page">
      <div className="tool-container">
        <h1 className="tool-page-title">BMI Calculator</h1>

        <p className="tool-page-description">
          Calculate your Body Mass Index using your height and weight.
        </p>

        <div className="tool-box">
          <label className="tool-label">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            placeholder="Enter your height in cm"
            className="tool-input"
            style={{ marginBottom: '16px' }}
          />

          <label className="tool-label">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            placeholder="Enter your weight in kg"
            className="tool-input"
            style={{ marginBottom: '20px' }}
          />

          <div className="tool-actions">
            <button
              type="button"
              onClick={calculateBMI}
              className="tool-primary-button"
            >
              Calculate BMI
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
                <h2 className="result-card-title">BMI</h2>
                <p className="result-card-value">{result.bmi}</p>
              </div>

              <div className="result-card">
                <h2 className="result-card-title">Category</h2>
                <p className="result-card-value">{result.category}</p>
              </div>
            </div>

            <div className="tool-box tool-section">
              <h2 className="tool-section-title">Healthy Weight Range</h2>
              <p className="tool-text">
                Healthy weight range for your height: {result.healthyWeightRange}
              </p>
            </div>

            <div className="tool-box tool-section">
              <h2 className="tool-section-title">What Your Result Means</h2>
              <p className="tool-text">
                {result.explanation}
              </p>
            </div>

            <div className="tool-box tool-section">
              <h2 className="tool-section-title">BMI Classification Chart</h2>

              <div className="bmi-chart-grid">
                <div className="bmi-info-card">
                  <h3 className="result-card-title">Underweight</h3>
                  <p className="tool-text">Less than 18.5</p>
                </div>

                <div className="bmi-info-card">
                  <h3 className="result-card-title">Normal weight</h3>
                  <p className="tool-text">18.5 – 24.9</p>
                </div>

                <div className="bmi-info-card">
                  <h3 className="result-card-title">Overweight</h3>
                  <p className="tool-text">25 – 29.9</p>
                </div>

                <div className="bmi-info-card">
                  <h3 className="result-card-title">Obese</h3>
                  <p className="tool-text">30 or more</p>
                </div>
              </div>
            </div>

            <div className="tool-box tool-section">
              <h2 className="tool-section-title">About BMI</h2>
              <p className="tool-text">
                BMI is a simple indicator based on your height and weight. It can
                help you understand whether your weight is generally lower,
                normal, or higher than the common healthy range. However, BMI is
                only an estimate and does not replace medical advice.
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default BMICalculator;