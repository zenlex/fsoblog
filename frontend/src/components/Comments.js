const Comments = ({ comments }) => {
  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((com) => (
          <li key={com + (Math.random() * 1000).toString()}>{com}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
