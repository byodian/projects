import React from 'react';
const SearchForm = ({ value, handleChange }) => (
  <div>
    <form>
        find countries <input value={value} onChange={handleChange}/>
    </form>
  </div>
);

export default SearchForm;