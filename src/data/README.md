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
      "coordinates": { "x": 58, "y": 58 },            // % offsets on map (0–100)
      "products": ["Ophthalmic PFS", "..."],
      "summary": "Short paragraph shown in detail card.",
      "details": ["Bullet 1", "Bullet 2"]             // shown on /global-reach
    }
  ]
}
```

- **Add a country**: append a new object to `countries`. Pick `x` / `y` by
  eyeballing the map (top-left = `0,0`, bottom-right = `100,100`).
- **Remove a country**: delete the object. Counts, markers, chips and detail
  card all update automatically.
- The first country in the array is the default selection.

---

## `products.json` — Product catalogue

Powers the product grid (`/products`), filter chips, featured carousel, and
the detail page (`/products/:slug`).

```jsonc
{
  "id": "hpmc-ophthalmic-2ml",                        // unique
  "slug": "hydroxypropyl-methylcellulose-...-2ml",    // URL-safe, unique
  "name": "Product display name",
  "genericName": "Generic name + strength",
  "categoryId": "ophthalmic-care",                    // must match categories.json
  "strength": "2% w/v",
  "fillVolume": "2 ml",
  "pack": "1 PFS in carton",
  "dosageForm": "Prefilled Syringe",
  "shelfLife": "24 months",
  "storage": "Store at 2–25°C, protect from light",
  "image": "/images/products/ophthalmic/hpmc-2ml.svg",
  "gallery": ["/images/products/ophthalmic/hpmc-2ml.svg"],
  "featured": true,                                   // show on home page
  "description": "...",
  "indications": ["...", "..."],
  "composition": "...",
  "highlights": ["...", "..."]
}
```

- **Add a product**: drop new images in `public/images/products/<category>/`
  and append an object. Use a unique `id` and `slug`.
- **Remove a product**: delete the object. Grid, filters and counts adjust.
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
