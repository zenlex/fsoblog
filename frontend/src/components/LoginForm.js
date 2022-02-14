import React from 'react'

const LoginForm = ({ username, password, handleLogin, handleUsernameChange, handlePasswordChange }) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm