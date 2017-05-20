import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router';
import Logo from "../../public/images/Logo_white.png"

const Wrapper = styled.div`
  left: -1px;
  position: relative;
  z-index: 20;
  top: 0px;
  background-color: #1f262d;
  height: 50px;
  box-shadow:0 0 8px 0 black;

  margin: 0px !important;
  border-radius: 0px !important;
`

const Nav = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  border-right: 1px solid #2e363f;
`

const NavItem = styled.li`
  float: left;
 	list-style-type: none;
 	margin: 0;
 	position: relative;
  border-right: 1px solid #000;
  border-left: 1px solid #000;

  a {
    display: block;
    font-size: 11.5px;
    color: #999;
    padding: 16px 13px !important;
  }

  a:hover {
    color: #ffffff;
    background: #000 !important;
  }
`

const Brand = styled.a`
  img {
    padding: 13px;
    width: 100px !important;
  }
`
const NavDropdown = styled(Nav)`
  text-align: left;
`

const NavDropdownItem = styled(NavItem)`

`


// .navbar-nav > li > a {
//   padding-top:13px !important; padding-bottom:5 !important;
//   height: 50px;
// }
//
//
// .navbar-brand {
//   padding: 0px;
//   height: 50px;
// }
// .navbar-brand >img {
//   height: 100%;
//   padding: 13px;
//   width: auto;
// }
//

// #user-nav {
// 	position: absolute;
// 	left: 220px;
// 	top:0px;
// 	z-index: 20;
// 	margin: 0;
// }
// #user-nav > ul {
//
// }
// #user-nav > ul > li {
// 	float: left;
// 	list-style-type: none;
// 	margin: 0;
// 	position: relative;
// 	padding: 0; border-left: 1px solid #2e363f; border-right: 1px solid #000;
// }
// #user-nav > ul > li > a {
// 	padding:9px 10px;
// 	display: block;
// 	font-size: 11px;
// }
// #user-nav > ul > li > a:hover, #user-nav > ul > li.open > a {
// 	color: #ffffff;  background:#000;
// }
// #user-nav > ul > li > a > i, #sidebar li a i {
// 	opacity: .5;
// 	margin-top: 2px;
// }
// #user-nav > ul > li > a:hover > i, #user-nav > ul > li.open > a > i {
// 	opacity: 1;
// }
// #user-nav > ul > li > a > .label {
// 	vertical-align: middle;
// 	padding: 1px 4px 1px;
// 	margin: -2px 4px 0;
// 	display: inline-block;
// }
// #user-nav > ul ul > li > a {
// 	text-align: left;
// }
// #user-nav > ul ul > li > a:hover {
// }



const Navbar = () => (
  <Wrapper className="navbar">
    <Nav className="nav">
      <div className="navbar-header">
        <Brand href="http://www.matchx.io/"><img alt="Brand" src={Logo}></img></Brand>
      </div>
      <NavItem className="dropdown">
        <a title="" href="#" data-toggle="dropdown" data-target="#profile-messages" class="dropdown-toggle">
          <i class="icon icon-user"></i>  <span class="text">Welcome User</span><b class="caret"></b>
        </a>
        <NavDropdown className="dropdown-menu">
          <NavDropdownItem><a href="#"><i class="icon-user"></i> My Profile</a></NavDropdownItem>
          <NavDropdownItem class="divider"></NavDropdownItem>
          <NavDropdownItem><a href="#"><i class="icon-check"></i> My Tasks</a></NavDropdownItem>
          <NavDropdownItem class="divider"></NavDropdownItem>
          <NavDropdownItem><a href="login.html"><i class="icon-key"></i> Log Out</a></NavDropdownItem>
        </NavDropdown>
    </NavItem>

    <NavItem><a title="" href="#"><i class="icon icon-cog"></i> <span class="text">Settings</span></a></NavItem>
    <NavItem><a title="" href="login.html"><i class="icon icon-share-alt"></i> <span class="text">Logout</span></a></NavItem>
    </Nav>
  </Wrapper>
)
{/* <ul className="nav navbar-nav navbar-right">
  <Link to="gateways">Manage gateways</Link>
  <Link to="users">Manage users</Link>
</ul> */}

export default Navbar
