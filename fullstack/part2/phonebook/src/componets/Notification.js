const Notification = ({ message, className }) => {
  if (message === null) {
    return null;
  }

  const name = `warning ${className}`;

  return (
    <div className={name}>
      {message}
    </div>
  )
}

export default Notification;