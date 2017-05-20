import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Explore from '../components/Explore'
import Navbar from '../components/Navbar'

import { browserHistory } from 'react-router'
import { resetErrorMessage } from '../actions'
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  padding-left: ${props => props.active ? '130px' : '45px'};
  width: 100%;
  overflow: auto;
  transition: all .4s ease 0s;
`

const Content = () => (
  <div>Hello</div>
)

class Main extends Component {
  static PropTypes = {
    inputValue: PropTypes.string,
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
  }

  handleDismissClick = e => {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleChange = nextValue => {
    browserHistory.push(`/${nextValue}`)
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
    const { children, active, inputValue } = this.props
    return (
      <Wrapper active={active}>
        <Navbar />
        {/* <Content/>
        <Explore value={inputValue}
                 onChange={this.handleChange} />
          {this.renderErrorMessage()}
          {children} */}
      </Wrapper>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.errorMessage,
})

export default connect(mapStateToProps, {
  resetErrorMessage,
})(Main)
