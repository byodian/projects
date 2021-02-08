import CountryDetail from './CountryDetail';

const CountriesList = ({ countries, handleClick}) => {
  return (
    <ul>{countries.map(country => (
      <li key={country.demonym}>
        {country.name} <button onClick={handleClick(country)}>show</button>
      </li>
    ))}</ul>
  );
}

const WarningMessage = ({ text }) => (
  <p>{text}</p>
);

const SearchResult= ({ countries, handleClick, showDetail, country, getWeather }) => {
  const len = countries.length;
  const text = len > 10 
    ? `Too many countries (${len} countries), specify another filter.`
    : 'No founded';

  if (showDetail) {
    return (
      <CountryDetail 
        country={country}
        weather={getWeather(country.capital).then(response => response.data)}
      />
    );
  }

  if (len <= 10 && len > 1 && !showDetail) {
    return (
      <CountriesList 
        countries={countries} 
        handleClick={handleClick}
      />
    );
  } else if (len === 1) {
    const country = countries[0];

    return (
      <CountryDetail 
        country={country} 
        weather={getWeather(country.capital)}
      />
    );
  } else {
    return <WarningMessage text={text} />;
  }
}

export default SearchResult;