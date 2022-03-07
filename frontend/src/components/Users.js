import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UsersService from '../services/users';
import { setUsersInfo } from '../reducers';
const Users = () => {
  const dispatch = useDispatch();
  const { usersInfo, user } = useSelector((state) => state);
  useEffect(() => {
    const fetchData = async () => {
      console.log('fetching usersInfo');
      const usersInfo = await UsersService.getAll();
      console.log('dispatching usersInfo', usersInfo);
      dispatch(setUsersInfo(usersInfo));
    };
    fetchData();
  }, []);

  if (!user) return null;

  return (
    <div>
      <h1>user info</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {usersInfo.map((user) => (
            <tr key={user.username}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
