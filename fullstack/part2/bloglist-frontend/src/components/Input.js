import React from 'react';

const Input = ({ isRequired, type, value, name, handleChange, id }) => (
  <input
    id={id}
    required={isRequired} 
    type={type} 
    value={value}
    name={name} 
    onChange={handleChange}
  />
);

export default Input;