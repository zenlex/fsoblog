import { useSelector } from 'react-redux';

const Users = () => {
  const { usersInfo } = useSelector((state) => state);
  return (
    <div>
      <h1>user info</h1>
      {usersInfo.map((user) => (
        <li key={user.username}>
          <span>
            {user.name} ==&gt; blogs: {user.blogs.length}
          </span>
        </li>
      ))}
    </div>
  );
};

export default Users;
