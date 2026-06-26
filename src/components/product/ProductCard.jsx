import { Link } from 'react-router-dom'
import { ArrowRight, Droplet, FlaskConical, Layers3, PackageCheck, Share2 } from 'lucide-react'
import { getCategory, getDosageForms, getFillVolumes, getProductDetailPath, getVariantStrengths } from '../../utils/productUtils'

function ProductCard({ product, variant = 'default' }) {
  const category = getCategory(product)
  const isVector = product.image?.endsWith('.svg')
  const strengths = getVariantStrengths(product)
  const dosageForms = getDosageForms(product)
  const fillVolumes = getFillVolumes(product)
  const detailPath = getProductDetailPath(product)
  const visibleStrengths = strengths.slice(0, 3)
  const remainingStrengths = strengths.length - visibleStrengths.length
  const primaryDosageForm = dosageForms[0]
  const formatLabel = primaryDosageForm === 'Prefilled Syringe' ? 'PFS' : primaryDosageForm
  const primaryStrength = strengths[0]
  const primaryVolume = fillVolumes[0]

  if (variant === 'catalogue') {
    return (
      <article className="product-card product-card-catalogue" data-category={product.categoryId}>
        <Link className={`product-catalogue-media ${isVector ? 'is-vector' : 'is-photo'}`} to={detailPath}>
          <img
            className="product-image"
            src={product.image || '/images/products/fallback.svg'}
            alt={product.name}
            loading="lazy"
          />
        </Link>
        <div className="product-catalogue-main">
          {category?.name && <span className="product-catalogue-category">{category.name}</span>}
          <h3>
            <Link to={detailPath}>{product.name}</Link>
          </h3>
          {product.genericName && <p className="product-generic">{product.genericName}</p>}
        </div>
        <div className="product-catalogue-specs" aria-label="Product summary">
          {primaryStrength && (
            <span>
              <Droplet size={16} />
              <strong title={primaryStrength}>{primaryStrength}</strong>
              <small>Strength</small>
            </span>
          )}
          {primaryVolume && (
            <span>
              <FlaskConical size={16} />
              <strong>{primaryVolume}</strong>
              <small>Volume</small>
            </span>
          )}
          {formatLabel && (
            <span>
              <Layers3 size={16} />
              <strong>{formatLabel}</strong>
              <small>Format</small>
            </span>
          )}
          <span>
            <Share2 size={16} />
            <strong>{strengths.length} {strengths.length === 1 ? 'Variant' : 'Variants'}</strong>
            <small>Variants</small>
          </span>
        </div>
        <Link className="product-catalogue-action" to={detailPath} aria-label={`View ${product.name} details`}>
          <span>View</span>
          <ArrowRight size={22} />
        </Link>
      </article>
    )
  }

  return (
    <article className="product-card">
      <Link className={`product-image-link ${isVector ? 'is-vector' : 'is-photo'}`} to={detailPath}>
        {category?.name && <span className="product-image-badge">{category.name}</span>}
        <span className="product-line-badge">{strengths.length} {strengths.length === 1 ? 'variant' : 'variants'}</span>
        <img
          className="product-image"
          src={product.image || '/images/products/fallback.svg'}
          alt={product.name}
          loading="lazy"
        />
      </Link>
      <div className="product-card-body">
        <h3>
          <Link to={detailPath}>{product.name}</Link>
        </h3>
        {product.genericName && <p className="product-generic">{product.genericName}</p>}
        {product.usageSummary && <p className="product-card-summary">{product.usageSummary}</p>}

        <div className="product-variant-summary" aria-label="Available strengths">
          {visibleStrengths.map((strength) => (
            <span key={strength}>{strength}</span>
          ))}
          {remainingStrengths > 0 && <span>+{remainingStrengths} more</span>}
        </div>

        <div className="product-card-spec-strip" aria-label="Product format summary">
          <div>
            <small>Format</small>
            <strong>{formatLabel}</strong>
          </div>
          <div>
            <small>Volume</small>
            <strong>{fillVolumes.length === 1 ? fillVolumes[0] : `${fillVolumes.length} options`}</strong>
          </div>
          <div>
            <small>Variants</small>
            <strong>{strengths.length}</strong>
          </div>
        </div>

        <div className="product-card-footer">
          <span className="dosage-pill product-line-status">
            {strengths.length > 1 ? <Layers3 size={15} /> : <PackageCheck size={15} />}
            {strengths.length > 1 ? 'Multiple strengths' : 'Single presentation'}
          </span>
          <Link className="text-link" to={detailPath}>
            View details <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
