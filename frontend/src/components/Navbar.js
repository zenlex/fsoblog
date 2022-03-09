import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import { Button, Stack, Typography } from '@mui/material';

// const style = {
//   display: 'flex',
//   justifyContent: 'space-around',
//   backgroundColor: 'lightblue',
//   border: '2px solid darkgrey',
//   alignItems: 'center',
//   fontSize: '1.25em',
//   padding: 5,
// };

const Navbar = () => {
  const { user } = useSelector((state) => state);
  return (
    <Stack
      direction='row'
      spacing={3}
      sx={{ bgcolor: 'lightgrey', padding: 2, justifyContent: 'center' }}
    >
      <LoginForm />
      {user && (
        <>
          <Button variant='contained'>
            <Link to='/blogs' underline='hover' color='inherit'>
              blogs
            </Link>
          </Button>
          <Button variant='contained'>
            <Link to='/users'>users</Link>
          </Button>
          <Typography variant='h6'>{`${user.name} logged in`}</Typography>
        </>
      )}
    </Stack>
  );
};

export default Navbar;
