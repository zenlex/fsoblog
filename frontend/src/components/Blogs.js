import { useEffect } from 'react';
import blogService from '../services/blogs';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogs } from '../reducers';
import Blog from './Blog';

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, user } = useSelector((state) => state);

  useEffect(
    () => async () => {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    },
    [user]
  );

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

  if (!user) return null;

  return (
    <div>
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
    </div>
  );
};

export default Blogs;
