import { lazy } from 'react';
import toolsData from '../data/toolsData';

const componentMap = {
  '/word-counter': lazy(() => import('../text-tools/WordCounter')),
  '/character-counter': lazy(() => import('../text-tools/CharacterCounter')),
  '/remove-duplicate-lines': lazy(() => import('../text-tools/RemoveDuplicateLines')),
  '/text-repeater': lazy(() => import('../text-tools/TextRepeater')),
  '/case-converter': lazy(() => import('../text-tools/CaseConverter')),
  '/text-case-converter': lazy(() => import('../text-tools/CaseConverter')),
  '/line-break-remover': lazy(() => import('../text-tools/LineBreakRemover')),

  '/age-calculator': lazy(() => import('../calculators/AgeCalculator')),
  '/bmi-calculator': lazy(() => import('../calculators/BMICalculator')),
  '/percentage-calculator': lazy(() => import('../calculators/PercentageCalculator')),
  '/remove-extra-spaces': lazy(() => import('../text-tools/RemoveExtraSpaces')),
  '/reverse-text': lazy(() => import('../text-tools/ReverseText')),
  '/text-sorter': lazy(() => import('../text-tools/TextSorter')),
  '/remove-empty-lines': lazy(() => import('../text-tools/RemoveEmptyLines')),
  '/image-to-pdf': lazy(() => import('../pdf-tools/ImageToPDF')),
  '/pdf-page-counter': lazy(() => import('../pdf-tools/PDFPageCounter')),
  '/pdf-metadata-viewer': lazy(() => import('../pdf-tools/PDFMetadataViewer')),
  '/pdf-text-extractor': lazy(() => import('../pdf-tools/PDFTextExtractor')),

  '/password-generator': lazy(() => import('../generators/PasswordGenerator')),
  '/qr-code-generator': lazy(() => import('../generators/QRCodeGenerator')),
  '/slug-generator': lazy(() => import('../generators/SlugGenerator')),
  '/lorem-ipsum-generator': lazy(() => import('../generators/LoremIpsumGenerator')),

  '/json-formatter': lazy(() => import('../developer-tools/JSONFormatter')),
  '/uuid-generator': lazy(() => import('../developer-tools/UUIDGenerator')),
  '/base64-encoder-decoder': lazy(() => import('../developer-tools/Base64EncoderDecoder')),
  '/url-encoder-decoder': lazy(() => import('../developer-tools/URLEncoderDecoder')),
  '/html-entity-encoder-decoder': lazy(() => import('../developer-tools/HTMLEntityEncoderDecoder')),

  '/roman-numeral-converter': lazy(() => import('../converters/RomanNumeralConverter'))
};

const toolsRegistry = toolsData
  .filter((tool) => tool.isPublished)
  .map((tool) => ({
    ...tool,
    component: componentMap[tool.path]
  }));

export default toolsRegistry;