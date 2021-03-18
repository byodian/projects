import React, { useState } from 'react';
import Note from '../Note';
import Header from '../Header/NotesPage';

const Notes = (props) => {
  const [showAll, setShowAll] = useState(true);
  const { notes, toggleImportanceOf, handleLogout }  = props;

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true);

  return (
    <div>
      <Header handleLogout={handleLogout} />
      <h1>Notes</h1>
      {props.children}
      <div>
        {/* <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
        </button> */}
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