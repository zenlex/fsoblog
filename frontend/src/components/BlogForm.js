import { useState } from 'react';

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addBlog(title, author, url);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

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
};

export default BlogForm;
