import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  console.log(props);
  return (
    <>
      <p>Hello {props.name}, you are {props.age} years old.</p>
    </>
  );
}

const App = () => {
  const name = 'Peter';
  const age = 10;

  return (
    <div>
      <Hello name={name} age={age} />
      <Hello name="byodian" age={12 + 10} />
    </div>
  )
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
