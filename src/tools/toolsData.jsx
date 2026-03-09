const toolsData = [
  {
    name: 'Word Counter',
    nameAr: 'عداد الكلمات',
    path: '/word-counter',
    description: 'Count words and characters in your text.',
    descriptionAr: 'احسب عدد الكلمات والأحرف في النص.',
    category: 'text-tools'
  },
  {
    name: 'Character Counter',
    nameAr: 'عداد الأحرف',
    path: '/character-counter',
    description: 'Count characters in your text instantly.',
    descriptionAr: 'احسب عدد الأحرف في النص فورًا.',
    category: 'text-tools'
  },
  {
    name: 'Password Generator',
    nameAr: 'مولد كلمات المرور',
    path: '/password-generator',
    description: 'Generate strong random passwords.',
    descriptionAr: 'أنشئ كلمات مرور قوية وعشوائية.',
    category: 'generators'
  },
  {
    name: 'QR Code Generator',
    nameAr: 'مولد QR Code',
    path: '/qr-code-generator',
    description: 'Convert text or links into QR codes.',
    descriptionAr: 'حوّل النص أو الروابط إلى رمز QR.',
    category: 'generators'
  },
  {
    name: 'Text Case Converter',
    nameAr: 'تحويل حالة النص',
    path: '/text-case-converter',
    description: 'Convert text to uppercase, lowercase or capitalize.',
    descriptionAr: 'حوّل النص إلى أحرف كبيرة أو صغيرة أو بصيغة العنوان.',
    category: 'converters'
  },
  {
  name: "Roman Numeral Converter",
  nameAr: "محول الأرقام الرومانية",
  path: "/roman-numeral-converter",
  description: "Convert numbers to Roman numerals or Roman numerals back to numbers instantly.",
  descriptionAr: "حوّل الأرقام إلى أرقام رومانية أو حوّل الأرقام الرومانية إلى أرقام عادية فورًا.",
  category: "converters"
},
  {
    name: 'Remove Duplicate Lines',
    nameAr: 'إزالة الأسطر المكررة',
    path: '/remove-duplicate-lines',
    description: 'Remove duplicate lines from your text.',
    descriptionAr: 'أزل الأسطر المكررة من النص.',
    category: 'text-tools'
  },
  {
  name: "Text Repeater",
  nameAr: "مكرر النص",
  path: "/text-repeater",
  description: "Repeat any text multiple times instantly for testing, formatting, and content tasks.",
  descriptionAr: "كرر أي نص عدة مرات فورًا لأغراض الاختبار والتنسيق وإنشاء المحتوى.",
  category: "text-tools"
},
{
  name: "Case Converter",
  nameAr: "محول حالة النص",
  path: "/case-converter",
  description: "Convert text to uppercase, lowercase, title case, or sentence case instantly.",
  descriptionAr: "حوّل النص إلى أحرف كبيرة أو صغيرة أو Title Case أو Sentence case فورًا.",
  category: "text-tools"
},
{
  name: "Line Break Remover",
  nameAr: "إزالة فواصل الأسطر",
  path: "/line-break-remover",
  description: "Remove line breaks from text instantly and turn multi-line text into a clean single line.",
  descriptionAr: "احذف فواصل الأسطر من النص فورًا وحوّل النص متعدد الأسطر إلى سطر واحد مرتب.",
  category: "text-tools"
},
  {
    name: 'Age Calculator',
    nameAr: 'حاسبة العمر',
    path: '/age-calculator',
    description: 'Calculate age from date of birth.',
    descriptionAr: 'احسب العمر من تاريخ الميلاد.',
    category: 'calculators'
  },
  {
    name: 'BMI Calculator',
    nameAr: 'حاسبة مؤشر كتلة الجسم',
    path: '/bmi-calculator',
    description: 'Calculate your Body Mass Index.',
    descriptionAr: 'احسب مؤشر كتلة الجسم الخاص بك.',
    category: 'calculators'
  },
  {
    name: 'Percentage Calculator',
    nameAr: 'حاسبة النسبة المئوية',
    path: '/percentage-calculator',
    description: 'Calculate percentages quickly.',
    descriptionAr: 'احسب النسب المئوية بسرعة.',
    category: 'calculators'
  },
  {
    name: 'JSON Formatter',
    nameAr: 'منسق JSON',
    path: '/json-formatter',
    description: 'Format and beautify JSON code.',
    descriptionAr: 'نسّق JSON واجعله أوضح وأسهل للقراءة.',
    category: 'developer-tools'
  },
  {
  name: "UUID Generator",
  nameAr: "مولد UUID",
  path: "/uuid-generator",
  description: "Generate UUIDs instantly for development and databases.",
  descriptionAr: "إنشاء UUID فورًا للاستخدام في البرمجة وقواعد البيانات.",
  category: "developer-tools"
},
{
  name: "Base64 Encoder / Decoder",
  nameAr: "تشفير وفك Base64",
  path: "/base64-encoder-decoder",
  description: "Encode text to Base64 or decode Base64 back to plain text instantly.",
  descriptionAr: "حوّل النص إلى Base64 أو فك Base64 إلى نص عادي فورًا.",
  category: "developer-tools"
},
{
  name: "URL Encoder / Decoder",
  nameAr: "تشفير وفك URL",
  path: "/url-encoder-decoder",
  description: "Encode URLs and text for safe web usage or decode them back instantly.",
  descriptionAr: "قم بترميز الروابط والنصوص لاستخدامها بأمان في الويب أو فكها فورًا.",
  category: "developer-tools"
},
{
  name: "HTML Entity Encoder / Decoder",
  nameAr: "تشفير وفك HTML Entities",
  path: "/html-entity-encoder-decoder",
  description: "Encode special HTML characters into entities or decode them back into normal text instantly.",
  descriptionAr: "حوّل أحرف HTML الخاصة إلى entities أو فكها إلى نص عادي فورًا.",
  category: "developer-tools"
},
  {
    name: 'Slug Generator',
    nameAr: 'مولد Slug',
    path: '/slug-generator',
    description: 'Convert text into a clean URL-friendly slug.',
    descriptionAr: 'حوّل النص إلى رابط URL نظيف وسهل القراءة.',
    category: 'generators'
  },
  {
  name: "Lorem Ipsum Generator",
  nameAr: "مولد Lorem Ipsum",
  path: "/lorem-ipsum-generator",
  description: "Generate placeholder text instantly for design, UI, and development projects.",
  descriptionAr: "أنشئ نصًا تجريبيًا فورًا لمشاريع التصميم والواجهات والتطوير.",
  category: "generators"
},
];

export default toolsData;