import React from 'react';

const Country = ({ country, toggleVisibility }) => {
  return (
    <p>
      <span>{country.name}</span>
      <button onClick={toggleVisibility}>toggle</button>
    </p>
  );
};

export default Country;