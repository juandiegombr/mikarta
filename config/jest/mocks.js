import { references } from 'app/reference/__scenario__'
import { place } from 'app/place/__scenario__'
import { categories } from 'app/category/__scenario__'
import { products } from 'app/product/__scenario__'

global.fetch = jest.fn((url, b) => {
  let response
  if (url.includes('datos!')) {
    response = place
  }
  if (url.includes('categorias!')) {
    response = categories
  }
  if (url.includes('productos!')) {
    response = products
  }
  if (url.includes(process.env.REACT_APP_GAPI_REF)) {
    response = references
  }
  return Promise.resolve({ json: () => Promise.resolve(response) })
})

jest.mock('services/Tracker/Tracker', () => {
  const originalModule = jest.requireActual('services/Tracker/Tracker')
  return ({
    Tracker: {
      initialize: jest.spyOn(originalModule.Tracker, 'initialize'),
      sendInteraction: jest.spyOn(originalModule.Tracker, 'sendInteraction'),
    },
  })
})

jest.mock('amplitude-js', () => ({
  init: jest.fn(),
  logEvent: jest.fn(),
}))