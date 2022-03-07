import { useState, useEffect } from 'react';
import loginService from '../services/login';
import { useDispatch } from 'react-redux';
import { setUser, setAlert } from '../reducers';
import blogService from '../services/blogs';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loggedUser = window.sessionStorage.getItem('blogAppUser');
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser);
      dispatch(setUser(parsedUser));
      blogService.setToken(parsedUser.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      dispatch(setUser(user));
      blogService.setToken(user.token);
      window.sessionStorage.setItem('blogAppUser', JSON.stringify(user));
      dispatch(setAlert({ type: 'success', message: 'login successful' }));
      setTimeout(() => {
        dispatch(setAlert(null));
      }, 3000);
    } catch (err) {
      dispatch(
        setAlert({
          type: 'error',
          message: err.response.data.error || err.message,
        })
      );
      setTimeout(() => {
        dispatch(setAlert(null));
      }, 3000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
    setUsername('');
    setPassword('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          id='usernameinp'
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          id='passwordinp'
        />
      </div>
      <button type='submit'>login</button>
    </form>
  );
};

export default LoginForm;
