import { Alert } from '@mui/material';

const Notification = ({ alert }) => {
  if (!alert) return null;
  return (
    <Alert severity={alert.type === 'error' ? 'error' : 'success'}>
      <h2>{alert.message}</h2>
    </Alert>
  );
};

export default Notification;
