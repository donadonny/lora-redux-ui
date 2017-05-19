import React from 'react'
import styled from 'styled-components'
import { Grid, NavHeader, Navbar as Nav } from 'react-bootstrap'
import { Link } from 'react-router';
import Logo from "../../public/images/Logo_white.png"

const Wrapper = styled.div`
  height: 50px !important;
  position: absolute;
  z-index: 20;
  margin: 0;
  border: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  position: absolute;
  margin-top: 0px;
  background-color: #1f262d;
`
const Brand = styled.a`
  img {
    position: absolute;
    height: 100%;
    padding: 13px;
    width: auto;
  }
`


// .navbar-nav > li > a {
//   padding-top:13px !important; padding-bottom:5 !important;
//   height: 50px;
// }
//
// .navbar {min-height: 40px !important;}
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
// .navbar-toggle {
//   margin-top: 0px;
//   margin-bottom: 0px;
// }
//
// .navbar-fixed-top {
//   position: absolute;
//   margin-top: 0px;
//   margin-bottom: 0px;
// }

// #user-nav {
// 	position: absolute;
// 	left: 220px;
// 	top:0px;
// 	z-index: 20;
// 	margin: 0;
// }
// #user-nav > ul {
// 	margin: 0;
// 	padding: 0;
// 	list-style: none; border-right: 1px solid #2e363f;border-left: 1px solid #000;
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
  <Wrapper>
    <Grid>
      <Nav.Header>
        <Brand href="http://www.matchx.io/">
          <img alt="Brand" src={Logo}></img>
        </Brand>
      </Nav.Header>

      <div id="navbar" className="navbar-collapse collapse">

        <ul class="nav">
          <li  class="dropdown" id="profile-messages" ><a title="" href="#" data-toggle="dropdown" data-target="#profile-messages" class="dropdown-toggle"><i class="icon icon-user"></i>  <span class="text">Welcome User</span><b class="caret"></b></a>
          <ul class="dropdown-menu">
            <li><a href="#"><i class="icon-user"></i> My Profile</a></li>
            <li class="divider"></li>
            <li><a href="#"><i class="icon-check"></i> My Tasks</a></li>
            <li class="divider"></li>
            <li><a href="login.html"><i class="icon-key"></i> Log Out</a></li>
          </ul>
          </li>
          <li class="dropdown" id="menu-messages"><a href="#" data-toggle="dropdown" data-target="#menu-messages" class="dropdown-toggle"><i class="icon icon-envelope"></i> <span class="text">Messages</span> <span class="label label-important">5</span> <b class="caret"></b></a>
            <ul class="dropdown-menu">
            <li><a class="sAdd" title="" href="#"><i class="icon-plus"></i> new message</a></li>
            <li class="divider"></li>
            <li><a class="sInbox" title="" href="#"><i class="icon-envelope"></i> inbox</a></li>
            <li class="divider"></li>
            <li><a class="sOutbox" title="" href="#"><i class="icon-arrow-up"></i> outbox</a></li>
            <li class="divider"></li>
            <li><a class="sTrash" title="" href="#"><i class="icon-trash"></i> trash</a></li>
            </ul>
          </li>
          <li class=""><a title="" href="#"><i class="icon icon-cog"></i> <span class="text">Settings</span></a></li>
          <li class=""><a title="" href="login.html"><i class="icon icon-share-alt"></i> <span class="text">Logout</span></a></li>
        </ul>
      </div>
    </Grid>
  </Wrapper>
)
{/* <ul className="nav navbar-nav navbar-right">
  <Link to="gateways">Manage gateways</Link>
  <Link to="users">Manage users</Link>
</ul> */}

export default Navbar
