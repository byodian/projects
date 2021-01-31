import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ text, handleClick }) => 
  <button onClick={handleClick}>{text}</button>

const Head = ({ text }) => 
  <h2>{text}</h2>

const App = ({ anecdotes }) => {
  const len = anecdotes.length;
  const emptyArr = ((len) => {
    const a = new Array(len);
    for (let i = 0; i < len; i++) {
      a[i] = 0;
    }
    
    return a;
  })(len);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(emptyArr);
  const setToSelected = () => setSelected(Math.floor(Math.random() * len));
  const setVotePoints = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  }
  const maxIndex = (points) => points.indexOf(Math.max(...points));

  return (
    <div>
      <div>
        <Head text="Anecdote of the day"/>
        <p>{anecdotes[selected]}</p>
        <p>has {points.reduce(reducer, 0)} votes</p>
        <Button handleClick={setVotePoints} text="vote" />
        <Button handleClick={setToSelected} text="next anecdote" />
      </div>
      <div>
        <Head text="Anecdote with most votes"/>
        <p>{anecdotes[maxIndex(points)]}</p>
      </div>
    </div>
  );
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
    <App anecdotes={anecdotes} />,
  document.getElementById('root')
);
