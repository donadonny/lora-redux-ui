import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
// import UserPage from './containers/UserPage'
import RepoPage from './containers/RepoPage'
import Login from './containers/Login'
import MapView from './containers/maps/MapView'

export default (
  <div>
    <Route path="/" component={App}>
      <Route path="/map" component={MapView}></Route>
      <Route path="/:login/:name" component={RepoPage} />
      {/* <Route path="/:login" component={UserPage} /> */}
    </Route>
    <Route path="/login" component={Login}/>
  </div>
)
