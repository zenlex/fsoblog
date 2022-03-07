import React from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Users from './components/Users';
import UserDetail from './components/UserDetail';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

const App = () => {
  //---------STATE---------->
  const { alert, user } = useSelector((state) => state);
  //---------REFS---------->
  //---------HOOKS---------->
  //---------RETURN---------->

  return (
    <Router>
      <Notification alert={alert} />
      <LoginForm />
      <Routes>
        <Route
          path='/'
          exact
          element={user ? <Blogs /> : <div>please log in</div>}
        />
        <Route path='/users' exact element={<Users />} />
        <Route path='/users/:id' exact element={<UserDetail />} />
      </Routes>
      {user && <BlogForm />}
      <div>{user && <Link to='/users'>User Info</Link>}</div>
    </Router>
  );
};

export default App;
