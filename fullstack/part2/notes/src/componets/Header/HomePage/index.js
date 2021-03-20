import React from 'react';
import Nav from './Nav';
import Logo from '../Logo';
import styled from 'styled-components';

const HeaderContainer = styled.div`
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--space-64);
  
  @media (min-width: 480px) {
    justify-content: flex-start;
    padding-left: var(--space-96);
    padding-right: var(--space-96);
  }
`;

const HomePageHeader = () => {

  return (
    <HeaderContainer>
      <Header>
        <Logo />
        <Nav />
      </Header>
    </HeaderContainer>
  );
};

export default HomePageHeader;