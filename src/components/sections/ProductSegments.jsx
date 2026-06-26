import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import categories from '../../data/categories.json'
import Button from '../common/Button'
import Container from '../common/Container'

const categoryMeta = {
  'ophthalmic-care': { accent: '#1d4480' },
  'cardiac-critical-care': { accent: '#0f8f83' },
  'orthopaedic-care': { accent: '#8066c6' },
  'gynaecology-care': { accent: '#cf5b78' },
}

function ProductSegments() {
  return (
    <section className="section therapeutic-focus-section" id="home-products">
      <Container>
        <div className="therapeutic-focus-intro">
          <div className="section-heading">
            <span className="eyebrow">Therapeutic focus</span>
            <h2>Sterile PFS solutions for every critical care need.</h2>
            <p>
              Purpose-built presentations for ophthalmic, cardiac critical care,
              orthopaedic, and gynaecology applications.
            </p>
            <Button to="/products">Explore our products</Button>
          </div>
          <div className="therapeutic-focus-media" aria-hidden="true">
            <img src="/images/hero/optimized/cleanroom-manufacturing.jpg" alt="" loading="lazy" />
          </div>
        </div>
        <div className="segment-grid">
          {categories.map((category, i) => {
            const meta = categoryMeta[category.id] ?? categoryMeta['ophthalmic-care']

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.42, delay: i * 0.06 }}
              >
                <Link
                  className="segment-card"
                  to={`/products?category=${category.id}`}
                  style={{ '--segment-accent': meta.accent }}
                >
                  <div className="segment-card-media">
                    <img src={category.image} alt={`${category.name} application`} loading="lazy" />
                  </div>
                  <div className="segment-card-body">
                    <span>{category.shortName}</span>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <strong>View products</strong>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default ProductSegments
