import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Dialog } from 'components/dialog'
import { CategoryClient } from 'app/category/client'
import { PlaceClient } from 'app/place/client'
import { KEYS } from 'services/Storage'

import './Categories.css'

const ICONS = {
  'Muslo de pollo': 'fas fa-drumstick-bite',
  'Zanahoria': 'fas fa-carrot',
  'Hamburguesa': 'fas fa-hamburger',
  'Perrito caliente':	'fas fa-hotdog',
  'Pan de molde':	'fas fa-bread-slice',
  'Helado':	'fas fa-ice-cream',
  'Cerveza': 'fas fa-beer',
  'Copa de vino':	'fas fa-wine-glass-alt',
  'Café': 'fas fa-coffee',
  'Pizza': 'fas fa-pizza-slice',
  'Pescado': 'fas fa-fish',
  'Cóctel': 'fas fa-cocktail',
  'Para compartir': 'fas fa-chart-pie',
  'Galleta': 'fas fa-cookie-bite',
  'Principales': 'fas fa-concierge-bell',
}

const Categories = () => {
  const { restaurantId } = useParams()
  const [ isDialogVisible, setDialogVisibility ] = useState(false)
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
      document.title = `${ process.env.REACT_APP_ENV === 'staging' ? 'STA - ' : '' }Mikarta - ${ restaurant.name }`
      setRestaurant(restaurant)
      const categories = await CategoryClient.getAllByRestaurantId(restaurantId)
      setCategories(categories)
    })()
  }, [restaurantId])

  const getProductsUrl = id => {
    const formattedName = id.toLowerCase().replace(' ', '-')
    return `/restaurant/${ restaurantId }/category/${ formattedName }`
  }

  const toggleDialogVisibility = () => {
    setDialogVisibility(v => !v)
  }

  return (
    <main className="categories-page">
      <Dialog visible={ isDialogVisible } closeDialog={ toggleDialogVisibility }>
        <p className="info-dialog__text">
          Esta carta ha sido generada a través de la
          <b> iniciativa solidaria Mikarta</b>
          , un proyecto creado por un grupo de jóvenes valencianos para ayudar a bares y restaurantes ante la situación generada por la COVID-19, ofreciendo un
          <b> servicio gratuito </b>
          de cartas digitalizadas.
        </p>
        <p className="info-dialog__text">
          Si quieres más información, escríbenos a
          <a href="mailto:mikarta.app@gmail.com"> mikarta.app@gmail.com</a>
        </p>
      </Dialog>
      <header className="categories-header">
        <p className="categories-header__subtitle">{ restaurant.type }</p>
        <h1 className="categories-header__title">{ restaurant.name }</h1>
        <button
          className="categories-header__info"
          aria-label="Información de la iniciativa mikarta"
          onClick={ toggleDialogVisibility }
        >
          <i className="fas fa-info-circle" aria-hidden="true"></i>
        </button>
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
              { icon && <i className={ ICONS[icon] }></i> }
              <div>{ name }</div>
            </Link>
          ))
        }
      </section>
    </main>
  )
}

export { Categories }
