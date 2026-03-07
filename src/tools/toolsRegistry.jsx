import { lazy } from 'react';

const WordCounter = lazy(() => import('./WordCounter'));
const CharacterCounter = lazy(() => import('./CharacterCounter'));
const PasswordGenerator = lazy(() => import('./PasswordGenerator'));
const QRCodeGenerator = lazy(() => import('./QRCodeGenerator'));
const TextCaseConverter = lazy(() => import('./TextCaseConverter'));
const RemoveDuplicateLines = lazy(() => import('./RemoveDuplicateLines'));
const AgeCalculator = lazy(() => import('./AgeCalculator'));
const BMICalculator = lazy(() => import('./BMICalculator'));
const PercentageCalculator = lazy(() => import('./PercentageCalculator'));
const JSONFormatter = lazy(() => import('./JSONFormatter'));
const SlugGenerator = lazy(() => import('./SlugGenerator'));

const toolsRegistry = [
  {
    name: 'Word Counter',
    nameAr: 'عداد الكلمات',
    path: '/word-counter',
    description: 'Count words and characters in your text.',
    descriptionAr: 'احسب عدد الكلمات والأحرف في النص.',
    component: WordCounter
  },
  {
    name: 'Character Counter',
    nameAr: 'عداد الأحرف',
    path: '/character-counter',
    description: 'Count characters in your text instantly.',
    descriptionAr: 'احسب عدد الأحرف في النص فورًا.',
    component: CharacterCounter
  },
  {
    name: 'Password Generator',
    nameAr: 'مولد كلمات المرور',
    path: '/password-generator',
    description: 'Generate strong random passwords.',
    descriptionAr: 'أنشئ كلمات مرور قوية وعشوائية.',
    component: PasswordGenerator
  },
  {
    name: 'QR Code Generator',
    nameAr: 'مولد QR Code',
    path: '/qr-code-generator',
    description: 'Convert text or links into QR codes.',
    descriptionAr: 'حوّل النص أو الروابط إلى رمز QR.',
    component: QRCodeGenerator
  },
  {
    name: 'Text Case Converter',
    nameAr: 'تحويل حالة النص',
    path: '/text-case-converter',
    description: 'Convert text to uppercase, lowercase or capitalize.',
    descriptionAr: 'حوّل النص إلى أحرف كبيرة أو صغيرة أو بصيغة العنوان.',
    component: TextCaseConverter
  },
  {
    name: 'Remove Duplicate Lines',
    nameAr: 'إزالة الأسطر المكررة',
    path: '/remove-duplicate-lines',
    description: 'Remove duplicate lines from your text.',
    descriptionAr: 'أزل الأسطر المكررة من النص.',
    component: RemoveDuplicateLines
  },
  {
    name: 'Age Calculator',
    nameAr: 'حاسبة العمر',
    path: '/age-calculator',
    description: 'Calculate age from date of birth.',
    descriptionAr: 'احسب العمر من تاريخ الميلاد.',
    component: AgeCalculator
  },
  {
    name: 'BMI Calculator',
    nameAr: 'حاسبة مؤشر كتلة الجسم',
    path: '/bmi-calculator',
    description: 'Calculate your Body Mass Index.',
    descriptionAr: 'احسب مؤشر كتلة الجسم الخاص بك.',
    component: BMICalculator
  },
  {
    name: 'Percentage Calculator',
    nameAr: 'حاسبة النسبة المئوية',
    path: '/percentage-calculator',
    description: 'Calculate percentages quickly.',
    descriptionAr: 'احسب النسب المئوية بسرعة.',
    component: PercentageCalculator
  },
  {
    name: 'JSON Formatter',
    nameAr: 'منسق JSON',
    path: '/json-formatter',
    description: 'Format and beautify JSON code.',
    descriptionAr: 'نسّق JSON واجعله أوضح وأسهل للقراءة.',
    component: JSONFormatter
  },
  {
  name: 'Slug Generator',
  nameAr: 'مولد Slug',
  path: '/slug-generator',
  description: 'Convert text into a clean URL-friendly slug.',
  descriptionAr: 'حوّل النص إلى رابط URL نظيف وسهل القراءة.',
  component: SlugGenerator
},
  
];

export default toolsRegistry;