import React from 'react';

const Details = ({ note }) => {
  return (
    <div>
      <h1>{note.content}</h1>
      <p><time>{note.date}</time></p>
      <p>{note.important ? 'important' : 'not important'}</p>
      <p>author {note.user.name}</p>
    </div>
  );
};

export default Details;