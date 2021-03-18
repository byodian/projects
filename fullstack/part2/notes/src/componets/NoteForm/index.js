import React, { useState } from 'react';

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('');

  const handleChange = ({ target }) => {
    setNewNote(target.value);
  };

  const addNote = async (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      important: false
    });
    setNewNote('');
  };

  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input
          id="note-input"
          value={newNote}
          onChange={handleChange}
        />
        <button id ="save-button" type="submit">save</button>
      </form>
    </div>
  );

};

export default NoteForm;
