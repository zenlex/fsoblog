import blogService from '../services/blogs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setAlert, setBlogs } from '../reducers';
import Comments from './Comments';
import { Box, Typography, Button, Stack } from '@mui/material';

const BlogDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, currUser } = useSelector((state) => ({
    blogs: state.blogs,
    currUser: state.user,
  }));
  const blog = blogs.filter((blog) => blog.id === params.id)[0];
  const blogStyle = {
    padding: 10,
    paddingRight: 20,
    border: 'solid',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 5,
  };
  //TODO: refactor this handler or pass in as prop? Maybe the thing to do is move all these service actions to be dispatch calls to the reducer- it's reused from Bloglist
  const updateBlog = async ({
    id,
    user,
    likes,
    author,
    title,
    url,
    comments,
  }) => {
    const update = {
      id,
      user: user.id,
      likes,
      author,
      title,
      url,
      comments,
    };
    const updatedBlog = await blogService.updateBlog(update);
    dispatch(
      setBlogs(
        blogs.filter((blog) => blog.id !== updatedBlog.id).concat(updatedBlog)
      )
    );
  };

  const addComment = async (comment) => {
    const response = await blogService.addComment(comment, blog.id);
    return response.data;
  };

  const handleLike = () => {
    updateBlog({ ...blog, likes: blog.likes + 1 });
  };

  const deleteBlog = async ({ id }) => {
    blogService.deleteBlog(id);
    dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)));
    dispatch(
      setAlert({
        type: 'success',
        message: `${blog.title} successfully deleted`,
      })
    );
    setTimeout(() => dispatch(setAlert(null)), 3000);
    navigate('/', { replace: true });
  };

  const handleDelete = () => {
    const msg = `Are you sure you want to delete "${blog.title}" by ${blog.author} ?`;
    if (window.confirm(msg)) {
      deleteBlog(blog);
    }
  };
  if (!blog) return <div>No blog found at that id...</div>;

  return (
    <Box style={blogStyle}>
      <Stack direction='column' spacing={2}>
        <Typography variant='h4'>
          <i>{blog.title}</i> by {blog.author}
        </Typography>
        <Typography>
          URL:{' '}
          <a href={blog.url} target='_blank' rel='noreferrer'>
            {blog.url}
          </a>
        </Typography>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Typography variant='subtitle1' margin='normal' data-cy='likes'>
            Likes: {blog.likes}
          </Typography>
          <Button
            variant='outlined'
            size='small'
            onClick={handleLike}
            data-cy='like-btn'
          >
            like
          </Button>
        </Stack>
        <Typography>Submitted by User: {blog.user.name}</Typography>
        {currUser.id === blog.user.id && (
          <Button
            variant='outlined'
            color='error'
            data-cy='delete'
            onClick={handleDelete}
            sx={{ width: '50%' }}
          >
            remove
          </Button>
        )}
        <Comments blog={blog} addComment={addComment} />
      </Stack>
    </Box>
  );
};

export default BlogDetail;
