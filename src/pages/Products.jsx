import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Container from '../components/common/Container'
import DocumentHead from '../components/common/DocumentHead'
import PageHero from '../components/common/PageHero'
import ProductFilter from '../components/product/ProductFilter'
import ProductGrid from '../components/product/ProductGrid'
import products from '../data/products.json'
import categories from '../data/categories.json'
import { getProductsByCategory, searchProducts } from '../utils/productUtils'

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const categoryId = searchParams.get('category') || 'all'
  const activeCategory = categories.find((c) => c.id === categoryId)

  const filteredProducts = useMemo(() => {
    return searchProducts(getProductsByCategory(products, categoryId), search)
  }, [categoryId, search])

  const heroTitle = activeCategory
    ? `${activeCategory.name} — Sterile PFS catalogue`
    : 'Sterile prefilled syringe products organised for fast buyer review.'

  return (
    <>
      <DocumentHead
        title={activeCategory ? `${activeCategory.name} Products` : 'Sterile PFS Product Catalogue'}
        description={`Browse Memphis Vision Care's ${activeCategory?.name || 'sterile prefilled syringe'} portfolio with strengths, fill volumes, and pack details for hospitals and distributors.`}
      />
      <PageHero
        eyebrow="Product catalogue"
        title={heroTitle}
        text="Search by product name or filter by therapeutic segment to review strengths, fill volumes, dosage form, and pack information."
        breadcrumbs={activeCategory ? [{ label: 'Products', path: '/products' }, { label: activeCategory.name }] : [{ label: 'Products' }]}
      />
      <section className="section">
        <Container>
          <ProductFilter
            categoryId={categoryId}
            search={search}
            onCategoryChange={(next) => setSearchParams(next === 'all' ? {} : { category: next })}
            onSearchChange={setSearch}
          />
          <div className="products-result-meta" role="status" aria-live="polite">
            <strong>{filteredProducts.length}</strong>
            <span>{filteredProducts.length === 1 ? 'product' : 'products'} {activeCategory ? `in ${activeCategory.name}` : 'available'}</span>
          </div>
          <ProductGrid products={filteredProducts} />
        </Container>
      </section>
    </>
  )
}

export default Products
