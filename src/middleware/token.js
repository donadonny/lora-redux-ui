import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions'

// set the token to localStorage
export default store => next => action => {
  if (action.type === LOGIN_SUCCESS) {
    if (!action.error) {
      localStorage.setItem('jwt', action.response.jwt);
    }
  } else if (action.type === LOGOUT_SUCCESS) {
    localStorage.setItem('jwt', '');
  }

  next(action);
};
