import categories from '../../server/categories.json'

const getAllByRestaurantId = id => {
  return Promise.resolve(categories.filter(category => category.restaurantId === id))
}

export const CategoryClient = {
  getAllByRestaurantId,
}
