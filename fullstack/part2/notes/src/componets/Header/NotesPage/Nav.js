import React from 'react';

const Nav = ({ handleLogout }) => {
  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Nav;