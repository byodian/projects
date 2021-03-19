import React from 'react';
import Header from '../Header/NotesPage';
const Details = ({ note }) => {
  return (
    <div>
      <Header handleLogout={() => console.log(123)} />
      <h1>{note.content}</h1>
      <p><time>{note.date}</time></p>
      <p>{note.important ? 'important' : 'not important'}</p>
      <p>author {note.user.name}</p>
    </div>
  );
};

export default Details;