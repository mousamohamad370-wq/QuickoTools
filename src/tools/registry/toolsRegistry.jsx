import { lazy } from 'react';
import toolsData from '../data/toolsData';

const componentMap = {
  '/tools/word-counter': lazy(() => import('../text-tools/WordCounter')),
  '/tools/character-counter': lazy(() => import('../text-tools/CharacterCounter')),
  '/tools/remove-duplicate-lines': lazy(() => import('../text-tools/RemoveDuplicateLines')),
  '/tools/text-repeater': lazy(() => import('../text-tools/TextRepeater')),
  '/tools/case-converter': lazy(() => import('../text-tools/CaseConverter')),
  '/tools/text-case-converter': lazy(() => import('../text-tools/CaseConverter')),
  '/tools/line-break-remover': lazy(() => import('../text-tools/LineBreakRemover')),
  '/tools/remove-extra-spaces': lazy(() => import('../text-tools/RemoveExtraSpaces')),
  '/tools/reverse-text': lazy(() => import('../text-tools/ReverseText')),
  '/tools/text-sorter': lazy(() => import('../text-tools/TextSorter')),
  '/tools/remove-empty-lines': lazy(() => import('../text-tools/RemoveEmptyLines')),

  '/tools/age-calculator': lazy(() => import('../calculators/AgeCalculator')),
  '/tools/bmi-calculator': lazy(() => import('../calculators/BMICalculator')),
  '/tools/percentage-calculator': lazy(() => import('../calculators/PercentageCalculator')),

  '/tools/image-to-pdf': lazy(() => import('../pdf-tools/ImageToPDF')),
  '/tools/pdf-page-counter': lazy(() => import('../pdf-tools/PDFPageCounter')),
  '/tools/pdf-metadata-viewer': lazy(() => import('../pdf-tools/PDFMetadataViewer')),
  '/tools/pdf-text-extractor': lazy(() => import('../pdf-tools/PDFTextExtractor')),
  '/tools/pdf-merger': lazy(() => import('../pdf-tools/PDFMerger')),

  '/tools/password-generator': lazy(() => import('../generators/PasswordGenerator')),
  '/tools/qr-code-generator': lazy(() => import('../generators/QRCodeGenerator')),
  '/tools/slug-generator': lazy(() => import('../generators/SlugGenerator')),
  '/tools/lorem-ipsum-generator': lazy(() => import('../generators/LoremIpsumGenerator')),

  '/tools/json-formatter': lazy(() => import('../developer-tools/JSONFormatter')),
  '/tools/uuid-generator': lazy(() => import('../developer-tools/UUIDGenerator')),
  '/tools/base64-encoder-decoder': lazy(() => import('../developer-tools/Base64EncoderDecoder')),
  '/tools/url-encoder-decoder': lazy(() => import('../developer-tools/URLEncoderDecoder')),
  '/tools/html-entity-encoder-decoder': lazy(() => import('../developer-tools/HTMLEntityEncoderDecoder')),

  '/tools/roman-numeral-converter': lazy(() => import('../converters/RomanNumeralConverter'))
};

function normalizeToolPath(path = '') {
  if (!path) return '';

  if (path.startsWith('/tools/')) {
    return path;
  }

  if (path.startsWith('/')) {
    return `/tools${path}`;
  }

  return `/tools/${path}`;
}

const toolsRegistry = toolsData
  .filter((tool) => tool.isPublished)
  .map((tool) => {
    const normalizedPath = normalizeToolPath(tool.path);

    return {
      ...tool,
      path: normalizedPath,
      originalPath: tool.path,
      slug: normalizedPath.replace('/tools/', ''),
      component: componentMap[normalizedPath]
    };
  })
  .filter((tool) => {
    if (!tool.component) {
      console.warn(`No component found for tool path: ${tool.path}`);
      return false;
    }

    return true;
  });

export default toolsRegistry;