import React from 'react'
import { useHistory } from 'react-router-dom'
import QrReader from 'react-qr-reader'

const Scanner = () => {
  const history = useHistory()
  const handleError = (error) => {
    console.log('error', error)
  }
  const handleScan = url => {
    if (!url) return
    console.log(url)
    const restaurantId = url.split('/')[3]
    const path = `/${ restaurantId }/category`
    console.log(`/${ restaurantId }/category`)
    history.push(path)
  }
  return (
    <main className="scanner-page">
      <QrReader
        facingMode="environment"
        delay={ 300 }
        onError={ handleError }
        onScan={ handleScan }
        style={ { width: '100%' } }
      />
    </main>
  )
}

export { Scanner }
