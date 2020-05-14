import React, { Fragment, useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useParams,
} from "react-router-dom"
import QrReader from 'react-qr-reader'

import { CategoryClient } from './app/category/client'
import { ProductClient } from './app/product/client'

import './App.css'
import '@fortawesome/fontawesome-free/css/all.css'

const Categories = () => {
  const { restaurantId } = useParams()
  const [ categories, setCategories ] = useState([])

  useEffect(() => {
    (async () => {
      const result = await CategoryClient.getAllByRestaurantId(restaurantId)
      setCategories(result)
    })()
  }, [restaurantId])

  const getProductsUrl = (id) => restaurantId
    ? `/${ restaurantId }/category/${ id }`
    : `/home/category/${ id }`

  console.log('Categories: ', restaurantId)

  return (
    <main className="home-page">
      <header className="home-header">
        <p className="home-header__subtitle">Restaurante</p>
        <h1 className="home-header__title">L'andana</h1>
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

  const backUrl = restaurantId ? `/${ restaurantId }/category` : '/category'

  return (
    <Fragment>
      <main className="products-page">
        <section className="product-container">
          {
            products.map(({ name, ingredients, price }) => (
              <div key={ name } className="product-button">
                <p className="product-title">{ name }</p>
                <p className="product-subtitle">{ ingredients }</p>
                <p className="product-price">{ getFormattedPrice(price) }</p>
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

/* eslint-disable */

const Scanner = () => {
  const history = useHistory()
  const handleError = (error) => {
    console.log('error', error)
  }
  const handleScan = url => {
    if (!url) return
    console.log(url)
    const restaurantId = url.split('/')[3]
    const path = `/${ restaurantId }/category`
    console.log(`/${ restaurantId }/category`)
    history.push(path)
  }
  return (
    <main className="scanner-page">
      <QrReader
        facingMode="environment"
        delay={ 300 }
        onError={ handleError }
        onScan={ handleScan }
        style={ { width: '100%' } }
      />
    </main>
  )
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:restaurantId/category/:categoryId">
          <Products />
        </Route>
        <Route path="/:restaurantId/category">
          <Categories />
        </Route>
        <Route path="/">
          <Categories />
          {/* <Scanner /> */}
        </Route>
      </Switch>
    </Router>
  )
}

export default App
