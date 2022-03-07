import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import blogService from '../services/blogs';
import { setBlogs, setAlert, setVisibility } from '../reducers';

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
    return <button onClick={(e) => showForm(e)}>add blog</button>;
  }
  if (visible) {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='title'
            placeholder='enter title'
            onChange={({ target }) => setTitle(target.value)}
            data-cy='title'
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='author'
            placeholder='enter author'
            onChange={({ target }) => setAuthor(target.value)}
            data-cy='author'
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='url'
            placeholder='enter url'
            onChange={({ target }) => setUrl(target.value)}
            data-cy='url'
          />
        </div>
        <button type='submit' name='create'>
          create
        </button>
      </form>
    );
  }
};

export default BlogForm;
