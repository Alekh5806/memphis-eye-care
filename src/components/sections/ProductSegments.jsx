import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
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
          {categories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.42, delay: i * 0.06 }}
            >
              <Link className="segment-card" to={`/products?category=${category.id}`}>
              <img src={category.image} alt={category.name} loading="lazy" />
              <span>{category.shortName}</span>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <strong>
                View products <ArrowRight size={16} />
              </strong>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default ProductSegments
