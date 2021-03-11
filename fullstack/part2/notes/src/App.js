import React, { useEffect, useState, useRef } from 'react';
import Note from './componets/Note';
import noteService from './services/note';
import loginService from './services/login';
import Notification from './componets/Notification';
import Footer from './componets/Footer';
import LoginForm from './componets/LoginForm';
import NoteForm from './componets/NoteForm';
import Togglable from './componets/Togglable';
import './index.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const noteFormRef = useRef();

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      })
      .catch(() => {
        setErrorMessage('The service doesn\'t work');
      });
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

  const removeErrorMessage = (timer) => {
    setTimeout(() => {
      setErrorMessage(null);
    }, timer);
  };

  const addNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility();
    try {
      const returnedNote = await noteService.create(noteObject);
      setNotes(notes.concat(returnedNote));
    } catch(exception) {
      setErrorMessage('input can not be empty');
      removeErrorMessage(5000);
    }
  };

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
        removeErrorMessage(5000);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  const login = async (userObject) => {
    try {
      const user = await loginService.login(userObject);
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      removeErrorMessage(5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
  };

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm handleLogin ={login} />
    </Togglable>
  );

  const noteForm = () => {
    return (
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
    );
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null
        ? loginForm()
        : <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
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
};

export default App;