import { useEffect } from 'react';
import blogService from '../services/blogs';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogs } from '../reducers';
import Blog from './Blog';
import { Typography } from '@mui/material';

const Blogs = () => {
  useEffect(() => {
    const fetchData = async () => {
      const bloglist = await blogService.getAll();
      dispatch(setBlogs(bloglist));
    };
    if (blogs.length === 0) {
      fetchData();
    }
  }, []);

  const dispatch = useDispatch();
  const { blogs, user } = useSelector((state) => state);

  if (!user) return null;
  if (blogs.length === 0) return <div>No Blogs Found...</div>;

  return (
    <div>
      <Typography
        variant='h4'
        sx={{ marginTop: 3, marginBottom: 3, textDecoration: 'underline' }}
      >
        blogs
      </Typography>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
