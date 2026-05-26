import { Link } from 'react-router-dom'
import { ArrowRight, PackageCheck } from 'lucide-react'
import { getCategory } from '../../utils/productUtils'

function ProductCard({ product }) {
  const category = getCategory(product)
  const isVector = product.image?.endsWith('.svg')

  return (
    <article className="product-card">
      <Link className={`product-image-link ${isVector ? 'is-vector' : 'is-photo'}`} to={`/products/${product.slug}`}>
        {category?.name && <span className="product-image-badge">{category.name}</span>}
        <img
          className="product-image"
          src={product.image || '/images/products/fallback.svg'}
          alt={product.name}
          loading="lazy"
        />
      </Link>
      <div className="product-card-body">
        <h3>
          <Link to={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        {product.genericName && <p className="product-generic">{product.genericName}</p>}
        <div className="product-meta">
          <span>{product.strength}</span>
          <span>{product.fillVolume}</span>
          <span>{product.pack}</span>
        </div>
        <div className="product-card-footer">
          <span className="dosage-pill">
            <PackageCheck size={15} />
            {product.dosageForm}
          </span>
          <Link className="text-link" to={`/products/${product.slug}`}>
            View <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
