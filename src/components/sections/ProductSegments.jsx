import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import categories from '../../data/categories.json'
import Button from '../common/Button'
import Container from '../common/Container'
import { panelReveal, revealInView, revealTransition, riseReveal } from '../../utils/revealMotion'

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
          <motion.div
            className="section-heading"
            variants={riseReveal}
            {...revealInView}
            transition={revealTransition()}
          >
            <span className="eyebrow">Therapeutic focus</span>
            <h2>Sterile PFS solutions for every critical care need.</h2>
            <p>
              Purpose-built presentations for ophthalmic, cardiac critical care,
              orthopaedic, and gynaecology applications.
            </p>
            <Button to="/products">Explore our products</Button>
          </motion.div>
          <motion.div
            className="therapeutic-focus-media"
            aria-hidden="true"
            variants={panelReveal}
            {...revealInView}
            transition={revealTransition(0.12, 0.65)}
          >
            <img src="/images/hero/optimized/cleanroom-manufacturing.jpg" alt="" loading="lazy" />
          </motion.div>
        </div>
        <motion.div
          className="segment-grid"
          {...revealInView}
          transition={{ staggerChildren: 0.08 }}
        >
          {categories.map((category, index) => {
            const meta = categoryMeta[category.id] ?? categoryMeta['ophthalmic-care']

            return (
              <motion.div
                key={category.id}
                variants={riseReveal}
                transition={revealTransition(index * 0.05)}
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
        </motion.div>
      </Container>
    </section>
  )
}

export default ProductSegments
