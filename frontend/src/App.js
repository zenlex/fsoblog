import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  //---------STATE---------->
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null)

  //---------REFS---------->
  const blogFormRef = useRef();

  //---------HOOKS---------->
  useEffect(() => (async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }), [user])

  useEffect(() => {
    const loggedUser = window.sessionStorage.getItem('blogAppUser')
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.sessionStorage.setItem('blogAppUser', JSON.stringify(user))
      setNotification('login successful')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (err) {
      setNotification(err)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleLogout = (e) => {
    window.sessionStorage.removeItem('blogAppUser')
    setNotification(`${user.name} logged out`)
    setTimeout(() => setNotification(null), 3000)
    setUser(null)
  }


  const addBlog = async (title, author, url) => {
    const newBlog = { title, author, url, username: user.username }
    try {
      blogFormRef.current.toggleVisibility()
      const addedBlog = await blogService.createBlog(newBlog);
      setBlogs(blogs.concat(addedBlog))
      setNotification('blog added successfully');
      setTimeout(() => setNotification(null), 3000)
    } catch (err) {
      console.log(err)
      setNotification(err);
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const updateBlog = async ({ id, user, likes, author, title, url }) => {
    const update = {
      id,
      user: user.id,
      likes,
      author,
      title,
      url
    }
    const updatedBlog = await blogService.updateBlog(update);
    console.log('returned updatedBlog: ', updatedBlog);
    setBlogs(blogs.filter(blog => blog.id !== updatedBlog.id).concat(updatedBlog));
  }

  const deleteBlog = async ({ id }) => {
    blogService.deleteBlog(id);
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  if (!user) {
    return (
      <div>
        {notification ? <Notification message={notification} /> : ''}
        <h2>log in to application</h2>
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  } else {
    return (
      <div>
        {notification ? <Notification message={notification} /> : ''}
        <button onClick={handleLogout}>Logout</button>
        <h2>blogs</h2>
        {blogs.sort(({ likes: a }, { likes: b }) => b - a).map(blog =>
          <Blog key={blog.id} blog={blog} currUser={user} updateBlog={updateBlog} deleteBlog={deleteBlog} />
        )}
        <Togglable buttonLabel="add blog" ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>
      </div>
    )
  }
}

export default App