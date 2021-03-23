import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../../Logo';
import Alert from '../../Alert';

const Heading = styled.h1`
  text-align: center;
  font-size: var(--heading-md-font-size);
`;

const StyledLink = styled(Link)`
  color: var(--main-color-highlight);
`;

const LogoContainer = styled.div`
  padding: var(--space-32) var(--space-16);

  @media (min-width: 424px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const BreakLine = styled.div`
  height: 1px;
  background-color: var(--color-grey-04);
  margin-top: var(--space-48);
`;

const Container = styled.div`
  min-height: 100vh;

  @media (min-width: 424px) {
    width: 100%;
    max-width: 375px;
    margin: 0 auto;
  }
`;

const FormContainer = styled.div`
  padding: var(--space-32) var(--space-16);
  border: 1px solid transparent;

  @media (min-width: 424px) {
    padding-left: var(--space-32);
    padding-right: var(--space-32);
    border: 1px solid var(--main-color);
    border-radius: var(--radius-md);
  }
`;

const Form = ({ heading, message, children }) => {
  return (
    <Container>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <FormContainer>
        <Heading>{heading}</Heading>
        <Alert error message={message}>{message}</Alert>
        {children}
        <BreakLine></BreakLine>
        <div className="md-margin-top text-align-center sm1-font-size">
          {heading === '登录'
            ? <p>还没有账号？<StyledLink to="/register">注册</StyledLink></p>
            : <p>已有账号？<StyledLink to="/login">登录</StyledLink></p>
          }
        </div>
      </FormContainer>
    </Container>
  );
};

export default Form;