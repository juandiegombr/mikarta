import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { CategoryClient } from 'app/category/client'
import { RestaurantClient } from 'app/restaurant/client'

const Categories = () => {
  const { restaurantId } = useParams()
  const [ categories, setCategories ] = useState([])
  const [ restaurant, setRestaurant ] = useState({})

  useEffect(() => {
    (async () => {
      getCategories()
      getRestaurant()
    })()
  }, [restaurantId])

  const getRestaurant = async () => {
    const restaurant = await RestaurantClient.getById(restaurantId)
    document.title = `Mikarta - ${ restaurant.name }`
    setRestaurant(restaurant)
  }

  const getCategories = async () => {
    const categories = await CategoryClient.getAllByRestaurantId(restaurantId)
    setCategories(categories)
  }

  const getProductsUrl = id => `/restaurant/${ restaurantId }/category/${ id }`

  return (
    <main className="home-page">
      <header className="home-header">
        <p className="home-header__subtitle">{ restaurant.type }</p>
        <h1 className="home-header__title">{ restaurant.name }</h1>
      </header>
      {/* <input
        className="search"
        role="search"
        type="text"
        placeholder="Buscar"
      /> */}
      <section className="category-container">
        {
          categories.map(({ id, name, icon }) => (
            <Link
              key={ id }
              to={ getProductsUrl(id) }
              className="category-button"
            >
              <i className={ icon }></i>
              <div>{ name }</div>
            </Link>
          ))
        }
      </section>
    </main>
  )
}

export { Categories }
