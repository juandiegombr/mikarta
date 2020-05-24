import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Dialog } from 'components/dialog'
import { ProductClient } from 'app/product/client'

import './Products.css'

const ALLERGIES = [
  { id: 1, name: 'Gluten' },
  { id: 2, name: 'Crustáceos' },
  { id: 3, name: 'Huevo' },
  { id: 4, name: 'Pescados' },
  { id: 5, name: 'Cacahuetes' },
  { id: 6, name: 'Soja' },
  { id: 7, name: 'Lácteos' },
  { id: 8, name: 'Frutos de cáscara' },
  { id: 9, name: 'Apio' },
  { id: 10, name: 'Mostaza' },
  { id: 11, name: 'Granos de sésamo' },
  { id: 12, name: 'Dióxido de azufre y sulfitos' },
  { id: 13, name: 'Moluscos' },
  { id: 14, name: 'Altramuces' },
]

// const getFormattedPrice = price => Number(price).toFixed(2) + ' €'
const getFormattedPrice = price => price + ' €'

const Products = () => {
  const { restaurantId, categoryId } = useParams()
  const [ products, setProducts ] = useState([])
  const [ selectedAllergies, setSelectedAllergies ] = useState([])
  const [ isDialogVisible, setDialogVisibility ] = useState(false)

  useEffect(() => {
    (async () => {
      const result = await ProductClient.getAllByCategoryId(restaurantId, categoryId)
      setProducts(result)
    })()
  }, [restaurantId, categoryId])

  const openDialog = product => {
    setSelectedAllergies(product)
    toggleDialogVisibility()
  }

  const toggleDialogVisibility = () => {
    setDialogVisibility(visibility => !visibility)
  }

  const backUrl = `/restaurant/${ restaurantId }`

  return (
    <Fragment>
      <Dialog visible={ isDialogVisible } closeDialog={ toggleDialogVisibility }>
        <ul className="allergy-list">
          {
            selectedAllergies.map(type => (
              <li key={ type } className="allergy-item">
                <div className={ `allergy allergy-${ type }` }></div>
                <div>{ ALLERGIES.find(a => a.id === type)?.name }</div>
              </li>
            ))
          }
        </ul>
      </Dialog>
      <main className="products-page">
        <section className="product-container">
          {
            products.map(({ name, ingredients, allergy, price }) => (
              <div key={ name } className="product-button">
                <p className="product-title">{ name }</p>
                <p className="product-subtitle">{ ingredients }</p>
                <div className="product-info">
                  <span className="product-price">{ getFormattedPrice(price) }</span>
                  <button
                    aria-label={ `${ name }: listado de alergias` }
                    className="product-allergies"
                    onClick={ () => openDialog(allergy) }
                  >
                    {
                      allergy.map(type => (
                        <div key={ type } className={ `allergy allergy-${ type }` }></div>
                      ))
                    }
                  </button>
                </div>
              </div>
            ))
          }
        </section>
      </main>
      <div role="complementary" className="menu">
        <Link className="menu-link" to={ backUrl }>
          <i className="fas fa-arrow-left"></i>
          Categorías
        </Link>
      </div>
    </Fragment>
  )
}

export {
  Products,
}