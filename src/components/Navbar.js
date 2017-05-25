import React from 'react'
import styled from 'styled-components'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar as BsNavbar, NavItem as BsNavItem, NavDropdown as BsNavDropdown, MenuItem as BsMenuItem } from 'react-bootstrap'

import Logo from "../../public/images/Logo_white.png"

const Wrapper = styled(BsNavbar)`

  z-index: 20;
  top: 0px;
  color: #999;
  width: 100%;
  position: fixed !important;
  border-radius: 0px !important;
  font-size: 11.5px !important;
  max-height: 40 !important;
`

const MenuItem = styled(BsMenuItem)`
  a {
    font-size: 11.5px !important;
  }
`

const NavItem = styled(BsNavItem)`
  @media (min-width: 480px) {
    padding: 0; border-left: 1px solid #2e363f; border-right: 1px solid #000;
  }
`

const NavDropdown = styled(BsNavDropdown)`
  @media (min-width: 480px) {
    padding: 0; border-left: 1px solid #2e363f; border-right: 1px solid #000;
  }
`

const Toggle = styled(BsNavbar.Toggle)`
  right:10%;
`

const Navbar = () => (
  <Wrapper inverse collapseOnSelect fluid>
    <BsNavbar.Header>
      <BsNavbar.Brand>
        <a href="http://matchx.io"><img alt="" src={Logo}/></a>
      </BsNavbar.Brand>
      <Toggle />
    </BsNavbar.Header>
    <BsNavbar.Collapse>
      <Nav>
        <NavDropdown eventKey={3} title="Admin" id="navbar-dropdown-menu">
          <LinkContainer to={`users/password`}>
            <MenuItem eventKey={3.1}>Change password</MenuItem>
          </LinkContainer>
          <MenuItem divider />
          <LinkContainer to="login">
            <MenuItem eventKey={3.2}>Logout</MenuItem>
          </LinkContainer>
        </NavDropdown>
        <LinkContainer to="gateways">
          <NavItem><i className="icon icon-cog"></i><span className="text">Manage gateways</span></NavItem>
        </LinkContainer>
        <LinkContainer to="users">
          <NavItem><i className="icon icon-share-alt"></i> <span className="text">Manage users</span></NavItem>
        </LinkContainer>
      </Nav>
    </BsNavbar.Collapse>
  </Wrapper>
)

export default Navbar
