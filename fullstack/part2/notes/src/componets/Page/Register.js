import React from 'react';
import { useHistory } from 'react-router-dom';
import { useField } from '../../hooks';
import styled from 'styled-components';
import Logo from '../Logo';
import Button from '../Button';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  color: var(--main-color);
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

const Label = styled.label`
  font-weight: bold;
  font-size: 1.4rem;
  margin-bottom: var(--space-4);
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-md);
  border: 1px solid #333;

  &::placeholder {
    color: var(--color-grey-05);
    font-size: 1.4rem;
  }

  &:focus:invalid {
    /* border: 1px solid var(--main-color); */
    outline-color: var(--main-color);
  }

  &:focus:valid {
    outline-color: var(--color-green-05);
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
    username.reset();
    password.reset();
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
              reset="email"
              required
            />
          </div>
          <div className="md-margin-bottom">
            <Label htmlFor="username">用户名</Label>
            <Input
              {...username}
              id="username"
              reset="username"
              required
            />
          </div>
          <div className="md-margin-bottom">
            <Label htmlFor="password">密码</Label>
            <Input
              {...password}
              id="password"
              reset="password"
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