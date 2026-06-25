import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Activity, ArrowLeft, Baby, Building2, Download, Eye, HeartPulse, Hospital, Layers3, Mail, PackageCheck, ShieldCheck, Snowflake, Stethoscope, Syringe, Thermometer } from 'lucide-react'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import DocumentHead from '../components/common/DocumentHead'
import ProductCard from '../components/product/ProductCard'
import products from '../data/products.json'
import company from '../data/company.json'
import { findProductBySlug, getCategory, getProductVariants, getVariantById } from '../utils/productUtils'

const getUsageIcon = (context) => {
  const value = context.toLowerCase()

  if (value.includes('icu') || value.includes('cardiac')) return HeartPulse
  if (value.includes('labour') || value.includes('maternity') || value.includes('obstetric')) return Baby
  if (value.includes('ophthalmic') || value.includes('eye')) return Eye
  if (value.includes('emergency')) return Activity
  if (value.includes('opd') || value.includes('clinic')) return Stethoscope
  if (value.includes('infusion') || value.includes('dialysis')) return Syringe
  if (value.includes('hospital') || value.includes('ot') || value.includes('ward')) return Hospital

  return Building2
}

function ProductDetails() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const resolvedProduct = useMemo(() => findProductBySlug(products, slug), [slug])
  const product = resolvedProduct.product
  const variants = useMemo(() => getProductVariants(product), [product])
  const requestedVariantId = searchParams.get('variant')
  const initialVariantId = useMemo(() => {
    return variants.find((variant) => variant.id === requestedVariantId)?.id
      ?? resolvedProduct.variant?.id
      ?? variants[0]?.id
      ?? null
  }, [requestedVariantId, resolvedProduct.variant?.id, variants])
  const [variantSelection, setVariantSelection] = useState(null)
  const selectedVariantId = variantSelection?.slug === slug ? variantSelection.variantId : initialVariantId

  if (!product) {
    return (
      <section className="section">
        <Container>
          <div className="empty-state">
            <h1>Product not found</h1>
            <p>The product URL may have changed.</p>
            <Button to="/products">Back to products</Button>
          </div>
        </Container>
      </section>
    )
  }

  const category = getCategory(product)
  const selectedVariant = getVariantById(product, selectedVariantId)
  const selectedVariantImage = selectedVariant?.image ?? product.image ?? '/images/products/fallback.svg'
  const selectedVariantShareImagePath = [
    selectedVariantImage,
    product.image,
    category?.image,
    '/images/hero/pharma1.webp',
  ].find((path) => path && !path.endsWith('.svg'))
  const selectedVariantShareImage = selectedVariantImage.startsWith('http')
    ? selectedVariantImage
    : `https://www.memphisvisioncare.com${selectedVariantShareImagePath}`
  const isSelectedImageVector = selectedVariantImage.endsWith('.svg')
  const variantLabel = selectedVariant?.strength ? ` - ${selectedVariant.strength}` : ''
  const mailSubject = encodeURIComponent(`Product enquiry: ${product.name}${variantLabel}`)
  const related = products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3)
  const canonicalPath = `/products/${product.slug}`
  const productUrl = `https://www.memphisvisioncare.com${canonicalPath}`
  const additionalProperties = [
    ['Strength', selectedVariant?.strength],
    ['Fill volume', selectedVariant?.fillVolume],
    ['Pack', selectedVariant?.pack],
    ['Dosage form', selectedVariant?.dosageForm],
    ['Shelf life', selectedVariant?.shelfLife],
    ['Storage', selectedVariant?.storage],
  ]
    .filter(([, value]) => Boolean(value))
    .map(([name, value]) => ({
      '@type': 'PropertyValue',
      name,
      value,
    }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${productUrl}#product`,
        name: product.name,
        alternateName: product.genericName,
        description: product.description,
        image: selectedVariantShareImage,
        url: productUrl,
        sku: selectedVariant?.id || product.id,
        category: category?.name,
        brand: { '@type': 'Brand', name: company.shortName },
        manufacturer: {
          '@type': 'Organization',
          name: company.name,
          url: 'https://www.memphisvisioncare.com/',
        },
        additionalProperty: additionalProperties,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${productUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.memphisvisioncare.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Products',
            item: 'https://www.memphisvisioncare.com/products',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.name,
            item: productUrl,
          },
        ],
      },
    ],
  }

  return (
    <>
      <DocumentHead
        title={product.name}
        description={product.description}
        image={selectedVariantShareImage}
        canonicalPath={canonicalPath}
        structuredData={jsonLd}
      />
      <section className="section product-detail-section">
        <Container>
          <Link className="back-link" to="/products">
            <ArrowLeft size={16} /> Back to products
          </Link>

          <div className="product-detail-layout">
            <div
              className={`product-detail-media ${isSelectedImageVector ? 'is-vector' : 'is-photo'}`}
            >
              <div className="product-detail-media-label">
                <span>{category?.shortName ?? category?.name}</span>
                {selectedVariant?.strength && <strong>{selectedVariant.strength}</strong>}
              </div>
              <img
                src={selectedVariantImage}
                alt={`${product.name} ${selectedVariant?.strength ?? ''}`}
                loading="eager"
              />
              <div className="product-detail-media-glow" aria-hidden="true" />
            </div>

            <div className="product-detail-copy">
              <span className="product-category">{category?.name}</span>
              <h1>{product.name}</h1>
              {product.genericName && <p className="product-generic">{product.genericName}</p>}
              <p>{product.description}</p>

              <div className="product-detail-quickfacts" aria-label="Product line overview">
                <div>
                  <Layers3 size={18} />
                  <small>Line depth</small>
                  <strong>{variants.length} {variants.length === 1 ? 'variant' : 'strength variants'}</strong>
                </div>
                {selectedVariant?.dosageForm && (
                  <div>
                    <PackageCheck size={18} />
                    <small>Format</small>
                    <strong>{selectedVariant.dosageForm}</strong>
                  </div>
                )}
                {product.usageContexts?.[0] && (
                  <div>
                    <Building2 size={18} />
                    <small>Primary setting</small>
                    <strong>{product.usageContexts[0]}</strong>
                  </div>
                )}
              </div>

              {variants.length > 1 && (
                <div className="variant-selector" aria-label="Select product strength">
                  <span>Available strengths</span>
                  <div className="variant-options" role="group" aria-label="Product variants">
                    {variants.map((variant) => (
                      <button
                        className={selectedVariant?.id === variant.id ? 'is-selected' : ''}
                        key={variant.id}
                        type="button"
                        aria-pressed={selectedVariant?.id === variant.id}
                        onClick={() => setVariantSelection({ slug, variantId: variant.id })}
                      >
                        <strong>{variant.strength}</strong>
                        {variant.fillVolume && <small>{variant.fillVolume}</small>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <dl className="spec-grid">
                <div className="spec-item"><dt>Strength</dt><dd>{selectedVariant?.strength}</dd></div>
                <div className="spec-item"><dt>Fill volume</dt><dd>{selectedVariant?.fillVolume}</dd></div>
                <div className="spec-item spec-item-wide"><dt>Pack</dt><dd>{selectedVariant?.pack}</dd></div>
                <div className="spec-item"><dt>Dosage form</dt><dd>{selectedVariant?.dosageForm}</dd></div>
                {selectedVariant?.shelfLife && <div className="spec-item"><dt>Shelf life</dt><dd>{selectedVariant.shelfLife}</dd></div>}
                {selectedVariant?.storage && <div className="spec-item spec-item-wide"><dt>Storage</dt><dd>{selectedVariant.storage}</dd></div>}
              </dl>

              <div className="highlight-list">
                {product.highlights?.map((highlight) => (
                  <span key={highlight}>
                    <PackageCheck size={17} /> {highlight}
                  </span>
                ))}
              </div>

              <div className="detail-actions">
                <Button href={`mailto:${company.email}?subject=${mailSubject}`}>
                  <Mail size={18} /> Enquire now
                </Button>
                <Button to={`/contact?type=Product%20enquiry&product=${encodeURIComponent(`${product.name}${variantLabel}`)}`} variant="outline">
                  Request a quote
                </Button>
                {company.brochure && (
                  <Button href={company.brochure} variant="ghost">
                    <Download size={18} /> Brochure
                  </Button>
                )}
              </div>

              <div className="product-trust-row">
                <span><ShieldCheck size={14} /> WHO-GMP aligned</span>
                <span><Thermometer size={14} /> Stability data on request</span>
                {selectedVariant?.storage?.includes('2-8') && (
                  <span><Snowflake size={14} /> Cold-chain compliant</span>
                )}
              </div>
            </div>
          </div>

          {selectedVariant?.composition && (
            <section className="product-section">
              <h2>Composition</h2>
              <p>{selectedVariant.composition}</p>
            </section>
          )}

          {selectedVariant?.indications?.length > 0 && (
            <section className="product-section">
              <h2>Therapeutic indications</h2>
              <ul className="product-indications">
                {selectedVariant.indications.map((ind) => (
                  <li key={ind}>{ind}</li>
                ))}
              </ul>
            </section>
          )}

          {(product.usageSummary || product.usageContexts?.length > 0 || selectedVariant?.usage) && (
            <section className="product-section product-usage-section">
              <div className="usage-section-head">
                <span><Activity size={15} /> Practical setting reference</span>
                <h2>Usage in real-life settings</h2>
              </div>
              <div className="usage-experience-panel">
                <div className="usage-narrative-card">
                  <span className="usage-narrative-icon" aria-hidden="true">
                    <Hospital size={22} />
                  </span>
                  <div>
                    {product.usageSummary && <p>{product.usageSummary}</p>}
                    {selectedVariant?.usage && <p className="variant-usage-note">{selectedVariant.usage}</p>}
                  </div>
                </div>
                {product.usageContexts?.length > 0 && (
                  <div className="usage-context-list" aria-label="Common usage settings">
                    {product.usageContexts.map((context, index) => {
                      const Icon = getUsageIcon(context)

                      return (
                        <span key={context} style={{ '--usage-delay': `${index * 70}ms` }}>
                          <Icon size={18} />
                          <strong>{context}</strong>
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>
            </section>
          )}

          {related.length > 0 && (
            <section className="product-section product-related">
              <div className="product-section-head">
                <h2>Related products</h2>
                <Link to={`/products?category=${product.categoryId}`}>
                  View all in {category?.name}
                </Link>
              </div>
              <div className="product-grid">
                {related.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </section>
          )}
        </Container>
      </section>
    </>
  )
}

export default ProductDetails
