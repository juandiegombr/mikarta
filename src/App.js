import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { Categories } from './pages/categories'
import { Products } from './pages/products'
import { DataForm } from './pages/data-form'

import './App.css'
import '@fortawesome/fontawesome-free/css/all.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/data">
          <DataForm />
        </Route>
        <Route path="/restaurant/:restaurantId/category/:categoryId">
          <Products />
        </Route>
        <Route path="/restaurant/:restaurantId">
          <Categories />
        </Route>
        <Route path="/">
          <DataForm />
        </Route>
        <Redirect from="*" to="/"/>
      </Switch>
    </Router>
  )
}

export default App
