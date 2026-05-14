import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import categories from '../../data/categories.json'
import SectionHeading from '../common/SectionHeading'
import Container from '../common/Container'

function ProductSegments() {
  return (
    <section className="section">
      <Container>
        <SectionHeading
          eyebrow="Therapeutic focus"
          title="Sterile prefilled syringe segments presented with real healthcare context."
          text="Explore focused product categories for ophthalmic, critical care, orthopaedic, and gynaecology requirements. Real-world imagery keeps the template credible while the structure stays simple for buyers to scan."
        />
        <div className="segment-grid">
          {categories.map((category) => (
            <Link className="segment-card" key={category.id} to={`/products?category=${category.id}`}>
              <img src={category.image} alt={category.name} loading="lazy" />
              <span>{category.shortName}</span>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <strong>
                View products <ArrowRight size={16} />
              </strong>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default ProductSegments
