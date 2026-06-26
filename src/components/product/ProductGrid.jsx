import ProductCard from './ProductCard'

function ProductGrid({ products, variant = 'default' }) {
  if (!products.length) {
    return (
      <div className="empty-state">
        <h3>No products found</h3>
        <p>Try changing the search term or product segment.</p>
      </div>
    )
  }

  return (
    <div className={`product-grid ${variant === 'catalogue' ? 'product-grid-catalogue' : ''}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant={variant} />
      ))}
    </div>
  )
}

export default ProductGrid
