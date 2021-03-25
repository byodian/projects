import React, { useEffect, useState } from 'react';
import noteService from './components/services/note';
import loginService from './components/services/login';
import NoteForm from './components/NoteForm';
import Login from './Page/Form/Login';
import Register from './Page/Form/Register';
import Form from './Page/Form';
import Home from './Page/Home';
import Notes from './Page/Notes';
import Details from './components/Details';
import Sidebar from './components/Siderbar';
import Header from './components/Header/NotesPage';
import { useResource, useMessage } from './hooks';
import './assets/styles/main.scss';
import { Container } from './AppElements';
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
  const [open, setOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const loggedNoteappUser = window.localStorage.getItem('loggedNoteappUser');
    if (loggedNoteappUser) {
      const user = JSON.parse(loggedNoteappUser);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

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
    try {
      const returnedNote = await noteService.create(noteObject);
      handleNotes(notes.concat(returnedNote));
    } catch(exception) {
      handleMessge('内容不能为空或字数不能少于八');
      removeMessage(2000);
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
      removeMessage(4000);
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

  const handleOpen = () => {
    setOpen(!open);
  };

  const loginPage = () => (
    <Form heading="登录" message={message}>
      <Login handleLogin={login}/>
    </Form>
  );

  const registerPage = () => (
    <Form message={message} heading="注册">
      <Register handleRegister={register}/>
    </Form>
  );

  const getLocalDate = (date) => {
    const d = new Date(date);
    const localTime = d.toLocaleTimeString('en', { hour12: false });
    const localDate = d.toLocaleDateString('zh-cn').replace(/\//g, '-');
    return `${localDate} ${localTime}`;
  };

  const notesProps = {
    notes,
    user,
    open,
    handleNotes,
    message,
    toggleImportanceOf,
    handleLogout,
    handleOpen,
    getLocalDate
  };

  const demoProps = {
    notes: demoNotes,
    open,
    user: { username: 'test' },
    message,
    handleNotes: demoHelper.handleNotes,
    toggleImportanceOf,
    handleLogout,
    handleOpen,
  };

  const notesPage = () => (
    <Container isOpen={open}>
      <Notes {...notesProps}>
        <NoteForm createNote={addNote} />
      </Notes>
    </Container>
  );

  const demoPage = () => (
    <Container isOpen={open}>
      <Notes {...demoProps}></Notes>
    </Container>
  );

  return (
    <>
      <Switch>
        <Route path="/notes/:id">
          <Container>
            <Sidebar isOpen={open} handleOpen={handleOpen}/>
            <Header
              handleLogout={handleLogout}
              handleClick={handleOpen}
            />
            <Details
              note={note}
              getLocalDate={getLocalDate}
            />
          </Container>
        </Route>
        <Route path="/notes">
          { user ? notesPage() : <Redirect to="/login" /> }
        </Route>
        <Route path="/demo">
          {demoPage()}
        </Route>
        <Route path="/login">
          { user === null ? loginPage() : <Redirect to="/notes" /> }
        </Route>
        <Route path="/register">
          {registerPage()}
        </Route>
        <Route path="/">
          { user === null ? <Home /> : <Redirect to="/notes" /> }
        </Route>
      </Switch>
    </>
  );
};

export default App;