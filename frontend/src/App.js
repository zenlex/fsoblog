import React from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Users from './components/Users';
import { useSelector } from 'react-redux';

const App = () => {
  //---------STATE---------->
  const { alert } = useSelector((state) => state);
  //---------REFS---------->
  //---------HOOKS---------->
  //---------RETURN---------->

  return (
    <div>
      <LoginForm />
      <Notification alert={alert} />
      <Blogs />
      {/*TODO: refactor BlogForm and Login form to house their own togglable */}
      <BlogForm />
      <Users />
    </div>
  );
};

export default App;
