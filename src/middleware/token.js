import {
  LOGIN_SUCCESS, LOGOUT,
} from '../actions'
import { goBack } from 'react-router-redux'


// set the token to localStorage
export default store => next => action => {
  if (action.type === LOGIN_SUCCESS) {
    if (!action.error) {
      localStorage.setItem('jwt', action.response.jwt);
      // only success
      store.dispatch(goBack())
    }
  } else if (action.type === LOGOUT) {
    localStorage.setItem('jwt', '');
  }

  next(action);
};
