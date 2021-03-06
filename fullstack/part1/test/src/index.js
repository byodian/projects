import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Calculator  } from "./Component/Calculator";
import { ComplexState} from "./Component/ComplexState";

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
  const [ value, setValue ] = useState(0);
  
   const setToValue = (newValue) => () => {
    setValue(newValue);
  }

  const increaseByOne = () => setCounter(counter + 1);
  const descreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  return (
    <div>
      <div>
        <p>{value}</p>
        <Button handleClick={setToValue(10)} text="Ten" />
        <Button handleClick={setToValue(0)} text="Reset" />
        <Button handleClick={setToValue(value + 1)} text="Increase" />
      </div>
      <Hello name="byodian" age={13 + 13} />
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={descreaseByOne} text="minus" />
      <Button handleClick={setToZero} text="zero" />
      <Calculator />
      <ComplexState />
    </div>
  )
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

