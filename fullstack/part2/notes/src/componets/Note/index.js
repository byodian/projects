import React from 'react';
import { Link } from 'react-router-dom';

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important'
    : 'make important';

  return (
    <li className="note">
      <Link to={`/notes/${note.id}`}>{note.content}</Link>
    </li>
  );
};

export default Note;