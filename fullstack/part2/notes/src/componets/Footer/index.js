import React from 'react';
import Logo from '../Logo';
import styled from 'styled-components';

const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.8rem; 
  border-top: 1px solid #333;
  border-bottom: 1px solid transparent;

  a {
    display: flex;
  }

  svg {
    width: 45px;
  }
`;

const Footer = () => {
  return (
    <Container>
      <Logo />
    </Container>
  );
};

export default Footer;