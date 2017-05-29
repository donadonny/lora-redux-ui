import {
  WS_CONNECT, WS_DISCONNECT,
  wsConnectd, wsDisconnectd, updateRealtimeNode, wsConnecting
} from '../actions'
import { normalize } from 'normalizr'
import { Schemas } from './api'
import { camelizeKeys } from 'humps'

let socket = null

const onOpen = (ws, store) => evt => {
  store.dispatch(wsConnectd())
}

const onClose = (ws, store) => evt => {
  store.dispatch(wsDisconnectd())
}

const onMessage = (ws, store) => evt => {
  let node = JSON.parse(evt.data);

  const camelizedJson = camelizeKeys(node)

  store.dispatch(
    updateRealtimeNode(
      Object.assign({}, normalize(camelizedJson, Schemas.NODE_RECORD))
  ))
}

export default store => next => action => {
  switch(action.type) {
    case (WS_CONNECT):
      if (socket !== null) {
        socket.close()
      }

      store.dispatch(wsConnecting())

      socket = new WebSocket(action.url);
      socket.onmessage = onMessage(socket, store)
      socket.onopen = onOpen(socket, store)
      socket.onclose = onClose(socket, store)

      break
    case (WS_DISCONNECT):
      if (socket !== null) {
        socket.close()
      }
      socket = null
      break

    default:
      return next(action)
  }
}
