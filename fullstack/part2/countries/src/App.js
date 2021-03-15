import React from 'react';
import SearchForm from './componetns/SearchForm';
import Togglable from './componetns/Togglable';
import Notification from './componetns/Notification';
import { useCountry } from './hooks';

const App = () => {
  const { len, value, onChange, countriesToShow } = useCountry();

  const message = len > 15
    ? `Too many countries (${len} countries), specify another filter.`
    : 'No found...';

  return (
    <div>
      <SearchForm value={value} handleChange={onChange}/>
      {len <= 15 && len > 0
        ? countriesToShow.map((c, index) => (
          <div key={index}>
            <Togglable country={c}/>
          </div>))
        : <Notification message={`${message}`}/>
      }
    </div>
  );
};

export default App;