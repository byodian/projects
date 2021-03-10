import React from 'react';
const Notification = ({ notifiProps }) => {
  
  if (!notifiProps.message) {
    return null;
  }

  return (
    <div className={notifiProps.className}>
      {notifiProps.message}
    </div>
  );
};

export default Notification;