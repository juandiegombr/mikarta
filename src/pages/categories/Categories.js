import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { CategoryClient } from 'app/category/client'
import { PlaceClient } from 'app/place/client'
import { KEYS } from 'services/Storage'

const Categories = () => {
  const { restaurantId } = useParams()
  const [ categories, setCategories ] = useState([])
  const [ restaurant, setRestaurant ] = useState({})

  useEffect(() => {
    (async () => {
      const localPlaceId = sessionStorage.getItem(KEYS.PLACE_ID)
      if (localPlaceId !== null && restaurantId !== localPlaceId) {
        sessionStorage.clear()
      }
      sessionStorage.setItem(KEYS.PLACE_ID, restaurantId)
      const restaurant = await PlaceClient.getById(restaurantId)
      document.title = `Mikarta - ${ restaurant.name }`
      setRestaurant(restaurant)
      const categories = await CategoryClient.getAllByRestaurantId(restaurantId)
      setCategories(categories)
    })()
  }, [restaurantId])

  const getProductsUrl = id => {
    const formattedName = id.toLowerCase().replace(' ', '-')
    return `/restaurant/${ restaurantId }/category/${ formattedName }`
  }

  return (
    <main className="home-page">
      <header className="home-header">
        <p className="home-header__subtitle">{ restaurant.type }</p>
        <h1 className="home-header__title">{ restaurant.name }</h1>
        <h1 className="home-header__title">{ process.env.NODE_TEST }</h1>
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
              to={ getProductsUrl(name) }
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
