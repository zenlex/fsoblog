import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UsersService from '../services/users';
import { setUsersInfo } from '../reducers';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material/';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
const Users = () => {
  const dispatch = useDispatch();
  const { usersInfo, user } = useSelector((state) => state);
  useEffect(() => {
    const fetchData = async () => {
      const usersInfo = await UsersService.getAll();
      dispatch(setUsersInfo(usersInfo));
    };
    fetchData();
  }, []);

  if (!user) return null;

  return (
    <div>
      <Typography variant='h4' marginTop='20px'>
        user info
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>Name</Typography>
            </TableCell>
            <TableCell>
              <Typography>Blogs Created</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersInfo.map((user) => (
            <TableRow key={user.username}>
              <TableCell>
                <Link to={`/users/${user.id}`}>
                  <Typography>{user.name}</Typography>
                </Link>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
