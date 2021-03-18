import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [current, setCurrent] = useState(0);
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    axios.get(BACKEND_URL).then(response => {
      setAnecdotes(response.data);
    });
  }, []);

  const handleClick = () => {
    setCurrent(Math.round(Math.random() * (anecdotes.length - 1)));
  };

  if (anecdotes.length === 0) {
    return (
      <div>no anecdotes...</div>
    );
  }

  return (
    <div>
      <h1>anecdote of the day</h1>
      <button onClick={handleClick}>next</button>
      <div>{anecdotes[current].content}</div>
    </div>
  );
};

export default App;