import { ReferenceClient } from 'app/reference/client'
import { KEYS } from 'services/Storage'
import { Spreadsheets } from 'services/Spreadsheets'

const categoriesSerializer = data => {
  const rows = data.values
  const formattedData = rows.map((row, index) => ({
    id: index,
    name: row[0],
    icon: row[1],
  }))
  return formattedData
}

const getAllByRestaurantId = async id => {
  const localCategories = sessionStorage.getItem(KEYS.CATEGORIES)
  if (localCategories) return JSON.parse(localCategories)

  const idSheets = sessionStorage.getItem(KEYS.GAPI_REF) || await ReferenceClient.getReference(id)
  const data = await Spreadsheets.getData(idSheets, 'categorias!A2:B20')
  const categories = categoriesSerializer(data)
  sessionStorage.setItem(KEYS.CATEGORIES, JSON.stringify(categories))
  return categories
}

export const CategoryClient = {
  getAllByRestaurantId,
}
