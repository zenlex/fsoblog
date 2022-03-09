import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <Stack style={blogStyle} direction='row' spacing={1}>
      <Link to={`/blogs/${blog.id}`}>
        <Typography>{blog.title}</Typography>
      </Link>
      <Typography>-{blog.author}</Typography>
    </Stack>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
