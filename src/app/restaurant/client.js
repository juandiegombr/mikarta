import restaurants from '../../server/restaurants.json'

const getById = id => {
  return Promise.resolve(restaurants.find(restaurant => restaurant.id === id))
}

export const RestaurantClient = {
  getById,
}
