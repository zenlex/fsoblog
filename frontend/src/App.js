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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
    const loggedUser = window.localStorage.getItem('blogAppUser')
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('blogAppUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      setNotification('login successful')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (err) {
      setNotification('Wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleLogout = (e) => {
    window.localStorage.removeItem('blogAppUser')
    setNotification(`${user.name} logged out`)
    setTimeout(() => setNotification(null), 3000)
    setUser(null)
  }

  const handleUsernameChange = ({ target }) => setUsername(target.value);

  const handlePasswordChange = ({ target }) => setPassword(target.value);

  const addBlog = async (title, author, url) => {
    const newBlog = { title, author, url }
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

  if (!user) {
    return (
      <div>
        {notification ? <Notification message={notification} /> : ''}
        <h2>log in to application</h2>
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />
      </div>
    )
  } else {
    return (
      <div>
        {notification ? <Notification message={notification} /> : ''}
        <button onClick={handleLogout}>Logout</button>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        <Togglable buttonLabel="add blog" ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>
      </div>
    )
  }
}

export default App