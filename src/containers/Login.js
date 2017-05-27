import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux'
import styled from 'styled-components'
import { requestLogin, resetErrorMessage } from '../actions'

import {
  Grid, Row, Col,
  Form, FormGroup, FormControl, InputGroup,
  Button, Glyphicon, Alert
} from 'react-bootstrap'

import Logo from "../../public/images/Logo_white_login.png"

const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color:#2E363F
`

const Space = styled.div`
  height: ${props => props.val ? props.val * 20 + 'px' : '20px'}
`

const ColorAddon = styled(InputGroup.Addon)`
  border: 0px !important;
  background-color: ${props => props.color ? props.color: 'default' } !important;
`

const Image = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto
`

const CenterGrid = styled(Grid)`
  position: relative;
  top: 20%;
`
const Hr = styled.hr`
  border-color: #8c8c8c;
  color: #8c8c8c;
  background-color: #8c8c8c;
`

class Login extends Component {
  static propTypes = {
    // Injected by React Redux
    isFetching: PropTypes.bool,
    errorMessage: PropTypes.string,
    requestLogin: PropTypes.func,
    resetErrorMessage: PropTypes.func
  }

  getData() {
    return {
      username: findDOMNode(this.refs.username).value,
      password: findDOMNode(this.refs.password).value,
    };
  }

  handleSubmit = ev => {
    ev.preventDefault()
    this.props.requestLogin(this.getData())
  }


  renderErrorMessage () {
    const { errorMessage, resetErrorMessage } = this.props
    return errorMessage &&
      <Alert bsStyle="danger" onDismiss={resetErrorMessage}>
        {errorMessage}
      </Alert>
  }


  render() {
    const { isFetching } = this.props

    return (
      <Wrapper>
        <CenterGrid>
          <Row className="show-grid">
            <Col xsOffset={1} xs={10} smOffset={3} sm={6}>
              <Hr />
            </Col>
            <Col xsOffset={2} xs={8} smOffset={4} sm={4}>
              <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup controlId="formHorizontalLogo">
                  <a href="http://matchx.io"><Image src={Logo} alt="Logo" /></a>
                </FormGroup>
                <Space />
                {this.renderErrorMessage()}
                <FormGroup controlId="formHorizontalUsername">
                  <InputGroup>
                    <ColorAddon color={"#28b779"}><Glyphicon glyph="user" /></ColorAddon>
                    <FormControl type="text" placeholder="Username" ref="username"/>
                  </InputGroup>
                </FormGroup>
                <Space />
                <FormGroup controlId="formHorizontalPassword">
                  <InputGroup>
                    <ColorAddon color={"#ffb848"}><Glyphicon glyph="lock" /></ColorAddon>
                    <FormControl type="password" placeholder="Password" ref="password"/>
                  </InputGroup>
                </FormGroup>
                <Space />
                <FormGroup>
                  <Button type="submit" bsStyle="success" block disabled={isFetching}>Signin</Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
          <Col xsOffset={1} xs={10} smOffset={3} sm={6}>
            <Hr />
          </Col>
        </CenterGrid>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { isFetching } = state.auth

  return {
    isFetching: isFetching,
    errorMessage: state.errorMessage
  }

}

export default connect(mapStateToProps, {
  requestLogin,
  resetErrorMessage
})(Login)
