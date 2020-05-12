import React, { Fragment, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useParams,
} from "react-router-dom"
import QrReader from 'react-qr-reader'

import './App.css'

const Categories = () => {
  const { restaurantId } = useParams()
  console.log('Categories: ', restaurantId)
  return (
    <main className="home-page">
      <section className="category-container">
        <div className="category-wrapper">
          <Link to="/category/1" className="category-button">Entrantes</Link>
        </div>
        <div className="category-wrapper">
          <Link to="/category/2" className="category-button">Hamburguesas</Link>
        </div>
        <div className="category-wrapper">
          <Link to="/category/3" className="category-button">Bocadillos</Link>
        </div>
        <div className="category-wrapper">
          <Link to="/category/4" className="category-button">Refrescos</Link>
        </div>
      </section>
    </main>
  )
}

const Category = () => {
  const { categoryId } = useParams()
  console.log('Category: ', categoryId)
  return (
    <Fragment>
      <header className="header">
        <Link to="/">Atrás</Link>
      </header>
      <main className="category-page">
        <section className="product-container">
          <div className="product-wrapper">
            <div className="product-button">Bravas</div>
          </div>
          <div className="product-wrapper">
            <div className="product-button">Morro</div>
          </div>
          <div className="product-wrapper">
            <div className="product-button">Calamares</div>
          </div>
        </section>
      </main>
    </Fragment>
  )
}

const Scanner = () => {
  const history = useHistory()
  const handleError = (error) => {
    console.log('error', error)
  }
  const handleScan = url => {
    if (!url) return
    console.log(url)
    history.push(url)
  }
  return (
    <Fragment>
      <QrReader
        facingMode="environment"
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
    </Fragment>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/category/:categoryId">
            <Category />
          </Route>
          <Route path="/:restaurantId/categories">
            <Categories />
          </Route>
          <Route path="/">
            <Scanner />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
