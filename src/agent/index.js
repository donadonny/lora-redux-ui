import axios from 'axios'

const getToken = () =>
  localStorage.getItem('jwt')

const getTokenHeader = () => {
  let token = getToken()
  if (token !== '') {
    return {'Grpc-Metadata-Authorization': token}
  }
  else {
    return {}
  }
}

// we do this to let agent run inside of middleware callApi
const Auth = {
  login: (creds) =>
    () => axios.post('/api/internal/login', JSON.stringify(creds)),
  profile: (config) =>
    () => axios.get("/api/internal/profile", { ...config, headers: getTokenHeader()} )
};

export {
  Auth,
};
