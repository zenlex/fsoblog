import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }
  return (
    < form onSubmit={handleSubmit} >
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          id="usernameinp"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          id="passwordinp"
        />
      </div>
      <button type="submit">login</button>
    </ form>
  )
}

export default LoginForm