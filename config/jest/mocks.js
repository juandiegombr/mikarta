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
