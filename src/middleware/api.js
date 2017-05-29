import { normalize, schema } from 'normalizr'
import { camelizeKeys } from 'humps'

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr

// GitHub's API may return results with uppercase letters while the query
// doesn't contain any. For example, "someuser" could result in "SomeUser"
// leading to a frozen UI as it wouldn't find "someuser" in the entities.
// That's why we're forcing lower cases down there.

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API'

const nodeRecordSchema = new schema.Entity('nodeRecords', {}, {
  idAttribute: record => record.time
})

const gatewaySchema = new schema.Entity('gateways', {}, {
  idAttribute: gw => gw.mac
})

const gatewaysSchema = {result: [gatewaySchema]}

// const repoSchema = new schema.Entity('repos', {
//   owner: userSchema
// }, {
//   idAttribute: repo => repo.fullName.toLowerCase()
// })

// Schemas for API responses.
export const Schemas = {
  NODE_RECORD: nodeRecordSchema,
  NODE_RECORD_ARRAY: [nodeRecordSchema],
  GATEWAY: gatewaySchema,
  GATEWAY_ARRAY: gatewaysSchema,
}


// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (agent, schema) => {
  return agent().then(response => {
    if (response.status !== 200) {
      return Promise.reject(response.data)
    }
    // console.log("no error", response)

    if (schema !== undefined) {
      const camelizedJson = camelizeKeys(response.data)

      // console.log(camelizedJson)

      return Object.assign({},
        normalize(camelizedJson, schema))
    }

    return response.data

  })
  .catch(error => {
    // console.log("error", error.response.data)
    return Promise.reject(error.response.data)

  })
}

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { schema, types, entity, agent } = callAPI

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  if (entity) {
    if (!schema) {
      throw new Error('Specify one of the exported Schemas.')
    }
  }

  return callApi(agent, schema).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.error || JSON.stringify(error) || 'Something bad happened'
    }))
  )
}
