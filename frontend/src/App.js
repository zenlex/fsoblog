import React from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Users from './components/Users';
import { useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';

const App = () => {
  //---------STATE---------->
  const { alert, user } = useSelector((state) => state);
  //---------REFS---------->
  //---------HOOKS---------->
  //---------RETURN---------->

  return (
    <div>
      <Notification alert={alert} />
      <LoginForm />
      <Routes>
        <Route path='/' element={<Blogs />} />

        <Route path='/users' element={<Users />} />
      </Routes>
      <BlogForm />
      <div>{user && <Link to='/users'>User Info</Link>}</div>
    </div>
  );
};

export default App;
