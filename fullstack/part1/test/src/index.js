import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Calculator  } from "./Component/Calculator";

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <>
      <p>Hello {name}, you are {age} years old.</p>
      <p>So you were probably born in {bornYear()}</p>
    </>
  );
}

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const [ counter, setCounter ] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const descreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  return (
    <div>
      <Hello name="byodian" age={13 + 13} />
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={descreaseByOne} text="minus" />
      <Button handleClick={setToZero} text="zero" />
      <Calculator />
    </div>
  )
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

