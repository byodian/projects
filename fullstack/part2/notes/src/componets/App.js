import React, { useEffect, useState, useRef } from 'react';
import noteService from './services/note';
import loginService from './services/login';
import NoteForm from './NoteForm';
import Togglable from './Togglable';
import Login from './Page/Login';
import Register from './Page/Register';
import Home from './Page/Home';
import Notes from './Page/Notes';
import Details from './Page/NoteDetails';
import { useResource, useMessage } from '../hooks';
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
  const [notes, { handleNotes }] = useResource();
  const [demoNotes, demoHelper] = useResource();
  const [message, { handleMessge, removeMessage }] = useMessage();
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const loggedNoteappUser = window.localStorage.getItem('loggedNoteappUser');
    if (loggedNoteappUser) {
      const user = JSON.parse(loggedNoteappUser);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  // ref children compoments state
  const noteFormRef = useRef();

  // Route
  const match = useRouteMatch('/notes/:id');
  const note = match
    ? notes.find(note => note.id === match.params.id)
    : null;

  const toggleImportanceOf = async id => {
    const note = notes.find(n => n.id === id);
    const changeNote = { ...note, important: !note.important };

    try {
      const returnedNote = await noteService.update(id, changeNote);
      handleNotes(notes.map(note =>
        note.id !== id ? note : returnedNote
      ));
    } catch(error) {
      handleMessge(`Note "${note.content}" was already deleted from server`);
      removeMessage(2000);
      handleNotes(notes.filter(n => n.id !== id));
    }
  };

  const addNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility();
    try {
      const returnedNote = await noteService.create(noteObject);
      handleNotes(notes.concat(returnedNote));
    } catch(exception) {
      handleMessge('input can not be empty');
      removeMessage(5000);
    }
  };

  const login = async (userObject) => {
    try {
      const user = await loginService.login(userObject);
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      setUser(user);
      noteService.setToken(user.token);
    } catch (exception) {
      handleMessge('用户名或密码不正确');
      // removeMessage(2000);
    }
  };

  const register = () => {
    console.log(123);
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

  const notesProps = {
    notes,
    user,
    handleNotes,
    toggleImportanceOf,
    handleLogout,
  };

  const demoProps = {
    notes: demoNotes,
    user: { username: 'test' },
    handleNotes: demoHelper.handleNotes,
    toggleImportanceOf,
    handleLogout,
  };


  return (
    <div className="container">
      <Switch>
        <Route path="/notes/:id">
          <Details note={note} />
        </Route>
        <Route path="/notes">
          {user
            ? <Notes {...notesProps}>{noteForm()}</Notes>
            : <Redirect to="/login" />
          }
        </Route>
        <Route path="/demo">
          <Notes {...demoProps}></Notes>
        </Route>
        <Route path="/login">
          {user === null
            ? <Login handleLogin={login} message={message}/>
            : <Redirect to="/notes" />
          }
        </Route>
        <Route path="/register">
          <Register handleRegister={register} />
        </Route>
        <Route path="/">
          {user === null
            ? <Home />
            : <Redirect to="/notes" />
          }
        </Route>
      </Switch>
    </div>
  );
};

export default App;