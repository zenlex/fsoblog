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
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        comment:{' '}
        <input
          onChange={({ target }) => setComment(target.value)}
          value={comment}
        />
        <button>add comment</button>
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
