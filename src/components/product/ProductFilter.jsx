import { useEffect, useRef, useState } from 'react'
import { Bone, Eye, Grid2X2, HeartPulse, Search, SlidersHorizontal, Venus } from 'lucide-react'
import categories from '../../data/categories.json'

const categoryIcons = {
  'ophthalmic-care': Eye,
  'cardiac-critical-care': HeartPulse,
  'orthopaedic-care': Bone,
  'gynaecology-care': Venus,
}

function ProductFilter({
  activeFilterCount = 0,
  categoryId,
  filtersOpen = true,
  onCategoryChange,
  onFiltersToggle,
  onSearchChange,
  search,
}) {
  const [draftSearch, setDraftSearch] = useState(search)
  const inputRef = useRef(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (document.activeElement !== inputRef.current) {
        setDraftSearch(search)
      }
    }, 0)

    return () => window.clearTimeout(timer)
  }, [search])

  useEffect(() => {
    const normalizedDraft = draftSearch.trim()
    const normalizedSearch = search.trim()

    if (normalizedDraft === normalizedSearch) return undefined

    const timer = window.setTimeout(() => {
      onSearchChange(draftSearch)
    }, 180)

    return () => window.clearTimeout(timer)
  }, [draftSearch, onSearchChange, search])

  return (
    <div className="product-filter">
      <div className="product-filter-primary">
        <div className="search-field">
          <Search size={20} />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search products..."
            aria-label="Search products by product, strength, volume, or dosage form"
            value={draftSearch}
            onChange={(event) => setDraftSearch(event.target.value)}
          />
        </div>
        <button
          className={`product-filter-toggle ${filtersOpen || activeFilterCount > 0 ? 'is-active' : ''}`.trim()}
          type="button"
          aria-controls="product-segment-control product-quick-filters"
          aria-expanded={filtersOpen}
          onClick={onFiltersToggle}
        >
          <SlidersHorizontal size={18} />
          Filters
          {activeFilterCount > 0 && (
            <span className="product-filter-count" aria-label={`${activeFilterCount} active filters`}>
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>
      <div
        id="product-segment-control"
        className={`segment-control ${filtersOpen ? 'is-open' : ''}`}
        aria-label="Filter product segment"
      >
        <button
          className={categoryId === 'all' ? 'is-selected' : ''}
          type="button"
          onClick={() => onCategoryChange('all')}
        >
          <Grid2X2 size={17} />
          All Categories
        </button>
        {categories.map((category) => {
          const Icon = categoryIcons[category.id] ?? Grid2X2

          return (
            <button
              key={category.id}
              className={categoryId === category.id ? 'is-selected' : ''}
              type="button"
              onClick={() => onCategoryChange(category.id)}
            >
              <Icon size={17} />
              {category.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ProductFilter
