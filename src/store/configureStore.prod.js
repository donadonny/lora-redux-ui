import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import websocket from '../middleware/websocket'
import api from '../middleware/api'
import token from '../middleware/token'
import rootReducer from '../reducers'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

const routingmiddleware = routerMiddleware(browserHistory)

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, api, token, routingmiddleware, websocket)
)

export default configureStore
