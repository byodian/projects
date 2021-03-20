import React from 'react';
import { Link } from 'react-router-dom';

const Note = ({ note }) => {

  return (
    <li className="note">
      <Link to={`/notes/${note.id}`}>{note.content}</Link>
    </li>
  );
};

export default Note;