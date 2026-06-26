# Memphis Vision Care Website

Corporate pharma website for Memphis Vision Care, built with React, Vite, and
Cloudflare Pages/Functions. The site presents sterile prefilled syringe product
lines, therapeutic segments, manufacturing capability, global reach, contact
flows, and editable business content.

## Tech Stack

- React 19
- Vite 8
- React Router
- Framer Motion
- Lucide React icons
- Cloudflare Pages Functions for form endpoints
- JSON-driven content in `src/data`

## Local Development

Install dependencies:

```sh
npm install
```

Start Vite:

```sh
npm run dev
```

Common checks:

```sh
npm run build
npm run lint
npm run check:responsive
```

Preview the production build locally:

```sh
npm run preview
```

## Project Structure

```text
src/
  components/
    common/        Shared layout, buttons, header/footer, SEO helpers
    product/       Product filter, grid, and product cards
    sections/      Home page and reusable marketing sections
  data/            Editable JSON content
  pages/           Route-level pages
  utils/           Product/search/global reach helpers
functions/
  api/forms/       Cloudflare Pages Functions for form submissions
public/
  images/          Product, hero, and logo assets
```

## Editable Content

Most site content is driven by JSON files in `src/data`. See
[src/data/README.md](src/data/README.md) for detailed editing instructions.

Important files:

- `src/data/products.json` — grouped product catalogue
- `src/data/categories.json` — product categories and home segment cards
- `src/data/pfsAdvantages.json` — home page PFS advantages section
- `src/data/exportCountries.json` — global reach map and country details
- `src/data/certifications.json` — certification strip
- `src/data/partners.json` — partner marquee
- `src/data/company.json` — company identity/contact metadata

## Product Catalogue Model

The product catalogue uses grouped product lines instead of one card per
strength. Each top-level product represents a product line, and strengths or
pack variations live inside `variants`.

Example:

```jsonc
{
  "id": "enoxaparin-sodium",
  "slug": "enoxaparin-sodium-injection",
  "legacySlugs": ["enoxaparin-sodium-injection-0-4ml"],
  "name": "Enoxaparin Sodium Injection IP",
  "genericName": "Enoxaparin Sodium",
  "categoryId": "cardiac-critical-care",
  "image": "/images/products/cardiac/enoxaparin-0-4ml.svg",
  "usageSummary": "Plain-language real-life usage context.",
  "usageContexts": ["ICU", "Cardiac care unit", "Emergency"],
  "variants": [
    {
      "id": "enoxaparin-0-4ml",
      "slug": "enoxaparin-sodium-injection-0-4ml",
      "image": "/images/products/cardiac/enoxaparin-0-4ml.svg",
      "strength": "40 mg / 0.4 ml",
      "fillVolume": "0.4 ml",
      "pack": "1 PFS with safety guard",
      "dosageForm": "Prefilled Syringe",
      "composition": "...",
      "indications": ["DVT prophylaxis"]
    }
  ]
}
```

Product behaviour:

- `/products` shows one card per product line.
- Search matches product names, generic names, category names, usage contexts,
  strengths, fill volumes, dosage forms, packs, composition, and indications.
- Category filters still use `categoryId`.
- Detail pages allow selecting a variant/strength.
- Variant-specific fields update live on the detail page.
- Variant-specific packaging images are supported through `variant.image`.
- Legacy strength URLs map to the parent product line and preselect the matching
  variant.

## Adding Or Editing Products

1. Add product images under `public/images/products/<category>/`.
2. Edit `src/data/products.json`.
3. Add a top-level product only for a new product line.
4. Add strengths/packs inside the product line's `variants` array.
5. Set `variant.image` when strengths have different packaging.
6. Keep old strength-specific URLs in `legacySlugs` and variant `slug` values.
7. Run:

```sh
npm run build
npm run lint
npm run check:responsive
```

## Forms And Web3Forms

The contact and newsletter forms submit through Cloudflare Pages Functions:

- `/api/forms/contact`
- `/api/forms/newsletter`

For local browser-only form testing, copy `.env.example` to `.env.local` and set:

```sh
VITE_WEB3FORMS_ACCESS_KEY=your_key_here
```

Restart Vite after changing local environment variables.

For production, set the Web3Forms key as a Cloudflare secret:

```sh
npx wrangler secret put WEB3FORMS_ACCESS_KEY
```

`VITE_WEB3FORMS_ACCESS_KEY` is supported as a fallback for static-only hosting,
but `WEB3FORMS_ACCESS_KEY` is preferred in production because it keeps the key
out of the browser bundle.

## Build And Deployment

Create a production build:

```sh
npm run build
```

Preferred Cloudflare Workers setup:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Node version: `22`

Deploy manually:

```sh
npm run deploy
```

Cloudflare Pages is also supported through the functions in `functions/api/forms`.
For the current Cloudflare deploy command, the Worker in `src/worker.js` serves
the built assets and form endpoints so `npx wrangler deploy` succeeds.

Vite reads `VITE_*` values at build time. Rebuild and redeploy after changing
hosting environment variables.

## QA Checklist

Before shipping product or layout changes, verify:

- `npm run build` passes
- `npm run lint` passes
- `npm run check:responsive` passes
- Product category filtering works
- Product search finds variant strengths and fill volumes
- Product detail variant switching updates specs and images
- Legacy product URLs still open the correct product line
- Header/footer behaviour and sticky layout are unchanged

## Notes For Future Editors

- Keep product and marketing copy professional, corporate, and suitable for a
  pharma/B2B audience.
- Do not create duplicate top-level product cards for strength variants.
- Use JSON data updates before changing React components whenever possible.
- Avoid unrelated header/footer changes when working on product functionality.
