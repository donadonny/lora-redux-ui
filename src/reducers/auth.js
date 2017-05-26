import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE,
  LOGOUT
} from '../actions'

const auth = (state = {
    isFetching: false,
    isAuthenticated: false,
    currentUser: {}
  }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case PROFILE_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
      }
    case PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        currentUser: action.response.user
      }
    case LOGOUT:
    case PROFILE_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        currentUser: {}
      }
    default:
      return state
  }
}

export default auth
