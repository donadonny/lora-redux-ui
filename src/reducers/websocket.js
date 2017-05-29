import * as ActionTypes from '../actions'

const ws = (state={
  connecting: false,
  connected: false,
  disconnected: true,
}, action) => {
  switch (action.type) {
    case (ActionTypes.WS_CONNECTING):
      return {
        connected: false,
        connecting: true,
        disconnected: false
      }
    case (ActionTypes.WS_CONNECTED):
      return {
        connected: true,
        connecting: false,
        disconnected: false
      }
    case (ActionTypes.WS_DISCONNECTED):
      return {
        connecting: false,
        connected: false,
        disconnected: true,
      }
    default:
      return state
  }

  return state
}

export default ws
