import toolsData from '../src/tools/data/toolsData.js';
import categoriesData from '../src/tools/data/categoriesData.js';

const errors = [];

const seenIds = new Set();
const seenPaths = new Set();
const validCategorySlugs = new Set(categoriesData.map((category) => category.slug));

for (const tool of toolsData) {
  if (!tool.id || typeof tool.id !== 'string') {
    errors.push(`Tool is missing a valid "id": ${JSON.stringify(tool)}`);
  } else if (seenIds.has(tool.id)) {
    errors.push(`Duplicate tool id found: ${tool.id}`);
  } else {
    seenIds.add(tool.id);
  }

  if (!tool.path || typeof tool.path !== 'string') {
    errors.push(`Tool is missing a valid "path": ${tool.id || '(unknown id)'}`);
  } else if (!tool.path.startsWith('/')) {
    errors.push(`Tool path must start with "/": ${tool.path}`);
  } else if (seenPaths.has(tool.path)) {
    errors.push(`Duplicate tool path found: ${tool.path}`);
  } else {
    seenPaths.add(tool.path);
  }

  if (!tool.category || !validCategorySlugs.has(tool.category)) {
    errors.push(
      `Tool has invalid category "${tool.category}" for tool: ${tool.id || tool.path}`
    );
  }

  if (!tool.name || typeof tool.name !== 'string') {
    errors.push(`Tool is missing valid "name": ${tool.id || tool.path}`);
  }

  if (!tool.nameAr || typeof tool.nameAr !== 'string') {
    errors.push(`Tool is missing valid "nameAr": ${tool.id || tool.path}`);
  }

  if (!tool.description || typeof tool.description !== 'string') {
    errors.push(`Tool is missing valid "description": ${tool.id || tool.path}`);
  }

  if (!tool.descriptionAr || typeof tool.descriptionAr !== 'string') {
    errors.push(`Tool is missing valid "descriptionAr": ${tool.id || tool.path}`);
  }

  if (!Array.isArray(tool.languages) || tool.languages.length === 0) {
    errors.push(`Tool is missing valid "languages" array: ${tool.id || tool.path}`);
  }

  if (!Array.isArray(tool.keywords)) {
    errors.push(`Tool is missing valid "keywords" array: ${tool.id || tool.path}`);
  }

  if (!Array.isArray(tool.keywordsAr)) {
    errors.push(`Tool is missing valid "keywordsAr" array: ${tool.id || tool.path}`);
  }

  if (typeof tool.isPopular !== 'boolean') {
    errors.push(`Tool is missing valid boolean "isPopular": ${tool.id || tool.path}`);
  }

  if (typeof tool.isPublished !== 'boolean') {
    errors.push(`Tool is missing valid boolean "isPublished": ${tool.id || tool.path}`);
  }
}

if (errors.length > 0) {
  console.error('\nTool validation failed:\n');
  errors.forEach((error, index) => {
    console.error(`${index + 1}. ${error}`);
  });
  console.error(`\nTotal errors: ${errors.length}\n`);
  process.exit(1);
}

console.log('All tools passed validation successfully.');