const CountriesForm = ({ value, handleChange}) => (
  <div>
    <form>
        find countries <input value={value} onChange={handleChange}/>
      </form>
  </div>
)

export default CountriesForm;