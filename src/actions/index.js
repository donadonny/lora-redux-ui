import { CALL_API, Schemas } from '../middleware/api'
import { Auth, Node, Gateway } from '../agent'
import _ from 'lodash'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

// Login
// Relies on the custom API middleware defined in ../middleware/api.js.
export const requestLogin = creds => ({
  creds,
  [CALL_API]: {
    entity: false,
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE ],
    agent: Auth.login(creds)
  }
})

export const PROFILE_REQUEST = 'PROFILE_REQUEST'
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS'
export const PROFILE_FAILURE = 'PROFILE_FAILURE'

export const requestProfile = () => ({
  [CALL_API]: {
    entity: false,
    types: [PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE ],
    agent: Auth.profile()
  }
})

// Logout
// Relies on the custom API middleware defined in ../middleware/api.js.

export const LOGOUT = 'LOGOUT'

export const logout = () => ({
  type: LOGOUT
})


export const NODE_RECORD_REQUEST = 'NODE_RECORD_REQUEST'
export const NODE_RECORD_SUCCESS = 'NODE_RECORD_SUCCESS'
export const NODE_RECORD_FAILURE = 'NODE_RECORD_FAILURE'

const fetchNodeRecords = () => ({
  [CALL_API]: {
    entity: true,
    types: [ NODE_RECORD_REQUEST, NODE_RECORD_SUCCESS, NODE_RECORD_FAILURE ],
    agent: Node.record(),
    schema: Schemas.NODE_RECORD_ARRAY
  }
})

export const loadNodeRecords = () => (dispatch, getState) => {
  if (!_.isEmpty(getState().entities.nodeRecords)) {
    return null
  }

  return dispatch(fetchNodeRecords())
}



export const GATEWAY_ALL_REQUEST = 'GATEWAY_ALL_REQUEST'
export const GATEWAY_ALL_SUCCESS = 'GATEWAY_ALL_SUCCESS'
export const GATEWAY_ALL_FAILURE = 'GATEWAY_ALL_FAILURE'

const fetchAllGateways = (pageSize, offset) => ({
  [CALL_API]: {
    entity: true,
    types: [ GATEWAY_ALL_REQUEST, GATEWAY_ALL_SUCCESS, GATEWAY_ALL_FAILURE ],
    agent: Gateway.getAll(pageSize, offset),
    schema: Schemas.GATEWAY_ARRAY
  }
})

// Relies on Redux Thunk middleware.
export const loadAllGateways = (pageSize, offset) => (dispatch, getState) => {
  if (!_.isEmpty(getState().entities.gateways)) {
    return null
  }

  return dispatch(fetchAllGateways(pageSize, offset))
}
//
// // Fetches a page of starred repos by a particular user.
// // Bails out if page is cached and user didn't specifically request next page.
// // Relies on Redux Thunk middleware.
// export const loadStarred = (login, nextPage) => (dispatch, getState) => {
//   const {
//     nextPageUrl = `users/${login}/starred`,
//     pageCount = 0
//   } = getState().pagination.starredByUser[login] || {}
//
//   if (pageCount > 0 && !nextPage) {
//     return null
//   }
//
//   return dispatch(fetchStarred(login, nextPageUrl))
// }
//
// export const STARGAZERS_REQUEST = 'STARGAZERS_REQUEST'
// export const STARGAZERS_SUCCESS = 'STARGAZERS_SUCCESS'
// export const STARGAZERS_FAILURE = 'STARGAZERS_FAILURE'
//
// // Fetches a page of stargazers for a particular repo.
// // Relies on the custom API middleware defined in ../middleware/api.js.
// const fetchStargazers = (fullName, nextPageUrl) => ({
//   fullName,
//   [CALL_API]: {
//     entity: true,
//     types: [ STARGAZERS_REQUEST, STARGAZERS_SUCCESS, STARGAZERS_FAILURE ],
//     endpoint: nextPageUrl,
//     schema: Schemas.USER_ARRAY
//   }
// })
//
// // Fetches a page of stargazers for a particular repo.
// // Bails out if page is cached and user didn't specifically request next page.
// // Relies on Redux Thunk middleware.
// export const loadStargazers = (fullName, nextPage) => (dispatch, getState) => {
//   const {
//     nextPageUrl = `repos/${fullName}/stargazers`,
//     pageCount = 0
//   } = getState().pagination.stargazersByRepo[fullName] || {}
//
//   if (pageCount > 0 && !nextPage) {
//     return null
//   }
//
//   return dispatch(fetchStargazers(fullName, nextPageUrl))
// }

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

// Toggle the Main view side bar
export const toggleSiderBar = () => ({
    type: TOGGLE_SIDEBAR
})

export const UPDATE_GATEWAY_POPUP = 'UPDATE_GATEWAY_POPUP'

export const updateGatewayPopup = (gw) => ({
    type: UPDATE_GATEWAY_POPUP,
    gatewayPopup: gw
})
