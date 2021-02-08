const CountryDetail = ({ country}) => {
  const { name, capital, population, languages } = country;

  return (
    <div>
      <h2>{name}</h2>
      <p>Capital {capital}</p>
      <p>Population {population}</p>
      <h3>Spoken languages</h3>
      <ul>
        {languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <picture>
        <img src={country.flag} alt="country_flag"/>
      </picture>
      {/* <h3>Weather in {capital}</h3>
      <p><strong>temperature: </strong>{current.temperature} Celcius</p>
      <picture>
        <img src={current.weather_icons[0]} alt="weather icon" style={{width: 50 + 'px'}} />
      </picture>
      <p>{current.wind_speed} mph direction {current.wind_dir}</p> */}
    </div>
  )
}

export default CountryDetail;