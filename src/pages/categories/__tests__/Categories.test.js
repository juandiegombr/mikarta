import React from 'react'
import { render, waitForDomChange } from '@testing-library/react'
import App, { history } from 'App'
import { KEYS } from 'services/Storage'

import { references } from 'app/reference/__scenario__'
import { place } from 'app/place/__scenario__'
import { categories } from 'app/category/__scenario__'

global.fetch = jest.fn((url, b) => {
  let response
  if (url.includes('references!')) {
    response = references
  }
  if (url.includes('datos!')) {
    response = place
  }
  if (url.includes('categorias!')) {
    response = categories
  }
  return Promise.resolve({ json: () => Promise.resolve(response) })
})

test('renders learn react link', async () => {
  sessionStorage.setItem(KEYS.GAPI_REF, '1YKELqnmwQO8J7nD5p-IlovH4hYwA_smnvCW_bqrzxwc')
  const { findByText, debug } = render(<App />)
  history.push('/restaurant/bar-pepe')

  await findByText('Tapeo')
  debug()
})
