import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Button, Label, Input } from '../../utilities/FormComponents';
import { useField } from '../../../hooks';

const StyledButton = styled(Button)`
  display: block;
  width: 100%;
  border-radius: var(--radius-md);
`;

const Login = ({ handleLogin }) => {
  const username = useField('text');
  const password = useField('password');
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin({
      username: username.value,
      password: password.value
    });
    history.push('/notes');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          <StyledButton id="login-button" type="submit">登录</StyledButton>
        </div>
      </form>
    </>
  );
};

export default Login;