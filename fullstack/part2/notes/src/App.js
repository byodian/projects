import axios from 'axios';
import { useEffect, useState } from 'react';
import Note from './componets/Note';

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled');
        setNotes(response.data);
      })
  }, []);

  console.log('render', notes.length, 'notes');

  const notesToShow = showAll 
    ? notes
    : notes.filter(note => note.important === true);

  const addNotes = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target);
    const noteObject= {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject));
    setNewNote('');
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }
  
	return (
		<div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note}/>
        )}
      </ul>
      <form onSubmit={addNotes}>
        <input 
          value={newNote} 
          onChange={handleNoteChange} 
        />
        <button type="submit">Add</button>
      </form>
		</div>
	);
}

export default App;