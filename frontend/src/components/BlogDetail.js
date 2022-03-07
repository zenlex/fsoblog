import blogService from '../services/blogs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setAlert, setBlogs } from '../reducers';

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
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  //TODO: refactor this handler or pass in as prop? Maybe the thing to do is move all these service actions to be dispatch calls to the reducer- it's reused from Bloglist
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
    <div style={blogStyle}>
      <div>
        <h1>
          <i>{blog.title}</i> by {blog.author}
        </h1>
      </div>
      <div>
        <div>
          URL:{' '}
          <a href={blog.url} target='_blank' rel='noreferrer'>
            {blog.url}
          </a>
        </div>
        <span data-cy='likes'>
          Likes: {blog.likes}
          <button onClick={handleLike} data-cy='like-btn'>
            like
          </button>
        </span>
        <p>Submitted by User: {blog.user.name}</p>
        {currUser.id === blog.user.id && (
          <button data-cy='delete' onClick={handleDelete}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
