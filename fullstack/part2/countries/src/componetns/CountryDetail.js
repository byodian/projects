const CountryDetail = ({ country }) => {
  const { name, capital, population, languages } = country;

  return (
    <div>
      <h2>{name}</h2>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h3>languages</h3>
      <ul>
        {languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <picture>
        <img src={country.flag} alt="country_flag"/>
      </picture>
    </div>
  )
}

export default CountryDetail;