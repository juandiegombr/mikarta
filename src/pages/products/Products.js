import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Dialog } from 'components/dialog'
import { ProductClient } from 'app/product/client'

import './Products.css'

const ALLERGIES = [
  { id: '1', name: 'Soja' },
  { id: '2', name: 'Pescado' },
  { id: '3', name: 'Mostaza' },
  { id: '4', name: 'Moluscos' },
  { id: '5', name: 'Lácteos' },
  { id: '6', name: 'Huevos' },
  { id: '7', name: 'Granos de sésamo' },
  { id: '8', name: 'Gluten' },
  { id: '9', name: 'Frutos de cáscara' },
  { id: '10', name: 'Dióxido de azufre y sulfitos' },
  { id: '11', name: 'Crustáceos' },
  { id: '12', name: 'Cacahuetes' },
  { id: '13', name: 'Apio' },
  { id: '14', name: 'Altramuces' },
]

const getFormattedPrice = price => Number(price).toFixed(2) + ' €'

const Products = () => {
  const { restaurantId, categoryId } = useParams()
  const [ products, setProducts ] = useState([])
  const [ selectedAllergies, setSelectedAllergies ] = useState([])
  const [ isDialogVisible, setDialogVisibility ] = useState(false)

  useEffect(() => {
    (async () => {
      const result = await ProductClient.getAllByCategoryId(categoryId)
      setProducts(result)
    })()
  }, [categoryId])

  const openDialog = product => {
    console.log(product)
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
                <div>{ ALLERGIES[type].name }</div>
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
                  <button className="product-allergies" onClick={ () => openDialog(allergy) }>
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
          Categorias
        </Link>
      </div>
    </Fragment>
  )
}

export {
  Products,
}