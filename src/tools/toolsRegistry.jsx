import { lazy } from 'react';
import toolsData from './toolsData';

const componentMap = {
  '/word-counter': lazy(() => import('./WordCounter')),
  '/character-counter': lazy(() => import('./CharacterCounter')),
  '/password-generator': lazy(() => import('./PasswordGenerator')),
  '/qr-code-generator': lazy(() => import('./QRCodeGenerator')),
  '/text-case-converter': lazy(() => import('./TextCaseConverter')),
  '/remove-duplicate-lines': lazy(() => import('./RemoveDuplicateLines')),
  '/age-calculator': lazy(() => import('./AgeCalculator')),
  '/bmi-calculator': lazy(() => import('./BMICalculator')),
  '/percentage-calculator': lazy(() => import('./PercentageCalculator')),
  '/json-formatter': lazy(() => import('./JSONFormatter')),
  '/slug-generator': lazy(() => import('./SlugGenerator')),
    '/uuid-generator': lazy(() => import('./UUIDGenerator')),
    '/base64-encoder-decoder': lazy(() => import('./Base64EncoderDecoder')),
    '/url-encoder-decoder': lazy(() => import('./URLEncoderDecoder')),
    '/lorem-ipsum-generator': lazy(() => import('./LoremIpsumGenerator'))
};

const toolsRegistry = toolsData.map((tool) => ({
  ...tool,
  component: componentMap[tool.path]
}));

export default toolsRegistry;