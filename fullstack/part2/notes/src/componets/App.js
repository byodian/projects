import React, { useEffect, useState, useRef } from 'react';
import noteService from './services/note';
import loginService from './services/login';
import Notification from './Notification';
import NoteForm from './NoteForm';
import Footer from './Footer';
import Togglable from './Togglable';
import Login from './Page/Login';
import Home from './Page/Home';
import Notes from './Page/Notes';
import Details from './Page/NoteDetails';
import '../assets/reset.css';
import '../assets/main.css';

import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useRouteMatch
} from 'react-router-dom';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const history = useHistory();
  const noteFormRef = useRef();
  const match = useRouteMatch('/notes/:id');
  const note = match
    ? notes.find(note => note.id === match.params.id)
    : null;

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
      setUser(user);
      noteService.setToken(user.token);
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      removeErrorMessage(5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
    history.push('/login');
  };

  const noteForm = () => {
    return (
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
    );
  };

  return (
    <div className="container">
      <Notification message={errorMessage} />
      <Switch>
        <Route path="/notes/:id">
          <Details note={note} />
        </Route>
        <Route path="/notes">
          {user
            ? <Notes
              notes={notes}
              toggleImportanceOf={toggleImportanceOf}
              handleLogout={handleLogout}>
              {noteForm()}
            </Notes>
            : <Redirect to="/login" />
          }
        </Route>
        <Route path="/demo">
          <Notes notes={notes} toggleImportanceOf={toggleImportanceOf} handleLogout={handleLogout}></Notes>
        </Route>
        <Route path="/login">
          {user === null
            ? <Login handleLogin ={login} />
            : <Redirect to="/notes" />
          }
        </Route>
        <Route path="/">
          {user === null
            ? <Home />
            : <Redirect to="/notes" />
          }
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;