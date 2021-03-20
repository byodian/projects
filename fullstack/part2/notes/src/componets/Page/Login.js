import React from 'react';
import { useHistory } from 'react-router-dom';
import { useField } from '../../hooks';

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
    username.reset();
    password.reset();
    history.push('/notes');
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input {...username} reset="username" />
        </div>
        <div>
          password
          <input {...password} reset="password" />
        </div>
        <div>
          <button id="login-button" type="submit">login in</button>
        </div>
      </form>
    </div>
  );
};

export default Login;