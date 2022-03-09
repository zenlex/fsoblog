import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import blogService from '../services/blogs';
import { setBlogs, setAlert, setVisibility } from '../reducers';
import { Button, Stack, TextField } from '@mui/material';

const BlogForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const state = useSelector((state) => state);
  const user = state.user || null;
  const blogs = state.blogs || null;
  const visible = state.visibilities.BlogForm || false;

  const addBlog = async (title, author, url) => {
    const newBlog = {
      title,
      author,
      url,
      username: user.username,
      user: user.id,
    };
    try {
      const addedBlog = await blogService.createBlog(newBlog);
      dispatch(setBlogs(blogs.concat(addedBlog)));
      dispatch(
        setAlert({ type: 'success', message: 'blog added successfully' })
      );
      setTimeout(() => dispatch(setAlert(null)), 3000);
    } catch (err) {
      dispatch(
        setAlert({
          type: 'error',
          message: err.response.data.error || err.message,
        })
      );
      setTimeout(() => dispatch(setAlert(null)), 3000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBlog(title, author, url);
    setTitle('');
    setAuthor('');
    setUrl('');
    dispatch(setVisibility({ BlogForm: false }));
  };

  const showForm = (e) => {
    e.preventDefault();
    dispatch(setVisibility({ BlogForm: true }));
  };

  if (!visible) {
    return (
      <Button
        variant='contained'
        color='success'
        sx={{ mt: 2, ml: 2 }}
        onClick={(e) => showForm(e)}
      >
        add blog
      </Button>
    );
  }
  if (visible) {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label='title'
            variant='filled'
            margin='normal'
            type='text'
            value={title}
            name='title'
            placeholder='enter title'
            onChange={({ target }) => setTitle(target.value)}
            data-cy='title'
          />
        </div>
        <div>
          <TextField
            label='author'
            variant='filled'
            margin='normal'
            type='text'
            value={author}
            name='author'
            placeholder='enter author'
            onChange={({ target }) => setAuthor(target.value)}
            data-cy='author'
          />
        </div>
        <div>
          <TextField
            label='url'
            variant='filled'
            margin='normal'
            type='text'
            value={url}
            name='url'
            placeholder='enter url'
            onChange={({ target }) => setUrl(target.value)}
            data-cy='url'
          />
        </div>
        <Stack direction='row' spacing={1} justifyContent>
          <Button
            type='submit'
            name='create'
            variant='contained'
            color='success'
          >
            create
          </Button>
          <Button
            type='button'
            onClick={() => dispatch(setVisibility({ BlogForm: false }))}
            variant='contained'
            color='error'
          >
            cancel
          </Button>
        </Stack>
      </form>
    );
  }
};

export default BlogForm;
