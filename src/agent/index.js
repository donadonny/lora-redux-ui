import axios from 'axios'

const getTokenHeader = () => {
  let token = localStorage.getItem('jwt')
  if (token !== '') {
    return {'Grpc-Metadata-Authorization': token}
  }
  else {
    return {}
  }
}

let headerConfig = {headers: getTokenHeader()}

const encode = encodeURIComponent;

// we do this to let agent run inside of middleware callApi
const Auth = {
  login: (creds) =>
    () => axios.post('/api/internal/login', JSON.stringify(creds)),
  profile: () =>
    () => axios.get('/api/internal/profile', headerConfig)
};

const User = {
  getAll: (search, pageSize, offset) =>
    () => axios.get(`/api/users?limit=${pageSize}&offset=${offset}&search=${encode(search)}`, headerConfig),
  get: (id) =>
    () => axios.get(`/api/users/${id}`, headerConfig),
  create: (user) =>
    () => axios.post(`/api/users`, JSON.stringify(user), headerConfig),
  update: (id, user) =>
    () => axios.put(`/api/users/${id}`, JSON.stringify(user), headerConfig),
  del:  (id) =>
    () => axios.delete(`/api/users/${id}`, headerConfig),
  password: (id, password) =>
    () => axios.put(`/api/users/${id}`, JSON.stringify(password), headerConfig)
}

const Gateway = {
  getAll: (pageSize, offset) =>
    () => axios.get(`/api/gateways?limit=${pageSize}&offset=${offset}`, headerConfig),
  stats: (mac, interval, start, end) =>
    () => axios.get(`/api/gateways/${mac}/interval=${interval}&startTimestamp=${start}&endTimestamp=${end}`, headerConfig),
  get: (mac) =>
    () => axios.get(`/api/gateways/${mac}`, headerConfig),
  create: (gateway) =>
    () => axios.post(`/api/gateways`, JSON.stringify(gateway), headerConfig),
  update: (mac, gateway) =>
    () => axios.put(`/api/gateways/${mac}`, JSON.stringify(gateway), headerConfig),
  del:  (mac) =>
    () => axios.delete(`/api/gateways/${mac}`, headerConfig),
}

const Application = {}

const Node = {
  record: () =>
    () => axios.get('/api/nodes/location', headerConfig)
}

const Organization = {}

export {
  Auth,
  User,
  Gateway,
  Application,
  Node,
  Organization
};
