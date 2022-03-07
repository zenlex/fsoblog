import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';

const style = {
  display: 'flex',
  justifyContent: 'space-around',
  backgroundColor: 'lightblue',
  border: '2px solid darkgrey',
  alignItems: 'center',
  fontSize: '1.25em',
  padding: 5,
};

const Navbar = () => {
  const { user } = useSelector((state) => state);
  return (
    <nav>
      <div style={style}>
        <LoginForm />
        {user && (
          <div style={style}>
            <Link style={style} to='/blogs'>
              blogs
            </Link>
            <Link style={style} to='/users'>
              users
            </Link>
            <h3>{`${user.name} logged in`}</h3>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
