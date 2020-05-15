import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { ProductClient } from 'app/product/client'

import './Products.css'

const getFormattedPrice = price => Number(price).toFixed(2) + ' €'

const Products = () => {
  const { restaurantId, categoryId } = useParams()
  const [ products, setProducts ] = useState([])

  useEffect(() => {
    (async () => {
      const result = await ProductClient.getAllByCategoryId(categoryId)
      setProducts(result)
    })()
  }, [categoryId])

  const backUrl = `/restaurant/${ restaurantId }`

  return (
    <Fragment>
      <main className="products-page">
        <section className="product-container">
          {
            products.map(({ name, ingredients, allergy, price }) => (
              <div key={ name } className="product-button">
                <p className="product-title">{ name }</p>
                <p className="product-subtitle">{ ingredients }</p>
                <div className="product-info">
                  <span className="product-price">{ getFormattedPrice(price) }</span>
                  <span className="product-allergies">
                    {
                      allergy.map(type => (
                        <div key={ type } className={ `allergy allergy-${ type }` }></div>
                      ))
                    }
                  </span>
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