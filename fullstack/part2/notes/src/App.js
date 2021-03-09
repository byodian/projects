import { useEffect, useState } from 'react';
import Note from './componets/Note';
import noteService from './services/note';
import loginService from './services/login';
import Notification from './componets/Notification';
import Footer from './componets/Footer';
import './index.css';

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    const loggedNoteappUser = window.localStorage.getItem('loggedNoteappUser');
    if (loggedNoteappUser) {
      const user = JSON.parse(loggedNoteappUser);
      setUser(user);
      noteService.setToken(user.token);
    }
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
  
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password
      });

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      );
      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch(exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input 
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}/> 
      </div>
      <div>
        password
        <input 
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}/> 
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={addNotes}>
      <input 
        value={newNote} 
        onChange={handleNoteChange} 
      />
      <button type="submit">Add</button>
    </form>
  );
  
	return (
		<div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>

      {user === null
        ? loginForm()
        : <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
      }

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
      <Footer />
		</div>
	);
}

export default App;