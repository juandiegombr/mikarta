const getData = async (idSheets, values) => {
  const apiKey = process.env.REACT_APP_GAPI_KEY
  const baseUrl = process.env.REACT_APP_GAPI_BASE_URL
  const url = baseUrl + idSheets + '/values/' + values + '?access_token=' + apiKey + '&key=' + apiKey
  return fetch(url).then(res => res.json())
}

export const Spreadsheets = {
  getData,
}