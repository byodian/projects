import React, { useState } from 'react';
import Country from './Country';
import Detail from './Detail';

const Togglable = ({ country }) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const buttonLabel = visible
    ? 'hide'
    : 'show';

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div style={hideWhenVisible}>
        <Country
          buttonLabel={buttonLabel}
          country={country}
          toggleVisibility={toggleVisibility}
        />
      </div>
      <div style={showWhenVisible}>
        <Detail
          buttonLabel={buttonLabel}
          toggleVisibility={toggleVisibility}
          flag={country.flag}
          name={country.name}
          capital={country.capital}
          population={country.population}
          languages={country.languages}
        />
      </div>
    </>
  );
};

export default Togglable;