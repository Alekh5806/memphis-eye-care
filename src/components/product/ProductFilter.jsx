import { Search } from 'lucide-react'
import categories from '../../data/categories.json'

function ProductFilter({ categoryId, search, onCategoryChange, onSearchChange }) {
  return (
    <div className="product-filter">
      <div className="search-field">
        <Search size={18} />
        <input
          type="search"
          placeholder="Search products, strength, volume..."
          aria-label="Search products by product, strength, volume, or dosage form"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
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
