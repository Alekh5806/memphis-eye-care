import products from '../../data/products.json'
import Button from '../common/Button'
import Container from '../common/Container'
import SectionHeading from '../common/SectionHeading'
import ProductGrid from '../product/ProductGrid'

function FeaturedProducts() {
  const featuredProducts = products.filter((product) => product.featured)

  return (
    <section className="section">
      <Container>
        <div className="section-topline">
          <SectionHeading
            eyebrow="Featured catalogue"
            title="Products generated directly from JSON data."
            text="Add a product to products.json and it can appear across listings, detail pages, and featured sections."
          />
          <Button to="/products" variant="secondary">View all products</Button>
        </div>
        <ProductGrid products={featuredProducts} />
      </Container>
    </section>
  )
}

export default FeaturedProducts
