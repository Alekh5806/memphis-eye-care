import { chromium } from 'playwright'

const baseUrl = process.env.RESPONSIVE_BASE_URL || 'http://localhost:5173'
const pages = [
  '/',
  '/products',
  '/products/enoxaparin-sodium-injection-0-4ml',
  '/about',
  '/manufacturing',
  '/quality',
  '/contract-manufacturing',
  '/contact',
]

const viewports = [
  { name: 'mobile-320', width: 320, height: 740 },
  { name: 'mobile-360', width: 360, height: 800 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'tablet-1024', width: 1024, height: 768 },
  { name: 'laptop-1366', width: 1366, height: 768 },
  { name: 'desktop-1920', width: 1920, height: 1080 },
]

const browser = await chromium.launch()
const failures = []

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport })

  for (const path of pages) {
    await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' })

    const result = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
    }))

    if (
      result.scrollWidth > result.clientWidth + 1 ||
      result.bodyScrollWidth > result.clientWidth + 1
    ) {
      failures.push({
        viewport: viewport.name,
        path,
        ...result,
      })
    }
  }

  await page.close()
}

await browser.close()

if (failures.length) {
  console.error(JSON.stringify({ ok: false, failures }, null, 2))
  process.exit(1)
}

console.log(`Responsive overflow check passed for ${pages.length * viewports.length} cases.`)
