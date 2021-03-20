import React from 'react';
import Nav from './Nav';
import Logo from '../../Logo';
import styled from 'styled-components';

const HeaderContainer = styled.div`
`;

const Header = styled.header`
  display: flex;
  height: var(--space-48);
`;

const NotesPageHeader = ({ handleLogout }) => {

  return (
    <HeaderContainer>
      <Header>
        <Logo />
        <Nav handleLogout={handleLogout} />
      </Header>
    </HeaderContainer>
  );
};

export default NotesPageHeader;