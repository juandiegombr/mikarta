import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  // useParams,
} from "react-router-dom"
import QrReader from 'react-qr-reader'

import './App.css'

const Home = () => {
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
  // const { categoryId } = useParams()

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
  const handleError = (error) => {
    console.log('error', error)
  }
  const handleScan = qr => {
    console.log(qr)
  }
  return (
    <QrReader
      facingMode="user"
      delay={300}
      onError={handleError}
      onScan={handleScan}
      style={{ width: '100%' }}
    />
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
          <Route path="/">
            <Scanner />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
