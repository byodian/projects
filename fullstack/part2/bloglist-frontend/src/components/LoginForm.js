import React, { useState } from 'react';
import Input from './Input';

const LoginForm = ({ createLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    createLogin({ username, password});
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username</label>
          <Input 
            id="username"
            isRequired={true}
            type="text"
            name="Username"
            value={username}
            handleChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <Input 
            id="password"
            isRequired={true}
            type="password"
            name="Password"
            value={password}
            handleChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;