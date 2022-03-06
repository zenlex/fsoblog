import React, { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import UsersService from './services/users';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Users from './components/Users';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogs, setUser, setAlert, setUsersInfo } from './reducers';

const App = () => {
  //---------STATE---------->
  const { user, blogs, alert } = useSelector((state) => ({
    blogs: state.blogs,
    user: state.user,
    alert: state.alert,
  }));

  const dispatch = useDispatch();
  //---------REFS---------->
  const blogFormRef = useRef();

  //---------HOOKS---------->
  useEffect(
    () => async () => {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    },
    [user]
  );

  useEffect(() => {
    const loggedUser = window.sessionStorage.getItem('blogAppUser');
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser);
      dispatch(setUser(parsedUser));
      blogService.setToken(parsedUser.token);
    }
  }, []);

  useEffect(
    () => async () => {
      const usersInfo = await UsersService.getAll();
      dispatch(setUsersInfo(usersInfo));
    },
    [user]
  );

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

  const handleLogout = () => {
    window.sessionStorage.removeItem('blogAppUser');
    dispatch(setAlert({ type: 'success', message: `${user.name} logged out` }));
    setTimeout(() => dispatch(setAlert(null)), 3000);
    dispatch(setUser(null));
  };

  const addBlog = async (title, author, url) => {
    const newBlog = { title, author, url, username: user.username };
    try {
      blogFormRef.current.toggleVisibility();
      const addedBlog = await blogService.createBlog(newBlog);
      dispatch(setBlogs(blogs.concat(addedBlog)));
      dispatch(
        setAlert({ type: 'success', message: 'blog added successfully' })
      );
      setTimeout(() => dispatch(setAlert(null)), 3000);
    } catch (err) {
      console.log(err);
      dispatch(setAlert(err));
      setTimeout(() => dispatch(setAlert(null)), 3000);
    }
  };

  const updateBlog = async ({ id, user, likes, author, title, url }) => {
    const update = {
      id,
      user: user.id,
      likes,
      author,
      title,
      url,
    };
    const updatedBlog = await blogService.updateBlog(update);
    dispatch(
      setBlogs(
        blogs.filter((blog) => blog.id !== updatedBlog.id).concat(updatedBlog)
      )
    );
  };

  const deleteBlog = async ({ id }) => {
    blogService.deleteBlog(id);
    dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)));
  };
  if (!user) {
    return (
      <div>
        <Notification alert={alert} />
        <h2>log in to application</h2>
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  } else {
    return (
      <div>
        <Notification alert={alert} />
        <button onClick={handleLogout}>Logout</button>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            currUser={user}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />
        ))}
        <Togglable buttonLabel='add blog' ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>
        <Users />
      </div>
    );
  }
};

export default App;
