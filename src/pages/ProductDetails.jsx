import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Download, Mail, PackageCheck, ShieldCheck, Snowflake, Thermometer } from 'lucide-react'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import DocumentHead from '../components/common/DocumentHead'
import ProductCard from '../components/product/ProductCard'
import products from '../data/products.json'
import company from '../data/company.json'
import { getCategory } from '../utils/productUtils'

function ProductDetails() {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)

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
  const mailSubject = encodeURIComponent(`Product enquiry: ${product.name}`)
  const related = products.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `https://www.memphisvisioncare.com${product.image}`,
    category: category?.name,
    brand: { '@type': 'Brand', name: company.shortName },
    manufacturer: { '@type': 'Organization', name: company.name },
  }

  return (
    <>
      <DocumentHead
        title={product.name}
        description={product.description}
        image={product.image?.startsWith('http') ? product.image : `https://www.memphisvisioncare.com${product.image}`}
        structuredData={jsonLd}
      />
      <section className="section product-detail-section">
        <Container>
          <Link className="back-link" to="/products">
            <ArrowLeft size={16} /> Back to products
          </Link>

          <div className="product-detail-layout">
            <div className="product-detail-media">
              <img src={product.image} alt={product.name} loading="eager" />
              <div className="product-detail-media-glow" aria-hidden="true" />
            </div>

            <div className="product-detail-copy">
              <span className="product-category">{category?.name}</span>
              <h1>{product.name}</h1>
              {product.genericName && <p className="product-generic">{product.genericName}</p>}
              <p>{product.description}</p>

              <dl className="spec-grid">
                <div><dt>Strength</dt><dd>{product.strength}</dd></div>
                <div><dt>Fill volume</dt><dd>{product.fillVolume}</dd></div>
                <div><dt>Pack</dt><dd>{product.pack}</dd></div>
                <div><dt>Dosage form</dt><dd>{product.dosageForm}</dd></div>
                {product.shelfLife && <div><dt>Shelf life</dt><dd>{product.shelfLife}</dd></div>}
                {product.storage && <div><dt>Storage</dt><dd>{product.storage}</dd></div>}
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
                <Button to={`/contact?type=Product%20enquiry&product=${encodeURIComponent(product.name)}`} variant="outline">
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
                {product.storage?.includes('2–8') && (
                  <span><Snowflake size={14} /> Cold-chain compliant</span>
                )}
              </div>
            </div>
          </div>

          {product.composition && (
            <section className="product-section">
              <h2>Composition</h2>
              <p>{product.composition}</p>
            </section>
          )}

          {product.indications?.length > 0 && (
            <section className="product-section">
              <h2>Therapeutic indications</h2>
              <ul className="product-indications">
                {product.indications.map((ind) => (
                  <li key={ind}>{ind}</li>
                ))}
              </ul>
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
