import { Stack, TextField, Typography, Button } from '@mui/material';
import { useState } from 'react';

const Comments = ({ blog, addComment }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(blog.comments);

  const handleSubmit = (e) => {
    e.preventDefault();
    setComments(comments.concat(comment));
    addComment(comment, blog.id);
    setComment('');
  };

  return (
    <div>
      <Typography variant='h5'>Comments</Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction='row' spacing={1}>
          <TextField
            label='comment: '
            variant='outlined'
            size='small'
            onChange={({ target }) => setComment(target.value)}
            value={comment}
          />
          <Button color='success' variant='outlined'>
            add comment
          </Button>
        </Stack>
      </form>

      <ul>
        {comments.map((com) => (
          <li key={com + (Math.random() * 1000).toString()}>{com}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
