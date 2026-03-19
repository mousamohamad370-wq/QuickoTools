import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import toolsData from '../src/tools/data/toolsData.js';
import categoriesData from '../src/tools/data/categoriesData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ الدومين الصح
const SITE_URL = 'https://quickotools.com';

const staticPages = [
  '/',
  '/categories',
  '/about',
  '/contact',
  '/privacy-policy'
];

function createUrlEntry(url, priority = '0.8') {
  return `  <url>
    <loc>${url}</loc>
    <priority>${priority}</priority>
  </url>`;
}

// صفحات ثابتة
const staticUrls = staticPages.map((page) => {
  const priorityMap = {
    '/': '1.0',
    '/categories': '0.9',
    '/about': '0.5',
    '/contact': '0.5',
    '/privacy-policy': '0.5'
  };

  return createUrlEntry(`${SITE_URL}${page}`, priorityMap[page] || '0.8');
});

// كاتيجوريز (إذا عندك /categories/slug)
const categoryUrls = categoriesData.map((category) =>
  createUrlEntry(`${SITE_URL}/categories/${category.slug}`, '0.8')
);

// أدوات (مهم جدًا)
const toolUrls = toolsData
  .filter((tool) => tool.isPublished)
  .map((tool) => {
    // تأكد المسار فيه /tools/
    const toolPath = tool.path.startsWith('/tools')
      ? tool.path
      : `/tools${tool.path}`;

    return createUrlEntry(`${SITE_URL}${toolPath}`, '0.8');
  });

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${[...staticUrls, ...categoryUrls, ...toolUrls].join('\n\n')}

</urlset>
`;

const outputPath = path.join(__dirname, '../public/sitemap.xml');

fs.writeFileSync(outputPath, sitemapXml, 'utf8');

console.log('✅ sitemap.xml generated successfully at:', outputPath);