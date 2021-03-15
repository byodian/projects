import React from 'react';
const CountryDetail = ({ flag, name, capital, population, languages, buttonLabel, toggleVisibility }) => {
  const border = {
    border: '1px solid red'
  };

  return (
    <div style={border}>
      <h2>
        <span>{name}</span>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </h2>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <h3>Spoken languages</h3>
      <ul>
        {languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <picture>
        <img src={flag} alt="country_flag"/>
      </picture>
    </div>
  );
};

export default CountryDetail;