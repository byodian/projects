import { useEffect, useState } from 'react';
import Note from './componets/Note';
import noteService from './services/note';
import Notification from './componets/Notification';
import Footer from './componets/Footer';
import './index.css';

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      })
      .catch(() => {
        setErrorMessage('The service doesn\'t work')
      })
  }, []);

  const notesToShow = showAll 
    ? notes
    : notes.filter(note => note.important === true);

  const addNotes = (event) => {
    event.preventDefault();
    if (newNote === '') {
      alert("The note input can't be empty.");
      return null;
    }

    const noteObject= {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changeNote = { ...note, important: !note.important };

    noteService
      .update(id, changeNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch(() => {
        setErrorMessage(
          `Note "${note.content}" was already deleted from server`
        );

        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);

        setNotes(notes.filter(n => n.id !== id));
      })
  }
  
	return (
		<div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
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
      <form onSubmit={addNotes}>
        <input 
          value={newNote} 
          onChange={handleNoteChange} 
        />
        <button type="submit">Add</button>
      </form>
      <Footer />
		</div>
	);
}

export default App;