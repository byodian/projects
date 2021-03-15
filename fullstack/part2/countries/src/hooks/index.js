import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCountry = () => {
  const [countries, setCountries] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const countriesToShow = countries.filter(c => c.name
    .toLowerCase()
    .includes(value.toLowerCase())
  );

  const len = countriesToShow ? countriesToShow.length : countries.length;

  return {
    value,
    len,
    countriesToShow,
    onChange,
  };
};