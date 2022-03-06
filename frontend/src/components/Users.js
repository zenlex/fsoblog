import { useSelector } from 'react-redux';

const Users = () => {
  const { usersInfo } = useSelector((state) => state);
  return (
    <div>
      <h1>user info</h1>
      <table>
        <thead>
          <th>Name</th>
          <th>Blogs Created</th>
        </thead>
        <tbody></tbody>
      </table>
      {usersInfo.map((user) => (
        <trow key={user.username}>
          <td>{user.name}</td>
          <td>{user.blogs.length}</td>
        </trow>
      ))}
    </div>
  );
};

export default Users;
