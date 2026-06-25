import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const DEFAULT_TITLE =
  'Memphis Vision Care | Sterile PFS Manufacturer in India'
const DEFAULT_DESCRIPTION =
  'Sterile prefilled syringe manufacturer for ophthalmic, cardiac, orthopaedic, and gynaecology segments, serving healthcare partners across 25+ countries.'
const SITE_URL = 'https://www.memphisvisioncare.com'
const DEFAULT_SHARE_IMAGE = '/images/hero/pharma1.webp'

function absoluteUrl(value) {
  if (!value) return value
  if (value.startsWith('http')) return value
  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`
}

function getShareImage(value) {
  if (!value || value.endsWith('.svg')) return DEFAULT_SHARE_IMAGE
  return value
}

function upsertMeta(attr, value, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${value}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, value)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Lightweight per-page document head manager (no extra deps).
 * Updates title, description, canonical, and OG/Twitter tags on mount.
 */
function DocumentHead({ title, description, image, type = 'website', canonicalPath, structuredData }) {
  const location = useLocation()
  const path = canonicalPath || location.pathname
  const url = path.startsWith('http') ? path : `${SITE_URL}${path}`
  const finalTitle = title ? `${title} — Memphis Vision Care` : DEFAULT_TITLE
  const finalDescription = description || DEFAULT_DESCRIPTION
  const finalImage = absoluteUrl(getShareImage(image))

  useEffect(() => {
    document.title = finalTitle

    upsertMeta('name', 'description', finalDescription)
    upsertLink('canonical', url)

    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:site_name', 'Memphis Vision Care')
    upsertMeta('property', 'og:locale', 'en_IN')
    upsertMeta('property', 'og:title', finalTitle)
    upsertMeta('property', 'og:description', finalDescription)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', finalImage)
    upsertMeta('property', 'og:image:alt', finalTitle)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', finalTitle)
    upsertMeta('name', 'twitter:description', finalDescription)
    upsertMeta('name', 'twitter:image', finalImage)
    upsertMeta('name', 'twitter:image:alt', finalTitle)

    // JSON-LD structured data
    const existing = document.getElementById('page-jsonld')
    if (existing) existing.remove()
    if (structuredData) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'page-jsonld'
      script.text = JSON.stringify(structuredData)
      document.head.appendChild(script)
    }
  }, [finalTitle, finalDescription, finalImage, url, type, structuredData])

  return null
}

export default DocumentHead
