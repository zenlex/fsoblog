import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, currUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const [showDetails, setShowDetails] = useState(false)

  const handleLike = () => {
    blog.likes += 1
    updateBlog(blog)
  }

  const handleDelete = () => {
    const msg = `Are you sure you want to delete "${blog.title}" by ${blog.author} ?`
    if (window.confirm(msg)) {
      deleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        <span style={{ marginRight: 10 }}>Title: {blog.title}</span>
        <span style={{ marginRight: 10 }}>Author: {blog.author}</span>
        <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      {
        showDetails && <div>
          <p>URL: {blog.url}</p>

          <span data-cy="likes">
            Likes: {blog.likes}
            <button onClick={handleLike} data-cy="like-btn">like</button>
          </span>
          <p>Submitted by User: {blog.user.name}</p>
          {currUser.id === blog.user.id && <button onClick={handleDelete}>remove</button>}
        </div>
      }
    </div >
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  currUser: PropTypes.object.isRequired
}

export default Blog