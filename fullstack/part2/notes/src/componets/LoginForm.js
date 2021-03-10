import React from 'react';

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => (
  <div>
    <h2>Login</h2>

    <form onSubmit={handleSubmit}>
      <div>
        username
        <input 
          value={username}
          name="Username"
          onChange={handleUsernameChange}/> 
      </div>
      <div>
        password
        <input 
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}/> 
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  </div>
  );

export default LoginForm;