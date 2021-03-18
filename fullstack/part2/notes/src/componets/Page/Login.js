import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin({
      username, password
    });
    setUsername('');
    setPassword('');
    history.push('/notes');
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <div>
          <button id="login-button" type="submit">login in</button>
        </div>
      </form>
    </div>
  );
};

export default Login;