import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import UsersService from '../services/users';
import { setUsersInfo } from '../reducers';
const UserDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { blogUser, users } = useSelector((state) => ({
    blogUser: state.usersInfo.filter((user) => user.id === params.id)[0],
    users: state.usersInfo,
  }));

  useEffect(() => {
    const fetchData = async () => {
      const usersInfo = await UsersService.getAll();
      dispatch(setUsersInfo(usersInfo));
    };
    if (!blogUser) {
      console.log('no user info found, fetching');
      fetchData();
    }
  }, []);

  console.log({ blogUser });
  console.log({ users });
  return (
    <div>
      <h1>{blogUser ? blogUser.name : 'No User Found'}</h1>
      <h2>added blogs</h2>
      {blogUser && (
        <ul>
          {blogUser.blogs ? (
            blogUser.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)
          ) : (
            <div>No blogs found for user {params.id}</div>
          )}
        </ul>
      )}
    </div>
  );
};

export default UserDetail;
