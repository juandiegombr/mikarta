import amplitude from 'amplitude-js'
export { TrackerHandler } from './TrackerHandler'

const AMPLITUDE_TOKEN = process.env.REACT_APP_AMPLITUDE_TOKEN

function initialize() {
  amplitude.init(AMPLITUDE_TOKEN)
}

function sendInteraction(name, options) {
  amplitude.logEvent(name, options)
}

export const Tracker = {
  initialize,
  sendInteraction,
}

