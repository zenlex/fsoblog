const notificationStyle = {
  padding: '0px 10px',
  backgroundColor: 'lightgrey',
  color: 'green',
  border: '3px solid green',
  borderRadius: 5,
  margin: '10px 0px',
};

const errorStyle = {
  padding: '0px 10px',
  backgroundColor: 'lightgrey',
  color: 'red',
  border: '3px solid red',
  borderRadius: 5,
  margin: '10px 0px',
};

const Notification = ({ alert }) => {
  if (!alert) return null;
  return (
    <div
      style={alert.type === 'error' ? errorStyle : notificationStyle}
      className='notification'
    >
      <h2>{alert.message}</h2>
    </div>
  );
};

export default Notification;
