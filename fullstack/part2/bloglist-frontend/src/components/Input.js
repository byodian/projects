import React from 'react';

const Input = ({ isRequired, type, value, name, handleChange }) => (
  <input
    required={isRequired} 
    type={type} 
    value={value}
    name={name} 
    onChange={handleChange}
  />
);

export default Input;