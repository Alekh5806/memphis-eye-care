import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Container from '../components/common/Container'
import PageHero from '../components/common/PageHero'
import ProductFilter from '../components/product/ProductFilter'
import ProductGrid from '../components/product/ProductGrid'
import products from '../data/products.json'
import { getProductsByCategory, searchProducts } from '../utils/productUtils'

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const categoryId = searchParams.get('category') || 'all'

  const filteredProducts = useMemo(() => {
    return searchProducts(getProductsByCategory(products, categoryId), search)
  }, [categoryId, search])

  function handleCategoryChange(nextCategoryId) {
    if (nextCategoryId === 'all') {
      setSearchParams({})
      return
    }
    setSearchParams({ category: nextCategoryId })
  }

  return (
    <>
      <PageHero
        eyebrow="Product catalogue"
        title="Sterile prefilled syringe products organized for fast buyer review."
        text="Search by product name or filter by therapeutic segment to review strengths, fill volumes, dosage form, and pack information."
      />
      <section className="section">
        <Container>
          <ProductFilter
            categoryId={categoryId}
            search={search}
            onCategoryChange={handleCategoryChange}
            onSearchChange={setSearch}
          />
          <ProductGrid products={filteredProducts} />
        </Container>
      </section>
    </>
  )
}

export default Products
