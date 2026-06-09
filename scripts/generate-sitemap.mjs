import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const SITE_URL = 'https://www.memphisvisioncare.com'

const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/products', changefreq: 'weekly', priority: '0.9' },
  { path: '/capabilities', changefreq: 'monthly', priority: '0.7' },
  { path: '/manufacturing', changefreq: 'monthly', priority: '0.7' },
  { path: '/quality', changefreq: 'monthly', priority: '0.8' },
  { path: '/contract-manufacturing', changefreq: 'monthly', priority: '0.8' },
  { path: '/partner-with-us', changefreq: 'monthly', priority: '0.7' },
  { path: '/global-reach', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.9' },
]

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function urlEntry({ path, changefreq, priority }) {
  return [
    '  <url>',
    `    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n')
}

async function readJson(path) {
  return JSON.parse(await readFile(resolve(path), 'utf8'))
}

const [products, categories] = await Promise.all([
  readJson('src/data/products.json'),
  readJson('src/data/categories.json'),
])

const categoryRoutes = categories.map((category) => ({
  path: `/products?category=${encodeURIComponent(category.id)}`,
  changefreq: 'weekly',
  priority: '0.8',
}))

const productRoutes = products.map((product) => ({
  path: `/products/${product.slug}`,
  changefreq: 'monthly',
  priority: product.featured ? '0.85' : '0.8',
}))

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...[...staticRoutes, ...categoryRoutes, ...productRoutes].map(urlEntry),
  '</urlset>',
  '',
].join('\n')

await writeFile(resolve('public/sitemap.xml'), xml)

console.log(`Generated sitemap with ${staticRoutes.length + categoryRoutes.length + productRoutes.length} URLs.`)
