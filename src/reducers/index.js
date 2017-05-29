import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import auth from './auth'
import websocket from './websocket'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { nodeRecords: {}, gateways: {}, realtimeNodes: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  if (action.type === ActionTypes.ADD_REALTIME_NODE) {
    return merge({}, state, action.node)
  }

  return state
}

const ui = (state = {
  activeSidebar: false,
  gatewayPopup: null,
  nodePopup: null,
}, action) => {
  switch (action.type) {
    case (ActionTypes.TOGGLE_SIDEBAR):
      return {
        ...state,
        activeSidebar: !state.activeSidebar
      }
    case (ActionTypes.UPDATE_GATEWAY_POPUP):
      return {
        ...state,
        gatewayPopup: action.gatewayPopup
      }
    case (ActionTypes.UPDATE_NODE_POPUP):
      return {
        ...state,
        nodePopup: action.nodePopup
      }
    default:
      return state
  }
}

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return error
  }
  return state
}

// Updates the pagination data for different actions.
// const pagination = combineReducers({
//   starredByUser: paginate({
//     mapActionToKey: action => action.login,
//     types: [
//       ActionTypes.STARRED_REQUEST,
//       ActionTypes.STARRED_SUCCESS,
//       ActionTypes.STARRED_FAILURE
//     ]
//   }),
//   stargazersByRepo: paginate({
//     mapActionToKey: action => action.fullName,
//     types: [
//       ActionTypes.STARGAZERS_REQUEST,
//       ActionTypes.STARGAZERS_SUCCESS,
//       ActionTypes.STARGAZERS_FAILURE
//     ]
//   })
// })

const rootReducer = combineReducers({
  entities,
  errorMessage,
  routing,
  ui,
  auth,
  websocket
})

export default rootReducer
