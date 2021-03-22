import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useField } from '../../hooks';
import Logo from '../Logo';
import { Button, Label, Input } from '../utilities/FormComponents';

const StyledLink = styled(Link)`
  color: var(--main-color-highlight);
`;

const StyledButton = styled(Button)`
  display: block;
  width: 100%;
  border-radius: var(--radius-md);
`;

const LoginHeading = styled.h1`
  text-align: center;
  font-size: var(--heading-md-font-size);
`;

const Container = styled.div`
  min-height: 100vh;

  @media (min-width: 375px) {
    width: 100%;
    max-width: 375px;
    margin: 0 auto;
  }
`;

const FormDetail = styled.div`
  padding: var(--space-32) var(--space-16);
  border: 1px solid transparent;

  @media (min-width: 375px) {
    padding-left: var(--space-32);
    padding-right: var(--space-32);
    border: 1px solid #333;
    border-radius: var(--radius-md);
  }
`;

const LogoContainer = styled.div`
  padding: var(--space-32) var(--space-16);

  @media (min-width: 375px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const BreakLine = styled.div`
  height: 1px;
  background-color: var(--color-grey-04);
  margin-top: var(--space-48);
`;

const Register = ({ handleRegister }) => {
  const email = useField('email');
  const username = useField('text');
  const password = useField('password');
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegister();
    history.push('/login');
  };

  return (
    <Container>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <FormDetail>
        <LoginHeading>注册</LoginHeading>
        <form onSubmit={handleSubmit}>
          <div className="md-margin-bottom">
            <Label htmlFor="email">邮箱地址</Label>
            <Input
              {...email}
              id="email"
              required
            />
          </div>
          <div className="md-margin-bottom">
            <Label htmlFor="username">用户名</Label>
            <Input
              {...username}
              id="username"
              required
            />
          </div>
          <div className="md-margin-bottom">
            <Label htmlFor="password">密码</Label>
            <Input
              {...password}
              id="password"
              required
            />
          </div>
          <div>
            <StyledButton id="login-button" type="submit">注册</StyledButton>
          </div>
        </form>
        <BreakLine></BreakLine>
        <div className="md-margin-top text-align-center sm1-font-size">
          <p>已有账号？<StyledLink to="/login">登录</StyledLink></p>
        </div>
      </FormDetail>
    </Container>
  );
};

export default Register;