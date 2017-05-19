import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 11.5px;
  position: fixed;
  background-color: #2e353d;
  left: 45px;
  width: 130px;
  bottom: 0px;
  top: 0px;
  transition: all .4s ease 0s;
  z-index: 20;
  font-family: verdana;
  margin-left: ${props => props.active ? '-45px' : '-130px'}
`

const Brand = styled.div`
  padding-left: 10px;
  background-color: #23282e;
  line-height: 50px;
  display: block;
  font-size: 14px;
  color: #e1ffff;
`

const Icon = styled.i`
  padding: 20px;
  right: -2px;
  position: absolute;
`

const SidebarList = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 0px;
  line-height: 50px;
  position: ${props => props.bottom ? 'absolute' : 'none'};
  bottom: ${props => props.bottom ? '0' : 'inherit'};
  width: ${props => props.bottom ? '100%' : 'inherit'};

  li {
    padding-left: 10px;

    a {
      text-decoration: none;
      color: #e1ffff;
    }
  }

  li:hover {
    border-left: 3px solid #d19b3d;
    background-color: #4f5b69;
    -webkit-transition: all 1s ease;
    -moz-transition: all 1s ease;
    -o-transition: all 1s ease;
    -ms-transition: all 1s ease;
    transition: all 1s ease;
  }
`

const Sidebar = ({ active, onClick }) => (
  <Wrapper active={active}>
    <Brand>Menu<Icon className="fa fa-bars fa-lg" id="menu-toggle" onClick={onClick}/></Brand>
    <SidebarList>
      <li><Link to="/">Dashboard<Icon className="fa fa-dashboard fa-lg"/></Link></li>
      <li><Link to="maps/view">Maps<Icon className="fa fa-map fa-lg"/></Link></li>
      <li><Link to="applications">Apps<Icon className="fa fa-cogs fa-lg"/></Link></li>
      <li><Link to="users">Users<Icon className="fa fa-users fa-lg"/></Link></li>
      <li><Link to="gateways">Gateways<Icon className="fa fa-server fa-lg"/></Link></li>
    </SidebarList>
    <SidebarList bottom>
      <li><Link to="/">Contact<Icon className="fa fa-envelope fa-lg"/></Link></li>
      <li><Link to="/">Settings<Icon className="fa fa-cog fa-lg"/></Link></li>
    </SidebarList>
  </Wrapper>
)

Sidebar.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Sidebar
