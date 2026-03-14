import { useCallback, useMemo, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import '../../styles/tool-page.css';

const content = {
  en: {
    metaTitle: 'BMI Calculator - QuickoTools',
    metaDescription:
      'Calculate your Body Mass Index instantly using your height and weight with the free BMI Calculator from QuickoTools.',
    title: 'BMI Calculator',
    description:
      'Calculate your Body Mass Index using your height and weight instantly.',
    inputTitle: 'BMI Inputs',
    heightLabel: 'Height (cm)',
    weightLabel: 'Weight (kg)',
    heightPlaceholder: 'Enter your height in cm',
    weightPlaceholder: 'Enter your weight in kg',
    calculate: 'Calculate BMI',
    clear: 'Clear',
    loadExample: 'Load Example',
    exampleHeight: '175',
    exampleWeight: '70',
    errorInvalid: 'Please enter valid height and weight.',
    emptyState: 'Enter your height and weight, then calculate your BMI.',
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
    metaTitle: 'حاسبة مؤشر كتلة الجسم - QuickoTools',
    metaDescription:
      'احسب مؤشر كتلة الجسم فورًا باستخدام الطول والوزن عبر أداة BMI Calculator المجانية من QuickoTools.',
    title: 'حاسبة مؤشر كتلة الجسم',
    description: 'احسب مؤشر كتلة الجسم باستخدام الطول والوزن.',
    inputTitle: 'بيانات BMI',
    heightLabel: 'الطول (سم)',
    weightLabel: 'الوزن (كغ)',
    heightPlaceholder: 'أدخل طولك بالسنتيمتر',
    weightPlaceholder: 'أدخل وزنك بالكيلوغرام',
    calculate: 'احسب BMI',
    clear: 'مسح',
    loadExample: 'تجربة مثال',
    exampleHeight: '175',
    exampleWeight: '70',
    errorInvalid: 'يرجى إدخال طول ووزن صحيحين.',
    emptyState: 'أدخل الطول والوزن ثم احسب مؤشر كتلة الجسم.',
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

function BMICalculator({ language }) {
  const currentContent = language === 'ar' ? content.ar : content.en;

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  usePageMeta(currentContent.metaTitle, currentContent.metaDescription);

  const getCategory = useCallback(
    (bmi) => {
      if (bmi < 18.5) return currentContent.underweight;
      if (bmi < 25) return currentContent.normal;
      if (bmi < 30) return currentContent.overweight;
      return currentContent.obese;
    },
    [
      currentContent.underweight,
      currentContent.normal,
      currentContent.overweight,
      currentContent.obese
    ]
  );

  const getCategoryExplanation = useCallback(
    (category) => {
      const categoryMap = {
        [currentContent.underweight]:
          language === 'ar'
            ? 'إذا كانت قيمة BMI أقل من 18.5 فأنت ضمن تصنيف نقص الوزن.'
            : 'If your BMI is less than 18.5, you are considered underweight.',
        [currentContent.normal]:
          language === 'ar'
            ? 'إذا كانت قيمة BMI بين 18.5 و 24.9 فأنت ضمن الوزن الطبيعي.'
            : 'If your BMI is between 18.5 and 24.9, you are considered to have a normal weight.',
        [currentContent.overweight]:
          language === 'ar'
            ? 'إذا كانت قيمة BMI بين 25 و 29.9 فأنت ضمن تصنيف زيادة الوزن.'
            : 'If your BMI is between 25 and 29.9, you are considered overweight.',
        [currentContent.obese]:
          language === 'ar'
            ? 'إذا كانت قيمة BMI تساوي 30 أو أكثر فأنت ضمن تصنيف السمنة.'
            : 'If your BMI is 30 or more, you are considered obese.'
      };

      return categoryMap[category];
    },
    [
      language,
      currentContent.underweight,
      currentContent.normal,
      currentContent.overweight,
      currentContent.obese
    ]
  );

  const resultCards = useMemo(() => {
    if (!result) return [];

    return [
      {
        key: 'bmi',
        label: currentContent.bmi,
        value: result.bmi
      },
      {
        key: 'category',
        label: currentContent.category,
        value: result.category
      }
    ];
  }, [result, currentContent.bmi, currentContent.category]);

  const chartCards = useMemo(() => {
    return [
      {
        key: 'underweight',
        title: currentContent.underweight,
        text: currentContent.lessThan
      },
      {
        key: 'normal',
        title: currentContent.normal,
        text: currentContent.betweenNormal
      },
      {
        key: 'overweight',
        title: currentContent.overweight,
        text: currentContent.betweenOver
      },
      {
        key: 'obese',
        title: currentContent.obese,
        text: currentContent.obeseRange
      }
    ];
  }, [
    currentContent.underweight,
    currentContent.normal,
    currentContent.overweight,
    currentContent.obese,
    currentContent.lessThan,
    currentContent.betweenNormal,
    currentContent.betweenOver,
    currentContent.obeseRange
  ]);

  const handleHeightChange = useCallback((event) => {
    setHeight(event.target.value);
    setResult(null);
    setError('');
  }, []);

  const handleWeightChange = useCallback((event) => {
    setWeight(event.target.value);
    setResult(null);
    setError('');
  }, []);

  const handleCalculate = useCallback(() => {
    const heightValue = Number(height);
    const weightValue = Number(weight);

    if (!heightValue || !weightValue || heightValue <= 0 || weightValue <= 0) {
      setError(currentContent.errorInvalid);
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
  }, [
    height,
    weight,
    currentContent.errorInvalid,
    getCategory,
    getCategoryExplanation
  ]);

  const handleLoadExample = useCallback(() => {
    setHeight(currentContent.exampleHeight);
    setWeight(currentContent.exampleWeight);
    setResult(null);
    setError('');
  }, [currentContent.exampleHeight, currentContent.exampleWeight]);

  const handleClear = useCallback(() => {
    setHeight('');
    setWeight('');
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
                disabled={!height && !weight && !result}
              >
                {currentContent.clear}
              </button>
            </div>
          </div>

          <div className="tool-field">
            <label className="tool-label" htmlFor="bmi-height">
              {currentContent.heightLabel}
            </label>
            <input
              id="bmi-height"
              type="number"
              value={height}
              onChange={handleHeightChange}
              placeholder={currentContent.heightPlaceholder}
              className="tool-input"
              aria-label={currentContent.heightLabel}
            />
          </div>

          <div className="tool-field">
            <label className="tool-label" htmlFor="bmi-weight">
              {currentContent.weightLabel}
            </label>
            <input
              id="bmi-weight"
              type="number"
              value={weight}
              onChange={handleWeightChange}
              placeholder={currentContent.weightPlaceholder}
              className="tool-input"
              aria-label={currentContent.weightLabel}
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

          {!height && !weight && !error && (
            <p className="tool-helper-text">{currentContent.emptyState}</p>
          )}

          {error && (
            <p className="tool-helper-text tool-helper-text-error">{error}</p>
          )}
        </section>

        {result && (
          <>
            <section className="tool-stats-grid">
              {resultCards.map((item) => (
                <div key={item.key} className="tool-stat-card">
                  <h2 className="tool-stat-label">{item.label}</h2>
                  <p className="tool-stat-value">{item.value}</p>
                </div>
              ))}
            </section>

            <section className="tool-panel">
              <div className="tool-panel-heading">
                <h2 className="tool-panel-title">{currentContent.healthyRange}</h2>
              </div>
              <p className="tool-helper-text">
                {currentContent.healthyRangeText} {result.healthyWeightRange}
              </p>
            </section>

            <section className="tool-panel">
              <div className="tool-panel-heading">
                <h2 className="tool-panel-title">{currentContent.meaning}</h2>
              </div>
              <p className="tool-helper-text">{result.explanation}</p>
            </section>

            <section className="tool-panel">
              <div className="tool-panel-heading">
                <h2 className="tool-panel-title">{currentContent.chart}</h2>
              </div>

              <div className="tool-info-grid">
                {chartCards.map((item) => (
                  <div key={item.key} className="tool-info-card">
                    <h3 className="tool-info-title">{item.title}</h3>
                    <p className="tool-info-text">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        <section className="tool-panel">
          <div className="tool-panel-heading">
            <h2 className="tool-panel-title">{currentContent.about}</h2>
          </div>
          <p className="tool-helper-text">{currentContent.aboutText}</p>
        </section>
      </section>
    </main>
  );
}

export default BMICalculator;