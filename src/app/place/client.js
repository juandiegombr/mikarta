import { ReferenceClient } from 'app/reference/client'
import { KEYS } from 'services/Storage'
import { Spreadsheets } from 'services/Spreadsheets'

const placeSerializer = data => {
  const row = data.values[0]
  const formattedData = {
    name: row[0],
    type: row[1],
  }
  return formattedData
}

const getById = async id => {
  const localData = sessionStorage.getItem(KEYS.PLACE)
  if (localData) return JSON.parse(localData)

  const localReference = sessionStorage.getItem('reference') || await ReferenceClient.getReference(id)
  const data = await Spreadsheets.getData(localReference, 'datos!A2:B2')
  const place = placeSerializer(data)
  sessionStorage.setItem(KEYS.PLACE, JSON.stringify(place))
  return place
}

export const PlaceClient = {
  getById,
}
