import { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import categories from '../../data/categories.json'

function ProductFilter({ categoryId, search, onCategoryChange, onSearchChange }) {
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
      <div className="search-field">
        <Search size={18} />
        <input
          ref={inputRef}
          type="search"
          placeholder="Search products, strength, volume..."
          aria-label="Search products by product, strength, volume, or dosage form"
          value={draftSearch}
          onChange={(event) => setDraftSearch(event.target.value)}
        />
      </div>
      <div className="segment-control" aria-label="Filter product segment">
        <button
          className={categoryId === 'all' ? 'is-selected' : ''}
          type="button"
          onClick={() => onCategoryChange('all')}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={categoryId === category.id ? 'is-selected' : ''}
            type="button"
            onClick={() => onCategoryChange(category.id)}
          >
            {category.shortName}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductFilter
