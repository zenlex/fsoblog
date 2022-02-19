import { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const [showDetails, setShowDetails] = useState(false);



  return (
    <div style={blogStyle}>
      <div>
        <span style={{ marginRight: 10 }}> {blog.title}</span>
        <span style={{ marginRight: 10 }}>{blog.author}</span>
        <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      {
        showDetails && <div>
          <p>{blog.url}</p>
          <span>
            {blog.likes}
            <button onClick={() => console.log('add a like')}>like</button>
          </span>
          <p>{blog.user.name}</p>
        </div>
      }
    </div >
  )
}

export default Blog