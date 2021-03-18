import React from 'react';
import styled from 'styled-components';
import {
  Link
} from 'react-router-dom';

const Nav = styled.nav`
  display: none;

  @media (min-width: 500px) {
    display: block;
  }

  ul {
    display: flex;
  }
`;

const HeaderNav = () => {
  return (
    <Nav>
      <ul>
        <li><Link to="/demo">Demo</Link></li>
        <li><Link to="/login">登录</Link></li>
      </ul>
    </Nav>
  );
};

export default HeaderNav;