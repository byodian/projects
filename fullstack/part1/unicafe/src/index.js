import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>{text}</button>

const Heading = ({ text }) => 
  <h1>{text}</h1>

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral;
  const scores = good * 1 + neutral * 0 + bad * -1;
  const average = all > 0 ? scores / all : 0; 
  const positive = all > 0 ? `${good / all * 100} %` : 0;

  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);

  return (
    <div>
      <Heading text="give feedback"/>
      <Button 
        handleClick={() => setGood(good + 1)}
        text="good" />
      <Button 
        handleClick={() => setNeutral(neutral + 1)}
        text="neutral" />
      <Button 
        handleClick={() => setBad(bad + 1)}
        text="good" />
      <Heading text="statistics"/>
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
