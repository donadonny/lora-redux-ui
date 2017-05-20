import React from 'react'
import styled from 'styled-components'
import { Nav, Navbar as BsNavbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'

import Logo from "../../public/images/Logo_white.png"

const Wrapper = styled(BsNavbar)`
  z-index: 20;
  top: 0px;
  border-radius: 0px !important;
  color: #999;
  font-size: 11.5px;
`

const NavHeader = styled.div`
  left: 0px;
  width: 120px;
  img {
    padding: 13px;
    width: 100px !important;
  }
`

const Navbar = ({toggleDropdown}) => (
  <Wrapper inverse collapseOnSelect fluid>
    <NavHeader className="navbar-header">
      <a href="http://www.matchx.io/"><img alt="Brand" src={Logo}></img></a>
    </NavHeader>
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
