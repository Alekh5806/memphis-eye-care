import products from '../../data/products.json'
import Button from '../common/Button'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import ProductGrid from '../product/ProductGrid'

function FeaturedProducts() {
  const featuredProducts = products.filter((product) => product.featured)

  return (
    <section className="section featured-products-section">
      <Container>
        <div className="section-topline">
          <SectionHeading
            eyebrow="Featured catalogue"
            title="Highlighted sterile PFS products for quick review."
            text="Featured products give buyers a fast view of dosage form, strength, pack size, and therapeutic segment before they move into the complete catalogue."
          />
          <Button to="/products" variant="secondary">View all products</Button>
        </div>
        <ProductGrid products={featuredProducts} />
      </Container>
    </section>
  )
}

export default FeaturedProducts
