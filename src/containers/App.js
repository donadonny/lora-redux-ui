import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { toggleSiderBar } from '../actions'

import Sidebar from '../components/ui/Sidebar'
import Main from '../containers/Main'

class App extends Component {
  static propTypes = {
    // Injected by React Redux
    activeSidebar: PropTypes.bool.isRequired,
    toggleSiderBar: PropTypes.func.isRequired,
    // Injected by React Router
    children: PropTypes.node
  }

  render() {
    const { children, activeSidebar } = this.props
    return (
      <div>
        <Sidebar active={activeSidebar}
                 onClick={this.props.toggleSiderBar}/>
        <Main active={activeSidebar}>
          {children}
        </Main>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  activeSidebar: state.ui.activeSidebar,
})

export default connect(mapStateToProps, {
  toggleSiderBar
})(App)
