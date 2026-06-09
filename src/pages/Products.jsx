import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Layers3, PackageSearch, SlidersHorizontal } from 'lucide-react'
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
  const totalVariants = products.reduce((sum, product) => sum + (product.variants?.length ?? 0), 0)

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
        text="Search by product name, strength, fill volume, dosage form, or therapeutic segment to review grouped product lines and their available variants."
        breadcrumbs={activeCategory ? [{ label: 'Products', path: '/products' }, { label: activeCategory.name }] : [{ label: 'Products' }]}
        image="/images/hero/pages/clinical-syringe.jpg"
        imageAlt="Sterile syringe on a reflective clinical laboratory table"
        imagePosition="center 58%"
        actions={[
          { label: 'Browse catalogue', to: '/products' },
          { label: 'Request product support', to: '/contact?type=Product%20enquiry', variant: 'outline' },
        ]}
        panelEyebrow="Catalogue intelligence"
        panelTitle="Built for fast buyer review and tender shortlisting."
        panelText="Product lines are organised by therapeutic segment, strength, fill volume, and pack format so teams can evaluate faster."
        proofPoints={['Segment-wise product discovery', 'Variant-level strength and pack data', 'Quote-ready enquiry routing']}
        stats={[
          { value: products.length, label: 'Product lines' },
          { value: totalVariants, label: 'Strength variants' },
          { value: categories.length, label: 'Segments' },
        ]}
      />
      <section className="section section-ambient products-catalogue-section">
        <Container>
          <div className="catalogue-overview" aria-label="Catalogue overview">
            <div>
              <PackageSearch size={20} />
              <strong>{products.length}</strong>
              <span>Grouped product lines</span>
            </div>
            <div>
              <Layers3 size={20} />
              <strong>{totalVariants}</strong>
              <span>Strength and pack variants</span>
            </div>
            <div>
              <SlidersHorizontal size={20} />
              <strong>{categories.length}</strong>
              <span>Therapeutic segments</span>
            </div>
          </div>
          <ProductFilter
            categoryId={categoryId}
            search={search}
            onCategoryChange={(next) => setSearchParams(next === 'all' ? {} : { category: next })}
            onSearchChange={setSearch}
          />
          <div className="products-result-meta" role="status" aria-live="polite">
            <strong>{filteredProducts.length}</strong>
            <span>{filteredProducts.length === 1 ? 'product line' : 'product lines'} {activeCategory ? `in ${activeCategory.name}` : 'available'}</span>
          </div>
          <ProductGrid products={filteredProducts} />
        </Container>
      </section>
    </>
  )
}

export default Products
