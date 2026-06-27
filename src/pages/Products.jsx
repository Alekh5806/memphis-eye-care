import { startTransition, useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BadgeCheck, ChevronDown, ChevronLeft, ChevronRight, Eraser, Globe2, Plus, ShieldCheck, Stethoscope } from 'lucide-react'
import Container from '../components/common/Container'
import DocumentHead from '../components/common/DocumentHead'
import PageHero from '../components/common/PageHero'
import ProductFilter from '../components/product/ProductFilter'
import ProductGrid from '../components/product/ProductGrid'
import products from '../data/products.json'
import categories from '../data/categories.json'
import { getDosageForms, getProductsByCategory, getVariantStrengths, searchProducts } from '../utils/productUtils'

const PAGE_SIZE = 4
const TRUST_CARDS = [
  {
    icon: ShieldCheck,
    title: 'Quality Assured',
    text: 'Manufactured under strict GMP standards ensuring safety and consistency.',
  },
  {
    icon: Stethoscope,
    title: 'Clinical Grade',
    text: 'Trusted by healthcare professionals in critical care and surgical settings.',
  },
  {
    icon: Globe2,
    title: 'Global Supply',
    text: 'Consistent availability with on-time delivery across global markets.',
  },
]

function formatPresentation(form) {
  if (!form) return 'Other'
  if (form === 'Prefilled Syringe') return 'PFS'
  return form
}

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const categoryId = searchParams.get('category') || 'all'
  const sort = searchParams.get('sort') || 'catalogue'
  const activeCategory = categories.find((c) => c.id === categoryId)

  const [selectedStrengths, setSelectedStrengths] = useState([])
  const [selectedPresentations, setSelectedPresentations] = useState([])
  const [filtersOpen, setFiltersOpen] = useState(true)
  const [page, setPage] = useState(1)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const resetCataloguePosition = useCallback(() => {
    setPage(1)
    setVisibleCount(PAGE_SIZE)
  }, [])

  const resetFacetSelections = useCallback(() => {
    setSelectedStrengths([])
    setSelectedPresentations([])
  }, [])

  const updateProductParams = useCallback((nextValues) => {
    const nextCategory = nextValues.category ?? categoryId
    const nextSearch = nextValues.search ?? search
    const nextSort = nextValues.sort ?? sort
    const params = {}

    if (nextCategory && nextCategory !== 'all') params.category = nextCategory
    if (nextSearch.trim()) params.search = nextSearch.trim()
    if (nextSort && nextSort !== 'catalogue') params.sort = nextSort

    startTransition(() => {
      setSearchParams(params)
    })
  }, [categoryId, search, setSearchParams, sort])

  const handleCategoryChange = useCallback((next) => {
    resetFacetSelections()
    resetCataloguePosition()
    updateProductParams({ category: next })
  }, [resetCataloguePosition, resetFacetSelections, updateProductParams])
  const handleSearchChange = useCallback((next) => {
    resetCataloguePosition()
    updateProductParams({ search: next })
  }, [resetCataloguePosition, updateProductParams])
  const handleSortChange = useCallback((event) => {
    resetCataloguePosition()
    updateProductParams({ sort: event.target.value })
  }, [resetCataloguePosition, updateProductParams])

  const categoryProducts = useMemo(
    () => getProductsByCategory(products, categoryId),
    [categoryId],
  )

  // Facet source: category + search (selected facets do not narrow facet options)
  const facetPool = useMemo(
    () => searchProducts(categoryProducts, search),
    [categoryProducts, search],
  )

  const strengthFacets = useMemo(() => {
    const counts = new Map()
    facetPool.forEach((product) => {
      const seen = new Set()
      getVariantStrengths(product).forEach((s) => {
        if (!s || seen.has(s)) return
        seen.add(s)
        counts.set(s, (counts.get(s) ?? 0) + 1)
      })
    })
    return [...counts.entries()]
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => a.value.localeCompare(b.value, undefined, { numeric: true }))
  }, [facetPool])

  const presentationFacets = useMemo(() => {
    const counts = new Map()
    facetPool.forEach((product) => {
      const seen = new Set()
      getDosageForms(product).forEach((f) => {
        const label = formatPresentation(f)
        if (seen.has(label)) return
        seen.add(label)
        counts.set(label, (counts.get(label) ?? 0) + 1)
      })
    })
    return [...counts.entries()]
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value))
  }, [facetPool])

  const filteredProducts = useMemo(() => {
    let list = searchProducts(getProductsByCategory(products, categoryId), search)

    if (selectedStrengths.length > 0) {
      list = list.filter((product) => {
        const strengths = new Set(getVariantStrengths(product))
        return selectedStrengths.some((s) => strengths.has(s))
      })
    }

    if (selectedPresentations.length > 0) {
      list = list.filter((product) => {
        const forms = new Set(getDosageForms(product).map(formatPresentation))
        return selectedPresentations.some((p) => forms.has(p))
      })
    }

    return list
  }, [categoryId, search, selectedStrengths, selectedPresentations])

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sort === 'za') return b.name.localeCompare(a.name)
      if (sort === 'az') return a.name.localeCompare(b.name)
      if (sort === 'variants') return (b.variants?.length ?? 0) - (a.variants?.length ?? 0)
      return products.findIndex((product) => product.id === a.id) - products.findIndex((product) => product.id === b.id)
    })
  }, [filteredProducts, sort])

  const totalVariants = useMemo(() => {
    return products.reduce((sum, product) => sum + (product.variants?.length ?? 0), 0)
  }, [])

  const totalCount = sortedProducts.length
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)

  const pageStart = (safePage - 1) * PAGE_SIZE
  const pageMaxEnd = Math.min(pageStart + PAGE_SIZE, totalCount)
  const cappedEnd = Math.min(pageStart + Math.max(visibleCount, PAGE_SIZE), pageMaxEnd)
  const pageItems = sortedProducts.slice(pageStart, cappedEnd)
  const hasMoreOnPage = cappedEnd < pageMaxEnd
  const remainingOnPage = pageMaxEnd - cappedEnd
  const showingFrom = totalCount === 0 ? 0 : pageStart + 1
  const showingTo = cappedEnd

  const toggleStrength = (value) => {
    resetCataloguePosition()
    setSelectedStrengths((prev) => prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value])
  }
  const togglePresentation = (value) => {
    resetCataloguePosition()
    setSelectedPresentations((prev) => prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value])
  }
  const clearAllFilters = () => {
    resetCataloguePosition()
    resetFacetSelections()
    updateProductParams({ category: 'all', search: '' })
  }
  const activeFilterCount =
    selectedStrengths.length +
    selectedPresentations.length +
    (categoryId !== 'all' ? 1 : 0)
  const hasActiveFilters = activeFilterCount > 0 || Boolean(search)

  const heroTitle = activeCategory
    ? `${activeCategory.name} — Sterile PFS catalogue`
    : 'Sterile prefilled syringe products organised for fast buyer review.'
  const mobileHeroTitle = activeCategory
    ? `${activeCategory.name} PFS`
    : 'Sterile PFS catalogue.'

  return (
    <>
      <DocumentHead
        title={activeCategory ? `${activeCategory.name} Products` : 'Sterile PFS Product Catalogue'}
        description={`Browse Memphis Vision Care's ${activeCategory?.name || 'sterile prefilled syringe'} portfolio with strengths, fill volumes, and pack details for hospitals and distributors.`}
        canonicalPath={activeCategory ? `/products?category=${categoryId}` : '/products'}
      />
      <PageHero
        eyebrow="Product catalogue"
        title={heroTitle}
        text="Search by product name, strength, fill volume, dosage form, or therapeutic segment to review grouped product lines and their available variants."
        mobileTitle={mobileHeroTitle}
        mobileText="Find product lines, strengths, and pack formats faster."
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
          <ProductFilter
            activeFilterCount={activeFilterCount}
            categoryId={categoryId}
            filtersOpen={filtersOpen}
            search={search}
            onCategoryChange={handleCategoryChange}
            onFiltersToggle={() => setFiltersOpen((current) => !current)}
            onSearchChange={handleSearchChange}
          />

          <div className={`catalogue-layout ${filtersOpen ? 'filters-open' : 'filters-closed'}`}>
            <aside
              id="product-quick-filters"
              className="catalogue-sidebar catalogue-sidebar-filters"
              aria-label="Quick filters"
            >
              <div className="quick-filter-card">
                <div className="quick-filter-heading">Quick Filters</div>
                <FacetGroup
                  title="Strength"
                  options={strengthFacets}
                  selected={selectedStrengths}
                  onToggle={toggleStrength}
                  emptyLabel="No strengths available"
                />
                <FacetGroup
                  title="Presentation"
                  options={presentationFacets}
                  selected={selectedPresentations}
                  onToggle={togglePresentation}
                  emptyLabel="No presentations available"
                />
                <button
                  type="button"
                  className="quick-filter-clear"
                  onClick={clearAllFilters}
                  disabled={!hasActiveFilters}
                >
                  <Eraser size={15} aria-hidden="true" />
                  Clear Filters
                </button>
              </div>
            </aside>

            <div className="catalogue-results">
              <div className="catalogue-toolbar">
                <div className="catalogue-toolbar-meta" role="status" aria-live="polite">
                  <span className="catalogue-toolbar-kicker">Catalogue results</span>
                  <span>
                    {totalCount > 0 ? (
                      <>
                        Showing <strong>{showingFrom}&ndash;{showingTo}</strong> of <strong>{totalCount}</strong>{' '}
                        {totalCount === 1 ? 'product line' : 'product lines'}
                      </>
                    ) : (
                      'No product lines match the current filters'
                    )}
                  </span>
                </div>
                <label className="product-sort-control">
                  <span>Sort by:</span>
                  <select value={sort} onChange={handleSortChange} aria-label="Sort products">
                    <option value="catalogue">Catalogue</option>
                    <option value="az">A to Z</option>
                    <option value="za">Z to A</option>
                    <option value="variants">Most variants</option>
                  </select>
                  <ChevronDown size={16} aria-hidden="true" />
                </label>
              </div>

              <ProductGrid products={pageItems} variant="catalogue" />

              {totalCount > 0 && (
                <div className="catalogue-pagination">
                  <div className="catalogue-pagination-meta">
                    Showing <strong>{showingFrom}&ndash;{showingTo}</strong> of <strong>{totalCount}</strong>
                  </div>

                  {hasMoreOnPage && (
                    <button
                      type="button"
                      className="catalogue-view-more"
                      onClick={() => setVisibleCount((current) => current + PAGE_SIZE)}
                    >
                      <Plus size={16} aria-hidden="true" />
                      View {remainingOnPage} more
                      <ChevronDown size={16} aria-hidden="true" />
                    </button>
                  )}

                  {totalPages > 1 && (
                    <nav className="catalogue-pages" aria-label="Pagination">
                      <button
                        type="button"
                        className="catalogue-page-step"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={safePage === 1}
                        aria-label="Previous page"
                      >
                        <ChevronLeft size={16} aria-hidden="true" />
                      </button>
                      {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
                        <button
                          key={p}
                          type="button"
                          className={`catalogue-page-num ${p === safePage ? 'is-current' : ''}`}
                          aria-current={p === safePage ? 'page' : undefined}
                          onClick={() => { setPage(p); setVisibleCount(PAGE_SIZE) }}
                        >
                          {p}
                        </button>
                      ))}
                      <button
                        type="button"
                        className="catalogue-page-step"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={safePage === totalPages}
                        aria-label="Next page"
                      >
                        <ChevronRight size={16} aria-hidden="true" />
                      </button>
                    </nav>
                  )}
                </div>
              )}
            </div>
          </div>

          <section className="catalogue-assurance-panel" aria-label="Why buyers choose Memphis Vision Care">
            <div className="assurance-panel-copy">
              <span>Buyer confidence</span>
              <h2>Built for product review, tender checks, and export-ready enquiries.</h2>
              <p>Quality systems, clinical-use context, and supply support stay close to the catalogue without taking space from the products.</p>
            </div>

            <div className="assurance-proof-list">
              {TRUST_CARDS.map(({ icon: Icon, title, text }) => (
                <article key={title} className="assurance-proof-item">
                  <span className="assurance-proof-icon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>

            <article className="assurance-quote-panel">
              <span className="assurance-proof-icon" aria-hidden="true">
                <BadgeCheck size={18} />
              </span>
              <div>
                <h3>Need a custom quote?</h3>
                <p>Share target products, volumes, market, and timelines.</p>
              </div>
              <a className="assurance-card-link" href="/contact?type=Product%20enquiry">
                Request quote
                <ChevronRight size={15} aria-hidden="true" />
              </a>
            </article>
          </section>
        </Container>
      </section>
    </>
  )
}

function FacetGroup({ title, options, selected, onToggle, emptyLabel }) {
  const [open, setOpen] = useState(true)

  return (
    <div className={`facet-group ${open ? 'is-open' : 'is-closed'}`}>
      <button
        type="button"
        className="facet-group-header"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{title}</span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>
      {open && (
        <ul className="facet-list">
          {options.length === 0 && <li className="facet-empty">{emptyLabel}</li>}
          {options.map(({ value, count }) => {
            const checked = selected.includes(value)
            return (
              <li key={value}>
                <label className={`facet-option ${checked ? 'is-selected' : ''}`}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(value)}
                  />
                  <span className="facet-option-box" aria-hidden="true" />
                  <span className="facet-option-label">{value}</span>
                  <span className="facet-option-count">({count})</span>
                </label>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Products
