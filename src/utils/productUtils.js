import categories from '../data/categories.json'

export function getCategory(product) {
  return categories.find((category) => category.id === product.categoryId)
}

export function getProductVariants(product) {
  return Array.isArray(product?.variants) ? product.variants : []
}

export function getDefaultVariant(product) {
  return getProductVariants(product)[0] ?? null
}

export function getVariantById(product, variantId) {
  const variants = getProductVariants(product)
  return variants.find((variant) => variant.id === variantId) ?? variants[0] ?? null
}

export function getVariantBySlug(product, slug) {
  return getProductVariants(product).find((variant) => variant.slug === slug) ?? null
}

export function findProductBySlug(products, slug) {
  for (const product of products) {
    if (product.slug === slug) {
      return {
        product,
        variant: getDefaultVariant(product),
        isLegacySlug: false,
      }
    }

    const variant = getVariantBySlug(product, slug)
    if (variant || product.legacySlugs?.includes(slug)) {
      return {
        product,
        variant: variant ?? getDefaultVariant(product),
        isLegacySlug: true,
      }
    }
  }

  return {
    product: null,
    variant: null,
    isLegacySlug: false,
  }
}

export function getProductsByCategory(products, categoryId) {
  if (!categoryId || categoryId === 'all') return products
  return products.filter((product) => product.categoryId === categoryId)
}

export function searchProducts(products, query) {
  const value = query.trim().toLowerCase()
  if (!value) return products

  return products.filter((product) => {
    const category = getCategory(product)?.name ?? ''
    const variantText = getProductVariants(product)
      .map((variant) => [
        variant.strength,
        variant.fillVolume,
        variant.pack,
        variant.dosageForm,
        variant.shelfLife,
        variant.storage,
        variant.composition,
        variant.usage,
        ...(variant.indications ?? []),
      ].join(' '))
      .join(' ')

    return [
      product.name,
      product.genericName,
      category,
      product.description,
      product.usageSummary,
      ...(product.usageContexts ?? []),
      ...(product.highlights ?? []),
      variantText,
    ]
      .join(' ')
      .toLowerCase()
      .includes(value)
  })
}

export function getVariantStrengths(product) {
  return getProductVariants(product)
    .map((variant) => variant.strength)
    .filter(Boolean)
}

export function getDosageForms(product) {
  return [...new Set(getProductVariants(product).map((variant) => variant.dosageForm).filter(Boolean))]
}

export function getFillVolumes(product) {
  return [...new Set(getProductVariants(product).map((variant) => variant.fillVolume).filter(Boolean))]
}

export function getProductDetailPath(product, variant) {
  if (!product) return '/products'
  return variant?.id ? `/products/${product.slug}?variant=${encodeURIComponent(variant.id)}` : `/products/${product.slug}`
}
