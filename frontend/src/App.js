import React, { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Users from './components/Users';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogs, setUser, setAlert } from './reducers';

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
    //TODO: refactor blog list to its own component and take this with it
    () => async () => {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    },
    [user]
  );

  const handleLogout = () => {
    window.sessionStorage.removeItem('blogAppUser');
    dispatch(setAlert({ type: 'success', message: `${user.name} logged out` }));
    setTimeout(() => dispatch(setAlert(null)), 3000);
    dispatch(setUser(null));
  };

  const toggleBlogForm = () => {
    //todo: refactor this to just use a redux state boolean and a dispatcher from the component
    blogFormRef.current.toggleVisibility();
  };

  const updateBlog = async ({ id, user, likes, author, title, url }) => {
    //todo: refactor to just be likeBlog and move to the blog component
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
    //todo: move with updateBlog to Blog component
    blogService.deleteBlog(id);
    dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)));
  };

  if (!user) {
    return (
      <div>
        <Notification alert={alert} />
        <h2>log in to application</h2>
        <LoginForm />
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
          <BlogForm toggleVisibility={toggleBlogForm} />
        </Togglable>
        <Users />
      </div>
    );
  }
};

export default App;
