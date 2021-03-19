import React, { useState, useEffect } from 'react';
import Note from '../Note';
import Header from '../Header/NotesPage';
import noteService from '../services/note';

const Notes = ({ notes, toggleImportanceOf, handleLogout, handleNotes, user, children }) => {
  const [showAll, setShowAll] = useState(true);

  useEffect(async () => {
    try {
      const initialNotes = await noteService.getAll();
      handleNotes(initialNotes.filter(n =>
        n.user.username === user.username
      ));
    } catch(error) {
      console.log(error.message);
    }
  }, []);


  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true);

  return (
    <div>
      <Header handleLogout={handleLogout} />
      <h1>Notes</h1>
      {children}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
    </div>
  );
};

export default Notes;