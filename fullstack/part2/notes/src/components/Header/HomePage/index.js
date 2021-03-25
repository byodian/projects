import React from 'react';
import Logo from '../../Logo';
import { Header, Nav, NavItems, NavLink, NavItem } from './HomeHeaderElements';

const HomeHeader = () => {
  return (
    <>
      <Header>
        <Logo />
        <Nav>
          <NavItems>
            <NavItem><NavLink to="/demo">Demo</NavLink></NavItem>
            <NavItem><NavLink to="/register">内测</NavLink></NavItem>
            <NavItem><NavLink to="/login">登录</NavLink></NavItem>
          </NavItems>
        </Nav>
      </Header>
    </>
  );
};

export default HomeHeader;