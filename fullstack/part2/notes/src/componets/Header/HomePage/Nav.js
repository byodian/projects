import React from 'react';
import styled from 'styled-components';
import {
  Link
} from 'react-router-dom';

const Nav = styled.nav`
  display: none;
  height: 100%;

  @media (min-width: 480px) {
    display: block;
    margin-left: auto;
  }
`;

const ListContainer = styled.ul`
  display: flex;
  align-items: center;
  text-align: center;
  height: 100%;
`;

const List = styled.li`
  display: flex;
  height: 100%;

  a {
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 var(--space-16);
    border-top: 2px solid transparent;
    border-bottom: 2px solid transparent;

    &:hover {
      color: var(--color-grey-08);
      background-color: var(--color-grey-01);
      border-bottom: 2px solid var(--main-color);
    }
  }
`;

const HeaderNav = () => {
  return (
    <Nav>
      <ListContainer>
        <List><Link to="/demo">Demo</Link></List>
        <List><Link to="/">内测</Link></List>
        <List><Link to="/login">登录</Link></List>
      </ListContainer>
    </Nav>
  );
};

export default HeaderNav;