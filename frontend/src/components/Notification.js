const notificationStyle = {
  padding: '0px 10px',
  backgroundColor: 'lightgrey',
  color: 'green',
  border: '3px solid green',
  borderRadius: 5,
  margin: '10px 0px'
}

const errorStyle = {
  padding: '0px 10px',
  backgroundColor: 'lightgrey',
  color: 'red',
  border: '3px solid red',
  borderRadius: 5,
  margin: '10px 0px'
}

const Notification = ({ message }) => {
  let error
  if (!message) return null
  if (message instanceof Error) {
    message = message.response.data.error
    error = true
  } else error = false
  return (
    <div style={error ? errorStyle : notificationStyle}>
      <h2>{message ? message : ''}</h2>
    </div>
  )
}

export default Notification