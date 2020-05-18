import { ReferenceClient } from 'app/reference/client'
import { KEYS } from 'services/Storage'
import { Spreadsheets } from 'services/Spreadsheets'

const productsSerializer = data => {
  const rows = data.values
  const formattedData = rows.map((row, index) => {
    const allergy = row
      .slice(4)
      .map((value, index) => ({ index: index + 1, value }))
      .filter(({ value }) => value === 'TRUE')
      .map(a => a.index)

    return {
      id: index,
      name: row[0],
      ingredients: row[1],
      categoryId: row[2].toLowerCase().replace(' ', '-'),
      price: row[3],
      allergy,
    }
  })
  return formattedData.filter(row => row.name)
}

const getAllByCategoryId = async (restaurantId, id) => {
  const localProducts = sessionStorage.getItem(KEYS.PRODUCTS)
  if (localProducts) return JSON.parse(localProducts).filter(product => product.categoryId === id)

  const idSheets = sessionStorage.getItem(KEYS.GAPI_REF) || await ReferenceClient.getReference(restaurantId)
  const data = await Spreadsheets.getData(idSheets, 'productos!A3:R200')
  const products = productsSerializer(data)
  sessionStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products))
  return products.filter(product => product.categoryId === id)
}

export const ProductClient = {
  getAllByCategoryId,
}
