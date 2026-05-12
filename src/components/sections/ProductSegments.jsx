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
          title="Product segments designed for serious healthcare buyers."
          text="Each segment can be expanded through JSON data, so the catalogue stays easy to maintain as new products and photos are added."
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
