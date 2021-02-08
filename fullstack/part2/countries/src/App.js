import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountriesForm from './componetns/CountriesForm';
import SearchResult from './componetns/SearchReault';

const REACT_APP_API_KEY = '15b62304600f0661bdc5fd946e4c6f3e';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [country, setCountry] = useState({});

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  const getWeather = async function (query) {
    const response = await axios.get(`http://api.weatherstack.com/current?access_key=${REACT_APP_API_KEY}&query=${query}`);
    const weather = await response.data;
    return weather;
  };

  const countriesToShow = countries.filter(country => 
    country.name
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  const handleCountryChange = (event) => {
    setFilter(event.target.value);
    setShowDetail(false);
  }

  const handleClick = (country) => () => {
    setShowDetail(true);
    setCountry(country);
  }

  return (
    <div>
      <CountriesForm value={filter} handleChange={handleCountryChange} />
      <SearchResult 
        countries={countriesToShow} 
        handleClick={handleClick}
        showDetail={showDetail}
        country={country}
        getWeather={getWeather}
      />
    </div>
  )
}

export default App;