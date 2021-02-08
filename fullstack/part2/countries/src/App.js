import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountriesForm from './componetns/SearchForm';
import SearchResult from './componetns/SearchResult';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [country, setCountry] = useState({});
  // const [query, setQuery] = useState('Beijing');
  // const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data);
        setCountries(response.data);
      })
  }, []);

  // useEffect(async () => {
  //   const response = await axios.get(`http://api.weatherstack.com/current?access_key=${REACT_APP_API_KEY}&query=${query}`);
  //   const weather = await response.data;
  //   setWeather(weather);
  // });

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
    // setQuery(country.capital)
  }

  return (
    <div>
      <CountriesForm value={filter} handleChange={handleCountryChange} />
      <SearchResult 
        countries={countriesToShow} 
        handleClick={handleClick}
        showDetail={showDetail}
        country={country}
        // weather={weather}
      />
    </div>
  )
}

export default App;