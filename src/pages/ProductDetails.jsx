import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Download, Mail, PackageCheck } from 'lucide-react'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
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

  return (
    <section className="section product-detail-section">
      <Container>
        <Link className="back-link" to="/products">
          <ArrowLeft size={16} />
          Back to products
        </Link>

        <div className="product-detail-layout">
          <div className="product-detail-media">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-copy">
            <span className="product-category">{category?.name}</span>
            <h1>{product.name}</h1>
            <p>{product.description}</p>

            <dl className="spec-grid">
              <div>
                <dt>Strength</dt>
                <dd>{product.strength}</dd>
              </div>
              <div>
                <dt>Fill volume</dt>
                <dd>{product.fillVolume}</dd>
              </div>
              <div>
                <dt>Pack</dt>
                <dd>{product.pack}</dd>
              </div>
              <div>
                <dt>Dosage form</dt>
                <dd>{product.dosageForm}</dd>
              </div>
            </dl>

            <div className="highlight-list">
              {product.highlights.map((highlight) => (
                <span key={highlight}>
                  <PackageCheck size={17} />
                  {highlight}
                </span>
              ))}
            </div>

            <div className="detail-actions">
              <Button href={`mailto:${company.email}?subject=${mailSubject}`}>
                <Mail size={18} />
                Enquire now
              </Button>
              <Button href={company.brochure} variant="secondary">
                <Download size={18} />
                Brochure
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ProductDetails
