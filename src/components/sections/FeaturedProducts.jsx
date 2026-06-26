import { motion } from 'framer-motion'
import products from '../../data/products.json'
import Button from '../common/Button'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import ProductGrid from '../product/ProductGrid'
import { revealInView, revealTransition, riseReveal } from '../../utils/revealMotion'

function FeaturedProducts() {
  const featuredProducts = products.filter((product) => product.featured)

  return (
    <section className="section featured-products-section">
      <Container>
        <motion.div
          className="section-topline"
          variants={riseReveal}
          {...revealInView}
          transition={revealTransition()}
        >
          <SectionHeading
            eyebrow="Featured catalogue"
            title="Highlighted sterile PFS products for quick review."
            text="Featured products give buyers a fast view of dosage form, strength, pack size, and therapeutic segment before they move into the complete catalogue."
          />
          <Button to="/products" variant="secondary">View all products</Button>
        </motion.div>
        <motion.div variants={riseReveal} {...revealInView} transition={revealTransition(0.1)}>
          <ProductGrid products={featuredProducts} />
        </motion.div>
      </Container>
    </section>
  )
}

export default FeaturedProducts
