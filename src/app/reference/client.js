import { Spreadsheets } from 'services/Spreadsheets'
import { KEYS } from 'services/Storage'

const referenceSerializer = (data, id) => {
  const rows = data.values
  const reference = rows.find(row => row[0] === id)
  return reference[1]
}

const getReference = async placeId => {
  const localReference = sessionStorage.getItem(KEYS.GAPI_REF)
  if (localReference) return localReference

  const data = await Spreadsheets.getData(process.env.REACT_APP_GAPI_REF, 'datos!A1:B200')
  const reference = referenceSerializer(data, placeId)
  sessionStorage.setItem(KEYS.GAPI_REF, reference)
  return reference
}

export const ReferenceClient = {
  getReference,
}
