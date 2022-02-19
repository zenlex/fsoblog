import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const handleLike = () => {
    setLikes(likes + 1);
    blog.likes += 1;
    updateBlog(blog);
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
          <span>
            Likes: {likes}
            <button onClick={handleLike}>like</button>
          </span>
          <p>Submitted by User: {blog.user.name}</p>
        </div>
      }
    </div >
  )
}

export default Blog