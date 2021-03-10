import React from 'react';
import Input from './Input';

const LoginForm = ({ loginFormConfig }) => {
  const { username, password, setUsername, setPassword, handleLogin } = loginFormConfig;
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <Input 
            isRequired={true}
            type="text"
            name="Username"
            value={username}
            handleChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <Input 
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