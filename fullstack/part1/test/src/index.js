import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <>
      <p>Hello {name}, you are {age} years old.</p>
      <p>So you were probably born in {bornYear()}</p>
    </>
  );
}

const App = (props) => {
  const { counter } = props;

  return (
    <div>
      <Hello name="byodian" age={13 + 13} />
      <div>{counter}</div>
    </div>
  )
};

let counter = 1;

const refresh = () => {
  ReactDOM.render(
    <App counter={counter} />,
    document.getElementById('root')
  );
}

setInterval(()=> {
  refresh();
  counter += 1;
}, 1000)