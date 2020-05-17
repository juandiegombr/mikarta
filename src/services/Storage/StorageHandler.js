import { KEYS, STORAGE_PERIOD } from 'services/Storage'

const StorageHandler = () => {
  const updateTime = sessionStorage.getItem(KEYS.UPDATE_TIME)
  const nowTime = new Date().getTime()

  if (!updateTime) {
    sessionStorage.setItem(KEYS.UPDATE_TIME, nowTime)
    return null
  }

  const hasExpired = nowTime > (Number(updateTime) + STORAGE_PERIOD)
  if (hasExpired) {
    sessionStorage.removeItem(KEYS.CATEGORIES)
    sessionStorage.removeItem(KEYS.PRODUCTS)
    sessionStorage.removeItem(KEYS.PLACE)
    sessionStorage.setItem(KEYS.UPDATE_TIME, nowTime)
  }

  return null
}

export { StorageHandler }
