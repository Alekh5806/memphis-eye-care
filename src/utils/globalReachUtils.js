import globalReachData from '../data/exportCountries.json'

const defaultSettings = {
  eyebrow: 'Global reach',
  pageHero: {
    eyebrow: 'Global reach',
    title: 'Global market access for sterile PFS partnerships.',
    text: 'A dedicated international section for distributors, institutions, and pharma partners to review market focus, product categories, and begin a country-specific export enquiry.',
  },
  section: {
    title: 'International enquiries organized around markets, products, and documentation.',
    text: 'A focused export view for distributors and institutional buyers to review active markets, product categories, and begin a country-specific discussion with Memphis.',
    previewButtonLabel: 'View global reach',
  },
  mapTitle: 'International Market View',
  kpis: [
    {
      type: 'countryCount',
      labelSingular: 'active market',
      labelPlural: 'active markets',
    },
    {
      type: 'uniqueProductCount',
      labelSingular: 'product category',
      labelPlural: 'product categories',
    },
    {
      type: 'custom',
      value: '24h',
      label: 'enquiry routing',
    },
  ],
}

export const globalReachCountries = Array.isArray(globalReachData)
  ? globalReachData
  : globalReachData.countries || []

export const globalReachSettings = {
  ...defaultSettings,
  ...(Array.isArray(globalReachData) ? {} : globalReachData.settings || {}),
  pageHero: {
    ...defaultSettings.pageHero,
    ...(Array.isArray(globalReachData) ? {} : globalReachData.settings?.pageHero || {}),
  },
  section: {
    ...defaultSettings.section,
    ...(Array.isArray(globalReachData) ? {} : globalReachData.settings?.section || {}),
  },
  kpis: Array.isArray(globalReachData)
    ? defaultSettings.kpis
    : globalReachData.settings?.kpis || defaultSettings.kpis,
}

export function getPluralizedLabel(count, item) {
  if (item.label) return item.label
  return count === 1 ? item.labelSingular : item.labelPlural
}
