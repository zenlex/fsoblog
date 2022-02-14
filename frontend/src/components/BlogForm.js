import React from "react";

const BlogForm = ({ addBlog }) => (
  <form onSubmit={addBlog}>
    <div>
      title:
      <input type="text" name="title" />
    </div>
    <div>
      author:
      <input type="text" name="author" />
    </div>
    <div>
      url:
      <input type="text" name="url" />
    </div>
    <button type="submit">create</button>
  </form>
)

export default BlogForm