import products from '../../server/products.json'

const getAll = () => {
  return Promise.resolve(products)
}

const getAllByCategoryId = id => {
  const filteredProducts = products.filter(product => product.categoryId === id)
  return Promise.resolve(filteredProducts)
}

export const ProductClient = {
  getAll,
  getAllByCategoryId,
}
