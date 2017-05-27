import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Navbar from '../components/ui/Navbar'

import { browserHistory } from 'react-router'
import { resetErrorMessage, requestProfile, logout } from '../actions'
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  padding-left: ${props => props.active ? '130px' : '45px'};
  height: 100%;
  width: 100%;
  transition: all .4s ease 0s;
  overflow: auto;
`

const Content = styled.div`
  top: 50px;
  height: auto;
  position: relative;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
`

class Main extends Component {
  static PropTypes = {
    errorMessage: PropTypes.string,
    currentUser: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,

    resetErrorMessage: PropTypes.func.isRequired,
    requestProfile: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.requestProfile()
  }


  handleDismissClick = e => {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleChange = nextValue => {
    browserHistory.push(`/${nextValue}`)
  }

  handleLogout = () => {
    this.props.logout()
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    )
  }

  render() {
    const { children, active, isAuthenticated, currentUser } = this.props
    return (
      <Wrapper active={active}>
        <Navbar
          logout={this.handleLogout}
          isAuthenticated={isAuthenticated}
          currentUser={currentUser}/>
        <Content>
          {this.renderErrorMessage()}
          {children}
        </Content>
      </Wrapper>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.errorMessage,
  currentUser: state.auth.currentUser,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {
  resetErrorMessage,
  requestProfile,
  logout
})(Main)
