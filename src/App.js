import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { Categories } from 'pages/categories'
import { Products } from 'pages/products'
import { Home } from 'pages/home'
import { TrackerHandler } from 'services/Tracker'

import './App.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { StorageHandler } from 'services/Storage'

export const history = createBrowserHistory()

const App = () => {
  return (
    <Router history={ history }>
      <TrackerHandler/>
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
