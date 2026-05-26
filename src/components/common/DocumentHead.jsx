import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const DEFAULT_TITLE =
  'Memphis Vision Care | Sterile Prefilled Syringe Manufacturer — Ophthalmic, Cardiac, Orthopaedic & Gynaecology'
const DEFAULT_DESCRIPTION =
  'Quality-led sterile prefilled syringe (PFS) manufacturer for ophthalmic, cardiac critical care, orthopaedic, and gynaecology segments — trusted by hospitals, distributors, and export partners across 25+ countries.'
const SITE_URL = 'https://www.memphisvisioncare.com'

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
function DocumentHead({ title, description, image, type = 'website', structuredData }) {
  const location = useLocation()
  const url = `${SITE_URL}${location.pathname}`
  const finalTitle = title ? `${title} — Memphis Vision Care` : DEFAULT_TITLE
  const finalDescription = description || DEFAULT_DESCRIPTION
  const finalImage = image || `${SITE_URL}/images/hero/pharma1.webp`

  useEffect(() => {
    document.title = finalTitle

    upsertMeta('name', 'description', finalDescription)
    upsertLink('canonical', url)

    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:title', finalTitle)
    upsertMeta('property', 'og:description', finalDescription)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', finalImage)

    upsertMeta('name', 'twitter:title', finalTitle)
    upsertMeta('name', 'twitter:description', finalDescription)
    upsertMeta('name', 'twitter:image', finalImage)

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
