import { useState } from 'react';

function BMICalculator({ language }) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const content = {
    en: {
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index using your height and weight.',
      heightLabel: 'Height (cm)',
      weightLabel: 'Weight (kg)',
      heightPlaceholder: 'Enter your height in cm',
      weightPlaceholder: 'Enter your weight in kg',
      calculate: 'Calculate BMI',
      clear: 'Clear',
      errorInvalid: 'Please enter valid height and weight',
      bmi: 'BMI',
      category: 'Category',
      healthyRange: 'Healthy Weight Range',
      healthyRangeText: 'Healthy weight range for your height:',
      meaning: 'What Your Result Means',
      chart: 'BMI Classification Chart',
      about: 'About BMI',
      aboutText:
        'BMI is a simple indicator based on your height and weight. It can help you understand whether your weight is generally lower, normal, or higher than the common healthy range. However, BMI is only an estimate and does not replace medical advice.',
      underweight: 'Underweight',
      normal: 'Normal weight',
      overweight: 'Overweight',
      obese: 'Obese',
      lessThan: 'Less than 18.5',
      betweenNormal: '18.5 – 24.9',
      betweenOver: '25 – 29.9',
      obeseRange: '30 or more'
    },
    ar: {
      title: 'حاسبة مؤشر كتلة الجسم',
      description: 'احسب مؤشر كتلة الجسم باستخدام الطول والوزن.',
      heightLabel: 'الطول (سم)',
      weightLabel: 'الوزن (كغ)',
      heightPlaceholder: 'أدخل طولك بالسنتيمتر',
      weightPlaceholder: 'أدخل وزنك بالكيلوغرام',
      calculate: 'احسب BMI',
      clear: 'مسح',
      errorInvalid: 'يرجى إدخال طول ووزن صحيحين',
      bmi: 'مؤشر الكتلة',
      category: 'التصنيف',
      healthyRange: 'الوزن الصحي المناسب',
      healthyRangeText: 'الوزن الصحي المناسب لطولك:',
      meaning: 'ماذا تعني هذه النتيجة',
      chart: 'جدول تصنيفات BMI',
      about: 'حول BMI',
      aboutText:
        'مؤشر كتلة الجسم هو مقياس بسيط يعتمد على الطول والوزن. يساعدك على فهم ما إذا كان وزنك أقل أو ضمن أو أعلى من النطاق الصحي المعتاد. لكنه يبقى تقديرًا تقريبيًا ولا يغني عن الاستشارة الطبية.',
      underweight: 'نقص وزن',
      normal: 'وزن طبيعي',
      overweight: 'زيادة وزن',
      obese: 'سمنة',
      lessThan: 'أقل من 18.5',
      betweenNormal: '18.5 – 24.9',
      betweenOver: '25 – 29.9',
      obeseRange: '30 أو أكثر'
    }
  };

  const t = language === 'ar' ? content.ar : content.en;

  const getCategory = (bmi) => {
    if (bmi < 18.5) {
      return language === 'ar' ? t.underweight : 'Underweight';
    }

    if (bmi < 25) {
      return language === 'ar' ? t.normal : 'Normal weight';
    }

    if (bmi < 30) {
      return language === 'ar' ? t.overweight : 'Overweight';
    }

    return language === 'ar' ? t.obese : 'Obese';
  };

  const getCategoryExplanation = (category) => {
    const categoryMap = {
      [t.underweight]:
        language === 'ar'
          ? 'إذا كانت قيمة BMI أقل من 18.5 فأنت ضمن تصنيف نقص الوزن.'
          : 'If your BMI is less than 18.5, you are considered underweight.',
      [t.normal]:
        language === 'ar'
          ? 'إذا كانت قيمة BMI بين 18.5 و 24.9 فأنت ضمن الوزن الطبيعي.'
          : 'If your BMI is between 18.5 and 24.9, you are considered to have a normal weight.',
      [t.overweight]:
        language === 'ar'
          ? 'إذا كانت قيمة BMI بين 25 و 29.9 فأنت ضمن تصنيف زيادة الوزن.'
          : 'If your BMI is between 25 and 29.9, you are considered overweight.',
      [t.obese]:
        language === 'ar'
          ? 'إذا كانت قيمة BMI تساوي 30 أو أكثر فأنت ضمن تصنيف السمنة.'
          : 'If your BMI is 30 or more, you are considered obese.'
    };

    return categoryMap[category];
  };

  const calculateBMI = () => {
    const heightValue = Number(height);
    const weightValue = Number(weight);

    if (!heightValue || !weightValue || heightValue <= 0 || weightValue <= 0) {
      setError(t.errorInvalid);
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
    <main className="tool-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="tool-container">
        <h1 className="tool-page-title">{t.title}</h1>

        <p className="tool-page-description">
          {t.description}
        </p>

        <div className="tool-box">
          <label className="tool-label">{t.heightLabel}</label>
          <input
            type="number"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            placeholder={t.heightPlaceholder}
            className="tool-input"
            style={{ marginBottom: '16px' }}
          />

          <label className="tool-label">{t.weightLabel}</label>
          <input
            type="number"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            placeholder={t.weightPlaceholder}
            className="tool-input"
            style={{ marginBottom: '20px' }}
          />

          <div className="tool-actions">
            <button
              type="button"
              onClick={calculateBMI}
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

        {error && (
          <div className="tool-error-message">
            {error}
          </div>
        )}

        {result && (
          <>
            <div className="age-results-grid age-results-show">
              <div className="result-card">
                <h2 className="result-card-title">{t.bmi}</h2>
                <p className="result-card-value">{result.bmi}</p>
              </div>

              <div className="result-card">
                <h2 className="result-card-title">{t.category}</h2>
                <p className="result-card-value">{result.category}</p>
              </div>
            </div>

            <div className="tool-box tool-section">
              <h2 className="tool-section-title">{t.healthyRange}</h2>
              <p className="tool-text">
                {t.healthyRangeText} {result.healthyWeightRange}
              </p>
            </div>

            <div className="tool-box tool-section">
              <h2 className="tool-section-title">{t.meaning}</h2>
              <p className="tool-text">
                {result.explanation}
              </p>
            </div>

            <div className="tool-box tool-section">
              <h2 className="tool-section-title">{t.chart}</h2>

              <div className="bmi-chart-grid">
                <div className="bmi-info-card">
                  <h3 className="result-card-title">{t.underweight}</h3>
                  <p className="tool-text">{t.lessThan}</p>
                </div>

                <div className="bmi-info-card">
                  <h3 className="result-card-title">{t.normal}</h3>
                  <p className="tool-text">{t.betweenNormal}</p>
                </div>

                <div className="bmi-info-card">
                  <h3 className="result-card-title">{t.overweight}</h3>
                  <p className="tool-text">{t.betweenOver}</p>
                </div>

                <div className="bmi-info-card">
                  <h3 className="result-card-title">{t.obese}</h3>
                  <p className="tool-text">{t.obeseRange}</p>
                </div>
              </div>
            </div>

            <div className="tool-box tool-section">
              <h2 className="tool-section-title">{t.about}</h2>
              <p className="tool-text">
                {t.aboutText}
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default BMICalculator;