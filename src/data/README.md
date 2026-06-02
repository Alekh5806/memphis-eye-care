# Memphis — Content Data Files

All site content lives in this folder as plain JSON. Adding, editing, or
removing entries does **not** require any changes to React components or CSS —
the UI is generated from these files.

> **Edit safely**
> - JSON is strict: no trailing commas, all strings in `"double quotes"`.
> - VS Code highlights syntax errors automatically.
> - After saving, refresh the browser (Vite hot-reloads on save).
> - Image paths are relative to `public/` (e.g. `/images/products/...`).
> - `id` and `slug` values must be **unique** within their file.

---

## `exportCountries.json` — Global Reach map

Drives the world-map markers, the country chip carousel, the detail card,
the "26 active markets" counter, and the KPI tiles on `/global-reach`.

```jsonc
{
  "settings": { /* optional — overrides defaults in globalReachUtils.js */ },
  "countries": [
    {
      "id": "kenya",                                  // unique slug
      "name": "Kenya",
      "region": "Africa",
      "status": "Active export market",
      "coordinates": { "x": 60.5, "y": 50 },          // % offsets on map (see below)
      "products": ["Ophthalmic PFS", "..."],
      "summary": "Short paragraph shown in detail card.",
      "details": ["Bullet 1", "Bullet 2"]             // shown on /global-reach
    }
  ]
}
```

### How to add a new country at its perfect location

The map uses an **equirectangular projection** (a flat lat/lon grid). Pin
positions are stored as percentages so they auto-scale on every screen
size — but they must come from the country's **real latitude / longitude**,
not eyeballing.

