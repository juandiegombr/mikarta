import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { Categories } from 'pages/categories'
import { Products } from 'pages/products'
import { Home } from 'pages/home'

import './App.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { StorageHandler } from 'services/Storage'

const App = () => {
  return (
    <Router>
      <StorageHandler/>
      <Switch>
        <Route path="/restaurant/:restaurantId/category/:categoryId">
          <Products />
        </Route>
        <Route path="/restaurant/:restaurantId">
          <Categories />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <Redirect from="*" to="/"/>
      </Switch>
    </Router>
  )
}

export default App
