import React from 'react';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import BlogDetail from './components/BlogDetail';
import Notification from './components/Notification';
import Users from './components/Users';
import UserDetail from './components/UserDetail';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';

const App = () => {
  //---------STATE---------->
  const { alert, user } = useSelector((state) => state);
  //---------REFS---------->
  //---------HOOKS---------->
  //---------RETURN---------->

  return (
    <Router>
      <Notification alert={alert} />
      <Container>
        <Navbar />
        {user && <BlogForm />}
        <Routes>
          <Route
            path='/'
            element={
              <div>{user ? 'use menu to navigate' : 'please log in'}</div>
            }
          />
          <Route path='/blogs' exact element={<Blogs />} />
          <Route path='/users' exact element={<Users />} />
          <Route path='/users/:id' exact element={<UserDetail />} />
          <Route path='/blogs/:id' exact element={<BlogDetail />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