**Step 1 — Look up the country's latitude & longitude.**
Use any source (Google "latitude longitude of *Kenya*", Wikipedia infobox,
[latlong.net](https://www.latlong.net)). Pick the country's geographic
centre, or its capital if you prefer the pin near a major city.

> Example — Kenya: `latitude = -0.0°`, `longitude = 37.9°`.

**Step 2 — Convert to map percentages with this formula:**

```
x = (longitude + 180) / 360 * 100
y = (90 - latitude) / 180 * 100
```

| Rule              | Latitude       | Longitude        |
| ----------------- | -------------- | ---------------- |
| North of equator  | **positive**   | —                |
| South of equator  | **negative**   | —                |
| East of Greenwich | —              | **positive**     |
| West of Greenwich | —              | **negative**     |

> Kenya → `x = (37.9 + 180) / 360 * 100 ≈ 60.5`, `y = (90 - 0) / 180 * 100 = 50`.

**Step 3 — Quick way (copy-paste into terminal):**

```bash
node -e "const lon=37.9, lat=-0.0; \
  console.log('x:', ((lon+180)/360*100).toFixed(1), \
              'y:', ((90-lat)/180*100).toFixed(1))"
```

**Step 4 — Append the country object** to the `countries` array in this
file with the calculated `x` and `y`. Save → Vite hot-reloads → the new pin
appears on the map and in the country selector strip. No React or CSS
changes needed.

**Step 5 — (Optional) Fine-tune by ±0.5.** If the pin sits slightly in the
ocean for a small island nation, nudge `x` / `y` by tenths until it lands
on land.

**Reference coordinates already in use** (sanity check your maths):

| Country     | lat, lon        | x, y          |
| ----------- | --------------- | ------------- |
| Kenya       | -0.0, 37.9      | 60.5, 50.0    |
| UK          | 54.0, -2.0      | 49.4, 20.0    |
| Brazil      | -10.8, -53.0    | 35.3, 56.0    |
| Australia   | -25.7, 134.5    | 87.4, 64.3    |
| Russia      | 62.0, 60.0      | 66.7, 15.5    |
| Sri Lanka   | 7.9, 80.8       | 72.4, 45.6    |

### Other edits
- **Remove a country**: delete the object. Counts, markers, chips and detail
  card all update automatically.
- **Reorder the selector**: reorder objects in `countries`. The first entry
  is the default selection when the page loads.
- **Change the focus region**: the dashed teal ring on the map is decorative;
  to move it edit the `<circle cx cy r>` near the bottom of
  `src/components/sections/GlobalReachSection.jsx` (`cx`/`cy` are in SVG
  units on a 1000 × 500 viewBox).

---

## `products.json` — Grouped product catalogue

Powers the product grid (`/products`), filter chips, featured carousel, and
the detail page (`/products/:slug`). Each entry is a product line; strengths
and pack variations live inside `variants` so the catalogue does not show
duplicate-looking cards for each strength.

```jsonc
{
  "id": "enoxaparin-sodium",                          // unique product-line id
  "slug": "enoxaparin-sodium-injection",              // canonical product-line URL
  "legacySlugs": ["enoxaparin-sodium-injection-0-4ml"], // old variant URLs
  "name": "Product display name",
  "genericName": "Generic name",
  "categoryId": "ophthalmic-care",                    // must match categories.json
  "image": "/images/products/ophthalmic/hpmc-2ml.svg",
  "gallery": ["/images/products/ophthalmic/hpmc-2ml.svg"],
  "featured": true,                                   // show on home page
  "description": "...",
  "usageSummary": "Plain-language real-life usage context.",
  "usageContexts": ["Hospital OT", "ICU"],             // practical settings
  "highlights": ["...", "..."],
  "variants": [
    {
      "id": "enoxaparin-0-4ml",                       // unique variant id
      "slug": "enoxaparin-sodium-injection-0-4ml",    // legacy-safe variant URL
      "image": "/images/products/cardiac/enoxaparin-0-4ml.svg",
      "gallery": ["/images/products/cardiac/enoxaparin-0-4ml.svg"],
      "strength": "40 mg / 0.4 ml",
      "fillVolume": "0.4 ml",
      "pack": "1 PFS with safety guard",
      "dosageForm": "Prefilled Syringe",
      "shelfLife": "24 months",
      "storage": "Store at 2-8°C",
      "composition": "...",
      "indications": ["...", "..."],
      "usage": "Variant-specific practical context."
    }
  ]
}
```

- **Add a product line**: drop new images in `public/images/products/<category>/`
  and append an object. Use a unique product-line `id` and canonical `slug`.
- **Add a strength**: append an object to the product line's `variants` array.
  Do not create another top-level product unless it is a genuinely different
  product line.
- **Variant packaging**: set each variant's `image`/`gallery` when strengths
  have different packaging. The detail page switches image when the variant is
  selected.
- **Legacy URLs**: put old strength-specific slugs in `legacySlugs` and on the
  matching variant's `slug`. The detail page maps them to the parent line and
  preselects the correct variant.
- `categoryId` must exist in `categories.json` or the filter won't show it.

---

## `categories.json` — Product categories

Used for filter chips on `/products` and the segment grid on the home page.

```jsonc
{
  "id": "ophthalmic-care",                            // referenced by products
  "name": "Ophthalmic Care",
  "shortName": "Ophthalmic",                          // used in compact UI
  "description": "Short tagline shown in segment card.",
  "image": "/images/products/ophthalmic/opthalmic.webp"
}
```

> Removing a category that is still referenced by products will hide those
> products' filter chip. Either reassign their `categoryId` first or remove
> the orphaned products.

---

## `pfsAdvantages.json` — Home page PFS advantages

Controls the "Why PFS" section on the home page. You can edit the section
heading, card titles, card text, icon names, signal labels, and accent colors
without touching React or CSS.

```jsonc
{
  "eyebrow": "Why PFS",
  "title": "Section headline.",
  "text": "Short intro paragraph.",
  "items": [
    {
      "id": "handling-risk",                         // unique
      "icon": "ShieldCheck",                         // see choices below
      "accent": "#0fa6b3",                           // hex color
      "signal": "Sterility focus",                   // small pill label
      "title": "Card title",
      "text": "Card body text."
    }
  ]
}
```

Supported icon names: `BadgeCheck`, `CircleGauge`, `Droplets`, `HandHeart`,
`ShieldCheck`, `ShieldPlus`, `Sparkles`, `Syringe`.

---

## `certifications.json` — Certifications strip

```jsonc
{
  "id": "who-gmp",
  "name": "WHO-GMP",                                  // badge label
  "fullName": "WHO Good Manufacturing Practices",     // tooltip / aria
  "description": "One-line description.",
  "color": "#1d4480"                                  // accent colour
}
```

---

## `partners.json` — Partner marquee

```jsonc
{ "id": "iyc", "name": "Partner Name", "type": "Hospital network" }
```

Add / remove freely. The marquee loops automatically.

---

## `stats.json` — Animated counters

```jsonc
{
  "value": "25+",                                     // displayed number/text
  "label": "Countries served",
  "sub": "Across Africa, Middle East, SE Asia & EU"
}
```

The counter animates numeric prefixes (`25+`, `120+`). For 3 stats use 3
objects, for 4 use 4 — the grid adapts.

---

## `testimonials.json` — Testimonials slider

```jsonc
{
  "id": "kvm-1",                                      // unique
  "quote": "...",
  "name": "Dr. Hari Menon",
  "role": "Procurement Lead",
  "organization": "Regional Eye Hospital Network",
  "country": "Kenya",
  "rating": 5                                         // 1–5
}
```

---

## `navigation.json` — Header & mobile-drawer navigation

Top-level array of links. A link with a `children` array renders as a
dropdown (desktop) / accordion (mobile).

```jsonc
[
  { "label": "Home", "path": "/" },
  {
    "label": "Capabilities",
    "path": "/capabilities",
    "children": [
      {
        "label": "Manufacturing",
        "path": "/manufacturing",
        "description": "Shown under the link in the submenu"
      }
    ]
  }
]
```

- `path` can be any internal route or include query strings
  (e.g. `/contact?type=Export%20enquiry`).
- Reorder by reordering the array.

---

## `company.json` — Company-wide content

Single object consumed across the site (footer, about page, contact, hero
sections). Edit any field in place. Highlights:

| Field             | Used in                                |
| ----------------- | -------------------------------------- |
| `name` / `shortName` | Footer, document `<title>`          |
| `tagline`         | Hero copy, meta description            |
| `email` / `phone` | Header bar, footer, contact page       |
| `address`         | Footer, contact page                   |
| `brochure`        | "Download brochure" buttons            |
| `mission` / `vision` / `values` | About page              |
| `differentiators` | About page tiles                       |
| `leadership`      | About page leadership grid             |

Arrays (`values`, `differentiators`, `leadership`) accept any length.

---

## When you **do** need a code change

Editing JSON is enough for routine updates. You only need to touch React or
CSS when:

1. Introducing a **brand-new field** that should appear in the UI
   (e.g. add `flag` to a country and want to render it).
2. Adding a **new product image asset** — files go into `public/images/...`,
   then reference the path from JSON.
3. Creating an **entirely new section** (not a new row of an existing
   section) — that requires a new component.
4. Changing **layout, colours, typography, or animations** — those live in
   `src/App.css`.

For everything else: edit JSON → save → refresh.
