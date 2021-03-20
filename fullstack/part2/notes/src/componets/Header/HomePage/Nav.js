import React from 'react';
import styled from 'styled-components';
import {
  Link
} from 'react-router-dom';

const Nav = styled.nav`
  display: none;
  height: 100%; // 64px

  @media (min-width: 480px) {
    display: block;
    margin-left: auto;
  }
`;

const ListContainer = styled.ul`
  // align-items: stretch (by default)
  // The flex items will stretch to fill the size of the cross axios
  display: flex; 
  height: 100%; // 64px
`;

const List = styled.li`
  // The flex items will stretch to fill the size of the cross axios
  display: flex;
`;

const StyledLink = styled(Link)`
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
`;

const HeaderNav = () => {
  return (
    <Nav>
      <ListContainer>
        <List><StyledLink to="/demo">Demo</StyledLink></List>
        <List><StyledLink to="/">内测</StyledLink></List>
        <List><StyledLink to="/login">登录</StyledLink></List>
      </ListContainer>
    </Nav>
  );
};

export default HeaderNav;