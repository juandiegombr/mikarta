import React from 'react'
import { useHistory } from 'react-router-dom'
import QrReader from 'react-qr-reader'

const Scanner = () => {
  const history = useHistory()
  const handleError = (error) => { return }
  const handleScan = url => {
    if (!url) return
    const restaurantId = url.split('/')[3]
    const path = `/${ restaurantId }/category`
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
