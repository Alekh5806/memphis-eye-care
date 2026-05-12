import categories from '../data/categories.json'

export function getCategory(product) {
  return categories.find((category) => category.id === product.categoryId)
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
    return [
      product.name,
      category,
      product.strength,
      product.fillVolume,
      product.pack,
      product.dosageForm,
    ]
      .join(' ')
      .toLowerCase()
      .includes(value)
  })
}
