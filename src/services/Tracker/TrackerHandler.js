import { Tracker } from 'services/Tracker'
import { useEffect } from 'react'

const TrackerHandler = () => {

  useEffect(() => {
    Tracker.initialize()
  }, [])

  return null
}

export { TrackerHandler }
