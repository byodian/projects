import React from 'react';
import { useField } from '../../hooks';

const NoteForm = ({ createNote }) => {
  const note = useField('text');

  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: note.value,
      important: false
    });
    note.reset();
  };

  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input {...note} reset="1"/>
        <button id ="save-button" type="submit">save</button>
      </form>
    </div>
  );

};

export default NoteForm;
